// ==UserScript==
// @name           JST Expander
// @version        1.1
// @description    Embeds the Joseph Smith Translation (JST) footnotes into the scriptures at http://classic.scriptures.lds.org and http://lds.org/scriptures with red text so that you won't miss these important footnotes while studying scriptures online.
// @include        http://classic.scriptures.lds.org/*
// @include        http://new.lds.org/scriptures/*
// @include        https://new.lds.org/scriptures/*
// @include        http://lds.org/scriptures/*
// @include        https://lds.org/scriptures/*
// ==/UserScript==



(function()
{
	function insertafter(newChild, refChild) { 
		refChild.parentNode.insertBefore(newChild,refChild.nextSibling); 
	}; 
	
  function appendRedElement(refElem, redText) { 
	      var newnode = document.createElement('span');
				var font = document.createElement('font');
        newnode.innerHTML = '&nbsp;(' + redText + ')&nbsp;';
				font.style.color = 'red';
				font.appendChild(newnode);
				insertafter(font,refElem);
  };

  function makeCallback(myelem) { 
	  return function(responseDetails){
      var index = responseDetails.responseText.indexOf('JST');
      if(index != -1)
      {
        var newstr = '<span class="small">' + responseDetails.responseText.substring(index);
        index = newstr.indexOf('<a');
        if(index != -1) newstr = newstr.substring(index,-1);
        index = newstr.indexOf('</div');
        if(index != -1) newstr = newstr.substring(index,-1);

        appendRedElement(myelem,newstr);
      }
    };
  }

  if(window.location.host == "new.lds.org" || window.location.host == "lds.org")
  {
    var elems = document.getElementsByTagName('a');
    var numelems = elems.length;
    for(var i=0; i<numelems; i++)
    {
      var myelem = elems[i];
      var elemclass = myelem.getAttribute('class');
      var elemhref = myelem.getAttribute('rel');
      if( elemclass == "footnote" )
      {
          // if we got a footnote, retrieve the footnote info
          GM_xmlhttpRequest({
            method:'GET',
            url:elemhref,
            onload:makeCallback(myelem)
          });
      }
    }
  }
  else
  {
    var links = document.getElementsByTagName('a');
    var len = links.length;
    for(var i=0; i<len; i++)
    {
      var title = links[i].getAttribute('title');
      if( title )
      {
        var isJST = (title.indexOf('JST') != -1);
        if(isJST)
        {
          appendRedElement(links[i],title);
        }
      }
    }
  }

})()

