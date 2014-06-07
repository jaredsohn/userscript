// ==UserScript==
// @name           OverDrive Login Helper
// @namespace      http://home.comcast.net/~mailerdaemon
// @description    Remembers the users library card number and other login credentials (but not masked fields/password fields).
// @include        https://*.libraryreserve.com/*/SignIn*.htm*
// @include        https://*.mediavending.com/*/SignIn*.htm*
// @include        https://*.libraryreserve.com/*/LogIn*.htm*
// @include        https://*.mediavending.com/*/LogIn*.htm*
// @version        0.7
// ==/UserScript==

//https://secure3.libraryreserve.com/singapore.lib.overdrive.com/AC2A5588-FD00-4315-BC77-40415EEC33E1/10/251/en/SignIn.htm?URL=MyAccount.htm
//chose the library randomly; the libraries share a pool of login servers.
var library = document.location.pathname.split("/")[1];
var forms = [];
var fields = JSON.parse(GM_getValue(library,"{}"));
$Z("//form[@action='BANGAuthenticate.dll']", function(form){
		var submit = $X(".//input[@type='submit' or @alt='Submit' or @value='Sign In' or @alt='Sign In'] | .//div[@class='signinbutton'] | .//a[contains(text(), ' users, please click here to sign into this system.')]", form);
		//while stuffing the form don't allow submit!
		
		if(!submit)
			return 0;
		
		submit.disable = true;
		
		for(var a in fields)
		{
			var elm = form.elements.namedItem(a);
			var orig, dest;
			if(elm.tagName == "SELECT")
			{
				var op = $X(".//option[@value='"+fields[a]+"']", elm);
				orig = op.selected;
				dest = op.selected = true;
			}
			else
			{
				orig = elm.value;
				dest = elm.value = fields[a];
			}
			if(orig != dest)
				simulateHTMLEvent(elm, "change");
		}
		
		submit.disable = false;
		
		var save = document.createElement("input");
			save.type="button";
			save.value = "Save";
		if(submit.tagName == "INPUT")
		{
			if(submit.className)
				save.className = submit.className;
			if(submit.type == "image")
				save.style.verticalAlign="top";
			submit.style.display = save.style.display = "inline";
		}
		
		insertAfter(save, submit);
		insertAfter(document.createTextNode(" "), submit);
		addEvent(save, "click", function(event){
				var out = {};//really should figure out some way to do radio controls and check boxes
				Array.forEach(form.elements, function(r){if((r.nodeName=="INPUT" && r.type.toLowerCase() =="text") || r.nodeName=="SELECT") out[r.name] = r.value;});
				GM_setValue(library, JSON.stringify(out));
			});
		return 1;
	});

function simulateClick(node) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  return node.dispatchEvent(evt);
}

function simulateHTMLEvent(node, type, bubbles, cancelable) {
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent(type, bubbles, cancelable);
  return node.dispatchEvent(evt);
}


function $X(_xpath, node){//to search in a frame, you must traverse the .contentDocument attribute.
    var doc = (node && (typeof(node.ownerDocument) === "object"))?(node.ownerDocument || node):(node = document);
    return doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
function $Y(_xpath, node){
    var doc = (node && (typeof(node.ownerDocument) === "object"))?(node.ownerDocument || node):(node = document);
    return doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function $Z(_xpath, func, node){
    var doc = (node && (typeof(node.ownerDocument) === "object"))?(node.ownerDocument || node):(node = document);
    var res = doc.evaluate(_xpath, node, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var args = Array.prototype.slice.call(arguments, 3);
    var i = 0;
    for (; i < res.snapshotLength; ++i)
        func.apply(func, [res.snapshotItem(i), i].concat(args));
    return i;
}


function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}

function addEvent( obj, type, fn, capture ) {
 	if ( obj.attachEvent ) {
 		obj["e"+type+fn] = fn;
 		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
 		obj.attachEvent( "on"+type, obj[type+fn] );
 	} else
 		obj.addEventListener( type, fn, capture?capture:false );
}
function removeEvent( obj, type, fn, capture ) {
 	if ( obj.detachEvent ) {
 		obj.detachEvent( "on"+type, obj[type+fn] );
 		obj[type+fn] = obj["e"+type+fn] = null;
 	} else
 		obj.removeEventListener( type, fn, capture?capture:false );
}
function log()
{
	var arg;
	switch(arguments.length)
	{
		case 1:
			arg = arguments[0];
			break;
		case 0:
			arg = null;
			break;
		default:
			arg = arguments;
			break;
	}
	
	var f = JSON.stringify(arg);
	if(typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.log) != "undefined")
		unsafeWindow.console.log(f);
	else
		GM_log(f);
	return arg;
}