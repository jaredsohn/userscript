// ==UserScript==
// @name           Ultimate-Guitar "Mark This Forum Read" Quick Link
// @namespace      http://userscripts.org/users/23652
// @description    Adds a "Mark This Forum Read" to the bottom of the page without reloading the page, plus a cool fade out effect
// @include        http://www.ultimate-guitar.com/forum/forumdisplay.php?f=*
// @copyright      JoeSimmons
// @version        1.0.4
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// OPTIONS
var wait_image_source = 'data:image/gif;base64,R0lGODlhEAAQAOMPABER4xcX7SYm7jY28EVF8VRU8mVl83R09IKC9pOT96Ki+MLC+tHR+9/f/fDw/v///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCAAPACwAAAAAEAAQAAAETPDJSau91Q3AgTyIY2mdFAACkwnlo7CCOCHoNjksQm2KRimAAYWDIU6MGeSDRzG4ghRa7GjIUXAohaQzpTBYgS1nILsiDuJxGcNuTyIAIfkECQgADwAsAAAAABAAEAAABGLwSclCmjhLAcbSmIMEQMmAD8OVgPE4TeZwQgIEjTMIDoYAvMcA8eIQJwOAQrJkdjAlkCM6KfU0VEmy6WgqnpNfEDEoAo6SmatBStCuk9jDwAKeQAxWAAEHLZICKBoJAXcTEQAh+QQJCAAPACwAAAAAEAAQAAAEWvDJORuhGCegsnTIAAAB6WSMMK4jgjmq0C1j0FEIIJxPbvAU0a3HeDgUrsnI81gqAR6HU4JQnBjJhwIwyDgMgCQsjFGUAItjDEhlrQTFV+k8QLAp2wQzQ2jsIwAh+QQJCAAPACwAAAAAEAAQAAAETvDJSau9z7nq0ADAgGjDQjECqALCZ0pOKiiSkoLvg7Ab/OGTQ4A2+QExyMdiuexhVgaKInCgqKKTGABhBc00Np61cFsJGJVo5ydyJt/wCAAh+QQJCAAPACwAAAAAEAAQAAAEWvDJSau92KEBwEDO1QhdCQjMZQhKqJBCOKWPLDkk8qQLYDSWBCAgCDw4Q5BEgewkhKWBYoIIdAYPojVhaRgAi90DcbLVQrQbrOV4DcwSBsl0Alo0yA8cw+9TIgAh+QQBCAAPACwAAAAAEAAQAAAEWvDJSau9WCIABnKWgySPwnECQykBEDhgKQBCTJyAQTkzIjWJFkc1MQ0onAXChwQ0YxrEgkMZABQUximQaGho0IcBR5DwaAoQrBXAThizE1bxCSGsAGZmz7dEAAA7';
var done_image_source = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAodJREFUeNqkk0tME0Ecxr/Z3b4ADZRqAqQ2hJJSmhAfxKjUqIlXLujJqAe96NGee+Bi4kE5edHIyRhOcsEY4sGDotGEgxEBCUQpTVqgD0262310dtaZlcL25MFJvs3M7P/37X+y8xHHcfA/QxEP8jwCyIRLLEgvCCb4bIwruleX5/oAB7NwnAJsvrIdODfKfw08Yzyo+DOJvkQ8FomGOwIdQdGfZqonNku59Fph/YrZMKf41lxLB034cODQ5MXUhaQCOUQtCtVSm+/a4t0DbdGuaPe7lfeTNd3dd02kvYLegOTPnB8aS1p1M6SqKgzDaNHLwWegeiN0Jn466Se+jGAODKgzMdgzEDdUI6RpGnRdb9GDgaxbNn98hpvQUCwcjQvGa3Au0h4J12o1mKbpSnSxvbuNO8Hr6Ky0I5/P4+bru1heWQYzWFgwXoNjMuSgbdv4fGkexUoRuZ0cYqQPZ7tGoSgKpjdf4FX5DRpSA4ZlBAXjNQC1KW73X8PS0hLmh2dwMjKCJyMPXfhteQGPC9NACK6oQl3mwKDhbJW1kpH9eh+yLMPn8+Hp0CP4FB/W6z9wbzML1sH4v4Ari5iGYLwdfNwuFatyWEb6+7j71aaurt8COrEPCxm1elUwXoPZ31uVDQlEJ30Ep75dduHUYho40gozZutmUd8QzIEBcwq2Rqcqn4qrDmU6iRGkvnA4hv1zC7EG1dXF6iqr21OCcWMgwkQIz0GMB2FUGpf65Yw/2R73J9rCcpcSFEX2L2pYa/WqtaptsJ8cXmRzyNlw2T0DcaW7uSLolXowjDSOIsXD5d42Hp4CdrGMFSygwHb4TomrzFnaNJA8J1X+kWCRRY2rzln2R4ABABpvPoBuuSpnAAAAAElFTkSuQmCC';

