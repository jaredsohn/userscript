// ==UserScript==
// @name           LJ Post Collapse
// @namespace      http://*.livejournal.com/*
// @description    Adds a button for collapsing and expanding posts on pages using the 'A Sturdy Gesture' theme by Martin Atkins
// @include        http://*.livejournal.com/*
// ==/UserScript==


(function() {

  function addStyle(className,css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) return;
    var style = head.getElementsByTagName('style')[0]   
    if (!style) {
      style = document.createElement('style');
      style.type = 'text/css';
      head.appendChild(style);
    }
    style.innerHTML += className+'{'+css+'}';    
  }

  addStyle('.expandButton','float:right; margin: 2px 2px 0 0; width:17px; height:17px; cursor:pointer; '+
                          'background-image:url(http://braibagrasshand.googlepages.com/expand.png);');
  addStyle('div.expandButton:hover','background-image:url(http://braibagrasshand.googlepages.com/expandhover.png);');
  
  addStyle('.collapseButton','float:right; margin: 5px 5px 0 0; width:17px; height:17px; cursor:pointer; '+
                             'background-image:url(http://braibagrasshand.googlepages.com/collapse.png);');
  addStyle('div.collapseButton:hover','background-image:url(http://braibagrasshand.googlepages.com/collapsehover.png);');
                             

	// First, check to see if the x/y values are stored and reposition
	var pageOffset = GM_getValue('pageOffset');
	if (pageOffset) {
		var offset = pageOffset.split(",");
		window.scrollTo(offset[0], offset[1])
		GM_setValue('pageOffset', '');
	}
	
	var collapsedList = GM_getValue('collapsedList', '');
	
  var mainbody = document.getElementById('body');
  if (!mainbody) return;
  var divs = mainbody.getElementsByTagName('div');
  for (var y=0; y<divs.length; y++){
    var div = divs[y];
    if (div.className!="box") continue;
        
    var h2 = divs[y].getElementsByTagName('h2')[0];
    var headtext = '';
    for (var x=2; x<h2.childNodes.length; x++)
      switch (h2.childNodes[x].nodeType){
        case 1: headtext += h2.childNodes[x].innerHTML; break;
        case 3: headtext += h2.childNodes[x].nodeValue; break;
      }
    if (headtext.length==0) headtext = 'Untitled Post for '+h2.childNodes[0].nodeValue;  
    var id = '?';
    
    var divs2 = divs[y].getElementsByTagName('div');
    for (var x=0; x<divs2.length; x++){
      var div2 = divs2[x];
      if (div2.className!='permalink') continue;
      id = div2.firstChild.href;
      break;
    }
    
    if (id=='?') continue;
    
    div.setAttribute('postid',id);
    
    var wrapper = document.createElement('div');
    
    var collapser = document.createElement('div');
    collapser.addEventListener('click',collapsePost,false);
    collapser.className = 'collapseButton';
    wrapper.appendChild(collapser);
    
    var children = div.childNodes;
    for (var x=0; children.length>0; x++){
      var child = children[0];
      div.removeChild(child);
      wrapper.appendChild(child);
    }
    div.appendChild(wrapper);
    
    var alt = document.createElement('h2');
    alt.style.cssText = h2.style.cssText;
    //.padding = '3px';    
        
    var expander = document.createElement('div');
    expander.addEventListener('click',expandPost,false);
    expander.className = 'expandButton';
    alt.appendChild(expander);
    
    var alttext = document.createElement('div');
    alttext.innerHTML = headtext;
    alt.appendChild(alttext);
    
    div.appendChild(alt); 
    
    if (collapsedList.indexOf('^'+id+'$')==-1)
      alt.style.display = 'none';
    else  
      wrapper.style.display = 'none';  
      
  }

  function expandPost(){
    var box = this.parentNode.parentNode;
    box.childNodes[0].style.display = 'block';
    box.childNodes[1].style.display = 'none';
    var id = box.getAttribute('postid');
    if (id){  
      var collapsedList = GM_getValue('collapsedList','');
      collapsedList = collapsedList.replace('^'+id+'$','');
      GM_setValue('collapsedList',collapsedList);
    }
  }
  
  function collapsePost(){  
    var box = this.parentNode.parentNode;
    box.childNodes[0].style.display = 'none';
    box.childNodes[1].style.display = 'block';
    var id = box.getAttribute('postid');
    if (id){  
      var collapsedList = GM_getValue('collapsedList', '');
  		if (collapsedList.indexOf('^'+id+'$') == -1)
			  GM_setValue('collapsedList', collapsedList+'^'+id+'$');
    }
  }  

})();