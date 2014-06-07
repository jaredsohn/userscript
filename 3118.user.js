//
//    Hide Objects User Script
//
// ==UserScript==
// @name          Hide Objects
// @description   Hides object and embed tag contents by replacing it with an empty div.  Click on the div to reveal the object tag contents.
// @include       *
// ==/UserScript==

(function() {


// Main Function Call //
hideTag('object');
hideTag('embed');
// if you want to hide all images also, uncomment the following line:
// hideTag('img');


// The Guts //
function hideTag(tag, d) {
	d = (d && d.createElement) ? d : document;
	for (var a = d.getElementsByTagName(tag), i = 0, e, f, s; e = a[i]; ++i) {
		if (e.style.display == 'none' || e.style.visibility == 'hidden' || (s = d.defaultView.getComputedStyle(e, '')).display == 'none' || s.visibility == 'hidden') {
			continue;
		}
		f = d.createElement('div');
		f.appendChild(e.parentNode.replaceChild(f, e));
		f.style.display = 'none';
		
		f = f.parentNode.insertBefore(d.createElement('div'), f);
		with (f.style) {
			backgroundColor =   'gray';
			color =             'white';
			outline =           '1px dashed invert';
			overflow =          'hidden';
			cursor =            'pointer';
			borderColor =       'transparent';
			position =          (s.position                  || 'static');
			cssFloat =          (s.cssFloat                  || 'none');
			clear =             (s.clear                     || 'none');
			display = (tag == 'object' ? 'block' : s.display || 'block');
			width =  (e.width  ? e.width + 'px'  : s.width   || 'auto');
			height = (e.height ? e.height + 'px' : s.height  || 'auto');
			top =               (s.top                       || 'auto');
			right =             (s.right                     || 'auto');
			bottom =            (s.bottom                    || 'auto');
			left =              (s.left                      || 'auto');
			marginTop =         (s.marginTop                 || '0');
			marginRight =       (s.marginRight               || '0');
			marginBottom =      (s.marginBottom              || '0');
			marginLeft =        (s.marginLeft                || '0');
			paddingTop =        (s.paddingTop                || '0');
			paddingRight =      (s.paddingRight              || '0');
			paddingBottom =     (s.paddingBottom             || '0');
			paddingLeft =       (s.paddingLeft               || '0');
			borderTopWidth =    (s.borderTopWidth            || '0');
			borderRightWidth =  (s.borderRightWidth          || '0');
			borderBottomWidth = (s.borderBottomWidth         || '0');
			borderLeftWidth =   (s.borderLeftWidth           || '0');
		}
		f.addEventListener('click', function () {
			this.parentNode.replaceChild(this.nextSibling.firstChild, this.nextSibling);
			this.parentNode.removeChild(this);
		}, true);
		f.innerHTML = (e.title || e.name || e.id || e.data || e.alt || tag) + ' hidden';
	}
}
})();