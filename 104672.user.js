// ==UserScript==
// @name           Google Reader - Expanded per Feed
// @namespace      http://kossib.foxnet.pl
// @description    Remembers expanded or list view on per feed basis.
// @include        http*://www.google.*/reader/view/*
// ==/UserScript==

/*

 Change log :
--------------
v0.0.2:Updated for new Google Reader design
v0.0.1: Increased the time event waits to fire. (this partially solves the duplicate items bug)
v0.0.0: First release.

*/
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements;
}
GM_setValue(document.location,'');
var kfp_grepf_current_feed = '';
//console.log("basladi");

function kfp_grepf_init() 
{
	// loaded ?
	kfp_grepf_body = document.getElementsByTagName('body')[0];
	if(/\bloaded\b/.test(kfp_grepf_body.className)) 
	{
		kfp_grepf_id_expanded_view = document.getElementById("stream-view-options-container").childNodes[1];
		kfp_grepf_id_list_view = document.getElementById("stream-view-options-container").childNodes[2];
		kfp_grepf_id_chrome_title = 'chrome-title';
		//console.log(document.getElementById("stream-view-options-container").childNodes);
		kfp_grepf_id_expanded_view.addEventListener('mouseup', kfp_grepf_save, false);
		kfp_grepf_id_list_view.addEventListener('mouseup', kfp_grepf_save, false);
		//document.getElementById(kfp_grepf_id_list_view).addEventListener('click', kfp_grepf_save, false);

		document.getElementById(kfp_grepf_id_chrome_title).addEventListener('DOMNodeInserted', kfp_grepf_nodeinserted, false);
		//console.log("loaded");
		kfp_grepf_load();
	}
   	else
	{
		// not loaded try later
		//console.log("tryed");
		setTimeout(kfp_grepf_init,100);
	}
}
function kfp_grepf_nodeinserted() 
{
//console.log("insertedbulut");

//GM_setValue(document.location,'');
	if (kfp_grepf_current_feed == document.location.href)
		return;
	kfp_grepf_current_feed = document.location.href;
	//must be done using timer, GM_getValue is not working inside this event
	setTimeout(kfp_grepf_load, 500);
}

function kfp_grepf_load() 
{
	kfp_grepf_saved = GM_getValue(document.location, '');
	if (kfp_grepf_saved != ''
		&& kfp_grepf_saved != 'List view'
		&& kfp_grepf_saved != 'Expanded view' )
		{
			kfp_grepf_saved = '';
		}
	
	//console.log("saved:"+kfp_grepf_saved);
	if (kfp_grepf_saved != ''
		&& kfp_grepf_saved != kpf_grepf_selected().title) 
	{
	//console.log(kfp_grepf_saved);
		kfp_grepf_exp = getElementsByAttribute(document.getElementById("stream-view-options-container"),"div","title",kfp_grepf_saved)[0];
		console.log(kfp_grepf_exp);
		//kfp_grepf_exp.click();
		kfp_grepf_evt = document.createEvent('MouseEvents');
		//kfp_grepf_evt.initEvent( 'click', true, true );
		//kfp_grepf_exp.dispatchEvent(kfp_grepf_evt);
		//kfp_grepf_evt = document.createEvent('MouseEvents');
		kfp_grepf_evt.initEvent( 'mousedown', true, true );
		kfp_grepf_exp.dispatchEvent(kfp_grepf_evt);
		kfp_grepf_evt = document.createEvent('MouseEvents');
		kfp_grepf_evt.initEvent( 'mouseup', true, true );
		kfp_grepf_exp.dispatchEvent(kfp_grepf_evt);
		kfp_grepf_save();
	}
	else 
	{
		kfp_grepf_save();
	}
}

function kfp_grepf_save() 
{
   GM_setValue(document.location, kpf_grepf_selected().title);
}

function kpf_grepf_selected()
{
	//kfp_grepf_exp = document.getElementById(kfp_grepf_id_expanded_view);
	return (/\jfk-button-checked\b/.test(kfp_grepf_id_expanded_view.className)) 
				? kfp_grepf_id_expanded_view 
				: kfp_grepf_id_list_view;
}

kfp_grepf_init();
