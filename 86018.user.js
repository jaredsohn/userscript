// ==UserScript==
// @name           window.status
// @namespace      vidzbigger.com
// @include        http://*
// @include        https://*
// ==/UserScript==

//This script is a false version of window.status that you set by setting winstatus.status='string value';  
// This script creates a new instance of the WindowStatus object called winstatus
//To enable this script, require it in your script, 
// then replace window.status in your script with winstatus.status and a simulated status bar will be used
//This script is designed to be fully @require able
//// @require http://userscripts.org/scripts/source/86018.user.js

function WindowStatus(val){
	this.avoidRedundentStatus=false;//hides duplicate status if status bar is working
	this.value = val;
	this.borderRadius=5;
	this.font='';
	this.fontSize='auto';
	this.backgroundColor='#ECEAFF';
	this.color='#333';
	this.padding=3;
	this.borderWidth=1;
	this.borderColor='#FFF';
	this.setStatus=function(s){
		this.value = s;
		var to=this;
		if(typeof(s)=='string'){
			window.status=s;//attempts to set normal status object
			if(this.avoidRedundentStatus&&window.status==s)return;
			if(s!='')s=document.createTextNode(s);
		}
		if(document.getElementById('window.status')){
			if(s){
				document.getElementById('window.status').innerHTML='';
				document.getElementById('window.status').appendChild(s);
			}else	document.body.removeChild(document.getElementById('window.status'));
		}else	if(s){
			var d=document.createElement('div');
			d.appendChild(s);
			d.setAttribute('id','window.status');
			d.setAttribute('style','background-color:'+this.backgroundColor+';color:'+this.color+';font-size:'+this.fontSize+';padding:'+this.padding+'px;border-top:'+this.borderWidth+'px solid '+this.borderColor+';border-right::'+this.borderWidth+'px solid '+this.borderColor+';position:fixed;bottom:0px;left:0px;	-moz-border-radius-topright:'+this.borderRadius+'px;border-top-right-radius:'+this.borderRadius+'px;font-family:'+this.font+';');
			document.body.appendChild(d);
			d.addEventListener('mouseout',function(e){to.setStatus()},false);
		}
	}
	this.__defineGetter__("status", function(){
		return this.value;
	});
	this.__defineSetter__("status", function(val){
		this.setStatus(val);
	});
	this.setStatus(val);
}

var winstatus = new WindowStatus();
//winstatus.borderRadius=15;
//winstatus.font='Times';
//winstatus.fontSize='36pt';
//winstatus.color='#333';
//winstatus.backgroundColor='#ECEAFF';
//winstatus.padding=3;
//winstatus.borderWidth=1;
//winstatus.borderColor='#FFF'
//winstatus.avoidRedundentStatus=false;

//then set status
//winstatus.status="New Status";

//createing messages
/*
winstatus.status="New Status";
winstatus.status="";
winstatus.status='To hide, call status() or perform mouseout; To set, call status("my message")';
//winstatus.status='';
*/

// some helpful CSS, to fix some pages where status does not appear all the way in the corner
//GM_addStyle("body{height:100%;margin:0px;padding:0px;}");