// Get ID
function $(ID) {return document.getElementById(ID);}

function mark() {
with($('markasbox')) {
style.display = '';
style.opacity = '0';
innerHTML = '<img src="'+wait_image_source+'"> Please wait...';
}
alignCenter('markasbox');
fade('markasbox', 'in', 'fast');
var gotourl='http://www.ultimate-guitar.com/forum/forumdisplay.php?do=markread&f='+location.href.split(/[?&]f=(\d+)/)[1];
GM_xmlhttpRequest({
    method: 'GET',
    url: gotourl,
    onload: function(responseDetails) {
	$('markasbox').innerHTML = '<img src="'+done_image_source+'"> This forum has been marked as read.';
	var norm, strong, strongs = document.evaluate("//strong",document,null,6,null);
	for(var i=strongs.snapshotLength-1; i>=0; i--) {
		strong = strongs.snapshotItem(i);
		if(strong.parentNode!=null) if(strong.parentNode.tagName=='A') if(strong.parentNode.href.indexOf('showthread.php?t')!=-1) {
		if(strong.parentNode.previousSibling.previousSibling.href.indexOf('showthread.php?goto=newpost&t=')!=-1) strong.parentNode.previousSibling.previousSibling.parentNode.removeChild(strong.parentNode.previousSibling.previousSibling);
		norm = document.createTextNode(strong.textContent);
		strong.parentNode.replaceChild(norm, strong);
		}
	}
	alignCenter('markasbox');
	markedTO = setTimeout(function(e){fade('markasbox', 'out', 'fast');}, 1500);
		}
});
}

// Fade by JoeSimmons. Fade in/out by id and choose speed: slow, medium, or fast
// Syntax: fade('idhere', 'out', 'medium');
function fade(e, dir, s) {
if(!e || !dir || typeof dir!='string' || (dir!='out'&&dir!='in')) {return;} // Quit if node/direction is omitted, direction isn't in/out, or if direction isn't a string
dir=dir.toLowerCase(); s=s.toLowerCase(); // Fix case sensitive bug
var node = (typeof e=='string') ? $(e) : e, // Define node to be faded
	speed = {slow : 400, medium : 200, fast : 50};
if(!s) var s='medium'; // Make speed medium if not specified
if(s!='slow' && s!='medium' && s!='fast') s='medium'; // Set speed to medium if specified speed not supported
if(dir=='in') node.style.opacity = '0';
else if(dir=='out') node.style.opacity = '1';
node.style.display='';
var intv = setInterval(function(){
if(dir=='out') {
if(parseFloat(node.style.opacity)>0) node.style.opacity = (parseFloat(node.style.opacity)-.1).toString();
else {
clearInterval(intv);
node.style.display='none';
}
}
else if(dir=='in') {
if(parseFloat(node.style.opacity)<1) node.style.opacity = (parseFloat(node.style.opacity)+.1).toString();
else {
clearInterval(intv);
}
}
}, speed[s]);
}

function boxnone() {
clearTimeout(markedTO);
var markasbox = $('markasbox');
if(markasbox.textContent.indexOf('Please wait')!=-1) var s = setInterval(function(){
if(markasbox.textContent.indexOf('marked as read')!=-1) {
fade('markasbox', 'out', 'fast');
clearInterval(s);
}
}, 50);
else fade('markasbox', 'out', 'fast');
}

