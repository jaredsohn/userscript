// ==UserScript==
// @name           MediaWiki PotBS Port Battle Widget/Template - Make icons draggable
// @namespace      armeagle.nl
// @author         ArmEagle (armeagle at gmail dot com)
// @include        http://www.burningsea.com/wiki/index.php?title=Port_Battle/*action=*
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/86611.meta.js
// ==/UserScript==
/*
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)
 */

(function(){
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/scriptaculous/1.8.3/effects.js');
  document.body.appendChild(script);
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/scriptaculous/1.8.3/dragdrop.js');
  document.body.appendChild(script);
  
  var available = setInterval(function() {
    if ( typeof (unsafeWindow) != "undefined" && typeof (unsafeWindow.Draggable) != "undefined" ) {
	  function DOM_script() {
	    var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	    script.setAttribute('type', 'text/javascript');
	    return script.textContent=DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");
	   
		$$('.icon, .wind_default').each(function(image){
		  var child = image.getElementsByTagName('div')[0];
		  if ( child != undefined ) {
		    child.setAttribute('title', image.className.split(' ')[0] +' | '+ child.getAttribute('title'));
		  }
		  new Draggable(image, {});
		});
		
		var pop = document.createElement('div');
		pop.textContent = 'list icon coordinates';
		pop.setAttribute('style', 'position: absolute; top: 5px; left: 5px; cursor: pointer; font-weight: bold; font-size: 16px; color: white;');
		Event.observe(pop, 'click', function() {
		  var ta = document.createElement('textarea');
		  ta.setAttribute('style', 'width: 300px; height: 300px; position: absolute; left: 50px; top: 20px');
		  $$('.map > .shipmap')[0].appendChild(ta);
		  Event.observe(ta, 'mouseout', function(event) {
		    $$('.map > .shipmap')[0].removeChild(event.target);
		  });
		  var str = '';
	      $$('.icon, .wind_default').each(function(image) {
		    var name = image.className.split(' ')[0];
		    if ( name == 'wind_default' ) {
			  name = 'winddial';
			}
            str += '|'+ name +'_x=' + image.getStyle('left').replace('px','') +'\n';
            str += '|'+ name +'_y=' + image.getStyle('top').replace('px','') +'\n';
          });
		  ta.value = str;
		  ta.focus();
		  ta.select();
		});
		$$('.map > .shipmap')[0].appendChild(pop);
	  }
	  DOM_script();
      clearInterval(available);
    }
  }, 40);
})();