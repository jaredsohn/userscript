// ==UserScript==
// @name           jedi.net.ru cleaner
// @namespace      http://userscripts.org/users/404192
// @include        http://jedi.net.ru/viewtopic.php?*
// @include        http://www.jedi.net.ru/viewtopic.php?*
// ==/UserScript==
(function(){
  function onLoad()
  {  
		var sings = document.getElementsByClassName('postsignature');
		for(var i = 0; i < sings.length; i++){
			var imgs = sings[i].getElementsByTagName('img');
			for(var ii = 0; ii < imgs.length; ii++){
			    if(imgs[ii].className == 'sigimage' &&
					(imgs[ii].width > 350 || imgs[ii].height > 65)){    
			        imgs[ii].style.visibility = 'hidden'
					sings[i].style.height = '100px'
			    }
			}
		}
  }
  onLoad();
})();