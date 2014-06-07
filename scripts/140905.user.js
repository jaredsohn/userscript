// ==UserScript==
// @name        Jira - Stop editing Descriptions!
// @namespace   http://userscripts.org/users/480854
// @description Remove the css class that lets you edit descriptions directly
// @include     http://jira.chasesoftware.co.za/*
// @version     6
// ==/UserScript==

function getElementsByClassName(classname, node) {
    if(!node) node = document.getElementsByTagName("body")[0];

    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");

    for(var i=0,j=els.length; i<j; i++) {
		if(re.test(els[i].className))
		  a.push(els[i]);
	}
	return a;
};

function hasClass(el, name) {
   return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
};

function addClass(el, name)
{
   if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
};

function removeClass(el, name)
{
   if (hasClass(el, name)) {
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
   }
};

function addEvent(elem, event, func ) {
    if (!!window.attachEvent){
        elem.attachEvent('on' + event, func);
    } else {
       elem.addEventListener(event, func, false);
    }
};


// the guts of this userscript
function main() {
	//console.log('main');
	function setup() {
		var 
			description = document.getElementById("description-val"),
			icons =  description ? getElementsByClassName('icon-edit-sml', description) : null,
			icon = null;
		if (icons && icons.length > 0) {
			icon = icons[0];
		};
		//console.log('description', description);
		//console.log('icons', icons);
		//console.log('icon', icon);
		//console.log('icon.getAttribute(\'stfu\')', icon ? icon.getAttribute('stfu') : null);

		if (icon && icon.getAttribute('stfu') != "true") {
			//console.log('setting again', icon.getAttribute('stfu'));
			addEvent(icon, 'mouseover', function () {
				//console.log('yay!');
				removeClass(document.getElementById("description-val"), 'uneditable');
			});
			addEvent(icon, 'mouseout', function () {
				//console.log('boo!');
				addClass(document.getElementById("description-val"), 'uneditable');
			});

			addEvent(icon, 'click', function(){
				icon.setAttribute('stfu', 'false');
			});

			icon.setAttribute('stfu', 'true');
			addClass(document.getElementById("description-val"), 'uneditable');
			description.setAttribute('title', '');
		};
				
		if (icon && (!description || description.hasClass('active'))) {
			icon.setAttribute('stfu', 'false');
		}
	};
	setup();
	window.setInterval(setup, 2500);
};


// load jQuery and execute the main function
main();
