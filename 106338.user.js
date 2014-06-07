// ==UserScript==
// @name           Validate Library Card
// @namespace      http://mailerdaemon.home.comcast.com/
// @include        https://*.libraryreserve.com/*/SignIn*.htm*
// @include        https://*.libraryreserve.com/*/LogIn*.htm*
// @version        1.0
// ==/UserScript==

const extrasize = 3;

function luhn(str){
	if(typeof(str) !== "string")
		str = Array.join(str, "");
	if((str = str.replace(/\D/g, "")).length) {
		var t = [0,2,4,6,8,1,3,5,7,9]
		var [valid, concat] = Array.reduce(str, function([b, a], c){ let j = Number(c); return [a + j, b + t[j]];}, [0, 0]);
		return [str, !(valid % 10), str.concat(9 - (concat + 9) % 10)];
	}
	return [str, undefined, "0"];
}

$Z("//input[(@id='card' or @name='LibraryCardNumber') and @type='text']", function(input){
		let checksum = document.createElement("span");
		insertAfter(checksum, input)
		let update = function (e){
				let value = input.value.replace(/[\s\-_]/g,'');
				let len = value.length;
				let num = Number(value);
				let check;
				if(len && !isNaN(num))
				{
					if(len < 13){
						input.style.backgroundColor = "";
						checksum.innerHTML = check = "";
					}
					else if(len == 13){
						checksum.innerHTML = check = luhn(value)[2].slice(-1);
						input.style.backgroundColor = "#AFA";
					}
					else if(len == 14){
						var [str, success] = luhn(value);
						checksum.innerHTML = ""
						check = str.slice(-1);
						if(success)
							input.style.backgroundColor = "#5F5";
						else
							input.style.backgroundColor = "#FAA";
					}
					else
						input.style.backgroundColor = "#F00";
					//log(value, len, check)
				}
				//else log(value, "wtf?")
				if(input.value.length + extrasize > input.size)
					input.size = input.value.length + extrasize;
			}
		addEvent(input, "keyup", update);
		addEvent(input, "change", update);
		addEvent(checksum, "click", function(){input.value += checksum.innerHTML; update();});
	});

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
function log(){
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
	
	var f = arg//JSON.stringify(arg);
	if(typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.log) != "undefined")
		unsafeWindow.console.log(f);
	else
		GM_log(f);
	return arg;
}