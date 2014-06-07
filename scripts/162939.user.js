// ==UserScript==
// @name           FacebookRightSidebarToggle
// @description    Makes a button at top of left column that toggles right sidebar appearence 
// @namespace      http://serverfire.net/gmscripts
// @version 1.1
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// @include        https://www.facebook.com/*
// @include        https://facebook.com/*
// @grant	   GM_getValue
// @grant	   GM_setValue
// ==/UserScript==
;(function(window){
    function elementInsertFirst(pel, el)
    {
	var fch;
	for(var i = 0; i < pel.childNodes.length; ++i)
	{
	    if(pel.childNodes[i].nodeType == document.ELEMENT_NODE)
	    {
		fch = pel.childNodes[i];
		break;
	    }
	}
	if(fch)
	    pel.insertBefore(el, fch)
	else
	    pel.appendChild(el);
    }
    var style_el = document.createElement('style');
    style_el.type = 'text/css';
    styles = {
	fbRightCol: GM_getValue('fbRightCol')
    };
    updateSyles();
    addElementToHead(style_el);
    function elementContains(pel, el)
    {
	while(pel != el.parentNode)
	    if(!(el = el.parentNode))
		return false;
	return true;
    }
    function updateSyles()
    {
	style_el.innerHTML = '#rightCol { visibility: '+
	    (styles.fbRightCol == 'hide' ? 'hidden' : 'visible')
	    +' !important; }';
    }
    function addElementToHead(el)
    {
	var head = document.getElementsByTagName('head');
	if(head.length > 0)
	    head.item(0).appendChild(el);
    }
    function toggle_sidebar(b)
    {
	if(b === undefined)
	    b = styles.fbRightCol == 'hide';
	styles.fbRightCol = b ? 'show' : 'hide';
	updateSyles();
	return b;
    }
    window.addEventListener('DOMContentLoaded', function()
	{
	    if(!style_el.parentNode)
		addElementToHead(style_el);
	    var leftCol = document.getElementById('leftCol');
	    if(leftCol)
	    {
		var toggle_btn = document.createElement('button');
		toggle_btn.innerHTML = 'Toggle Right Sidebar';
		toggle_btn.addEventListener('click', function()
		   {
		       if(toggle_sidebar())
			   GM_setValue('fbRightCol', 'show');
		       else
			   GM_setValue('fbRightCol', 'hide');
		       return false;
		   });
		elementInsertFirst(leftCol, toggle_btn);
		setInterval(function()
		  {
		      var body = document.getElementsByTagName('body').item(0);
		      if(!elementContains(body, toggle_btn))
		      {
			  var leftCol = document.getElementById('leftCol');
			  if(leftCol)
			      elementInsertFirst(leftCol, toggle_btn);
		      }
		  }, 3000);
	    }
	});
})(window);
