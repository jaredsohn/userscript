scr_meta=<><![CDATA[
// ==UserScript==
// @name	Blakut Moderation Script by Swashata
// @description	Quick Reference Moderation Script for Warning reminder etc.
// @version	3.1.2
// @author	Swashata
// @namespace	TEAM BLAKUT
// @include        http://*.orkut.*/*CommMsgs.aspx*
// @include        http://*.orkut.*/*CommMsgPost.aspx*
// ==/UserScript==
]]></>;

/**********************************************************************************************************************************************************
//Phew done after some equation solving! My Moral: Take things in an easy way. Have to modify a lot and define different variables for each category
//Found the definition of the title given... made that to come as link ;) Now the title is used as link as well as quick display!!
***********************************************************************************************************************************************************/


/////////////////////////////
//For General Posting Rules//
////////////////////////////

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<a href="+title1+"><img src="+image+"></a>";
}

function dip() {
	var genpost = new Array();	
	genpost["General Post1"]="http://lh3.ggpht.com/_qqmYhkE9U2A/SXsRnMZ7h5I/AAAAAAAAA9A/Bo7ODmjaUCw/R%26F.gif";
	genpost["General Post2"]="http://lh4.ggpht.com/_qqmYhkE9U2A/SXsRnC0gdWI/AAAAAAAAA84/FFSzVQEybNY/post.gif";
	genpost["http://bit.ly/GeneralRule"]="http://lh6.ggpht.com/_Wn1h6aeHNlw/SKaT8g45CMI/AAAAAAAABgQ/qCqqn3R6Ig8/2b%20deleted.gif";


	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title1 in genpost){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+genpost[title1]+"' title='"+title1+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

//////////////
//For SPAM///
////////////

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<a href="+title2+"><img src="+image+"></a>";
}

function dip() {
	var spamwar = new Array();	
	spamwar["Spam1"]="http://lh6.ggpht.com/_Wn1h6aeHNlw/SKaT8Q2yy_I/AAAAAAAABgA/SlGUfjppoRY/Spam.gif";
	spamwar["spam2"]="http://lh3.ggpht.com/_roTYAkmCH6k/SXw96Fq66wI/AAAAAAAAA7o/aTg5EBrEHks/Spam.gif";
	spamwar["http://bit.ly/DFSSpam"]="http://lh3.ggpht.com/_qqmYhkE9U2A/SXsRnff2bOI/AAAAAAAAA9Q/3_tee_dJGdI/dont%20spam.gif";

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title2 in spamwar){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+spamwar[title2]+"' title='"+title2+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);





/////////////
//For TAG///
///////////


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<a href="+title3+"><img src="+image+"></a>";
}

function dip() {
	var tagrem = new Array();
	tagrem["TAG1"]="http://lh3.ggpht.com/_qqmYhkE9U2A/SXxIWcwZy8I/AAAAAAAAA_4/VayikL3IIFI/image%285%29.png";
	tagrem["http://bit.ly/TAGS"]="http://lh3.ggpht.com/_Wn1h6aeHNlw/SKDCZGpqOTI/AAAAAAAABfc/hmXQgGneLNU/Use%20TAGS.gif";

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title3 in tagrem){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+tagrem[title3]+"' title='"+title3+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);





/////////////
//For BAN///
///////////






addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<a href="+title4+"><img src="+image+"></a>";
}

function dip() {
	var banban = new Array();
	banban["http://bit.ly/Banned"]="http://lh3.ggpht.com/_Wn1h6aeHNlw/SKDCZBc6n6I/AAAAAAAABfU/xUnSHUY51iA/Banned.gif";

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title4 in banban){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+banban[title4]+"' title='"+title4+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);


////////////////////////
//For Over All Rules///
//////////////////////



addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<a href="+title5+"><img src="+image+"></a>";
}

function dip() {
	var overule = new Array();
	overule["Rules1"]="http://lh5.ggpht.com/_xP3DamJrys4/STEmtytg5YI/AAAAAAAAACA/wvay2-lh-mc/s400/2hd1l45.png";
	overule["Rules2"]="http://lh5.ggpht.com/_roTYAkmCH6k/SXxB18LlbEI/AAAAAAAAA7s/C3XGH9nk1C4/Follow%20the%20rules.gif";
	overule["http://bit.ly/DFS"]="http://lh3.ggpht.com/_qqmYhkE9U2A/SXrk02ExerI/AAAAAAAAA7k/hc0FANkefKo/Read__Follow_02131.gif";

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title5 in overule){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+overule[title5]+"' title='"+title5+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);



//////////////////
//Forum Search///
////////////////


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<a href="+title6+"><img src="+image+"></a>";
}

function dip() {
	var forum = new Array();
	forum["Forum Search1"]="http://lh5.ggpht.com/_qqmYhkE9U2A/SXxJONQ8DCI/AAAAAAAABAQ/CcIem00M2mw/image%286%29.png";
	forum["Forum Search2"]="http://lh3.ggpht.com/_roTYAkmCH6k/SXyyp6tzCBI/AAAAAAAAA9s/xJuseIuosiw/Forum%20search.gif";
	forum["http://bit.ly/DFSforum"]="http://lh4.ggpht.com/_qqmYhkE9U2A/SXxGJGBrs8I/AAAAAAAAA_c/xI8p2qZpoHM/image%282%29.png";

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title6 in forum){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+forum[title6]+"' title='"+title6+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);


////////////////////////////////////
//For General Image no Hyperlink///
//////////////////////////////////



addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["No Hyperlink1"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SXwetpwxsfI/AAAAAAAAAyQ/67V9VhhlPQ4/cooltext411020451.gif";
	smileyarr["No Hyperlink2"]="http://lh3.ggpht.com/_qqmYhkE9U2A/SXrf9puWGEI/AAAAAAAAA7Y/GSt0D02_MqE/officer_pushing_up_hat.gif";
	smileyarr["No Hyperlink3"]="http://lh4.ggpht.com/_qqmYhkE9U2A/SOSsXXH64rI/AAAAAAAAAEc/Ktx_60SMNaw/modcop.gif";
	

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);


// Visit our official website www.blakut.com for regualr update on smileys and other orkut related stuffs.
//~~Happy Orkutting~~
// Regards--- Swashata


//////////////////
//Auto Updater///
////////////////

//Auto Script Updater from http://userscripts.org/scripts/review/38017
//Thanks to the Author sizzlemctwizzle


// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
 id: '41115', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
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