// alignCenter by JoeSimmons
// Instructions: Supply an id string or node element as a first argument
function alignCenter(e) {
var node = (typeof e=='string') ? $(e) : ((typeof e=='object') ? e : false);
if(!window || !node) {return;}
var beforeDisplay = node.style.display;
node.style.display = '';
node.style.top = ((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
node.style.left = ((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
node.style.display = beforeDisplay;
}

var a = document.createElement('a'),
	markasbox = document.createElement('div'),
	markedTO;
	markasbox.addEventListener('click', boxnone, false);
	markasbox.innerHTML = '<img src="data:image/gif;base64,R0lGODlhEAAQAOMPABER4xcX7SYm7jY28EVF8VRU8mVl83R09IKC9pOT96Ki+MLC+tHR+9/f/fDw/v///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCAAPACwAAAAAEAAQAAAETPDJSau91Q3AgTyIY2mdFAACkwnlo7CCOCHoNjksQm2KRimAAYWDIU6MGeSDRzG4ghRa7GjIUXAohaQzpTBYgS1nILsiDuJxGcNuTyIAIfkECQgADwAsAAAAABAAEAAABGLwSclCmjhLAcbSmIMEQMmAD8OVgPE4TeZwQgIEjTMIDoYAvMcA8eIQJwOAQrJkdjAlkCM6KfU0VEmy6WgqnpNfEDEoAo6SmatBStCuk9jDwAKeQAxWAAEHLZICKBoJAXcTEQAh+QQJCAAPACwAAAAAEAAQAAAEWvDJORuhGCegsnTIAAAB6WSMMK4jgjmq0C1j0FEIIJxPbvAU0a3HeDgUrsnI81gqAR6HU4JQnBjJhwIwyDgMgCQsjFGUAItjDEhlrQTFV+k8QLAp2wQzQ2jsIwAh+QQJCAAPACwAAAAAEAAQAAAETvDJSau9z7nq0ADAgGjDQjECqALCZ0pOKiiSkoLvg7Ab/OGTQ4A2+QExyMdiuexhVgaKInCgqKKTGABhBc00Np61cFsJGJVo5ydyJt/wCAAh+QQJCAAPACwAAAAAEAAQAAAEWvDJSau92KEBwEDO1QhdCQjMZQhKqJBCOKWPLDkk8qQLYDSWBCAgCDw4Q5BEgewkhKWBYoIIdAYPojVhaRgAi90DcbLVQrQbrOV4DcwSBsl0Alo0yA8cw+9TIgAh+QQBCAAPACwAAAAAEAAQAAAEWvDJSau9WCIABnKWgySPwnECQykBEDhgKQBCTJyAQTkzIjWJFkc1MQ0onAXChwQ0YxrEgkMZABQUximQaGho0IcBR5DwaAoQrBXAThizE1bxCSGsAGZmz7dEAAA7"> Please wait...';
	markasbox.setAttribute('id', 'markasbox');
	markasbox.setAttribute('style', 'opacity:1; color:#000; font-size:14px; font-family:tahoma; font-weight:bold; background:#F7F7F7; border:1px solid #444444; position:fixed; top:'+((window.innerHeight/2)-80.5)+'px; left:'+((window.innerWidth/2)-221)+'px; -moz-border-radius:3px; text-align:center; padding:70px; display:none;');

a.textContent = 'Mark This Forum Read';
a.href = 'javascript:void(0);';
a.setAttribute('style', 'position:fixed; bottom:30px; right:45%; color:#000; font:11px tahoma; background:#fff; padding:2px; -moz-appearance:none; -moz-border-radius:4px; border:1px solid #aaa;');
a.addEventListener('click', mark, false);
document.body.insertBefore(a, document.body.firstChild);
document.body.insertBefore(markasbox, document.body.firstChild);

window.addEventListener('resize', function(e){alignCenter('markasbox');}, false);