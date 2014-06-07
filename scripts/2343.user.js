// Post multiple social tags/bookmarks to sites (de.lirio.us and simpy) 
// based on input for Del.icio.us
// version 0.2 BETA!
// 2005-12-11
//
// ==UserScript==
// @name            Multipost social bookmarks
// @namespace       http://belanda.net/greasemonkey/
// @description     Multiposts using the values entered into del.icio.us form to de.lirio.us and Simpy
// @include         http://del.icio.us/*?v=2&*
// ==/UserScript==

(function(){

	var stumbit,url,desc,notes,tags;
	var deliriousurl = "http://de.lirio.us/rubric/post";
	var simpyurl = "http://www.simpy.com/simpy/api/rest/SaveLink.do?";

	url = document.getElementById('url');
	title = document.getElementById('description');
	desc = document.getElementById('notes');
	tags = document.getElementById('tags');

  var inputs;
  inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute("type") == 'submit') {
      stumbit = inputs[i];
    }
  }

	function submitHandler(event) {
  	var form = event ? event.target : this;
		
		submDelirious();
		submSimpy();

      // call real submit function
    form._submit();
  }

	function submDelirious() {

		GM_xmlhttpRequest({
		  method:"POST",
		  url:deliriousurl,
		  headers:{
				"Content-Type":"application/x-www-form-urlencoded"
		    },
			data:"uri="+escape(url.value)+"&title="+escape(title.value)+"&description="+escape(desc.value)+"&tags="+escape(tags.value)+"&submit=save"
		});
	}

  function trim(text) {
    while (text.substring(0,1) == ' ') {
      text = text.substring(1, text.length);
    }
    while (text.substring(text.length - 1, text.length) == ' ') {
      text = text.substring(0, text.length - 1);
    }
    return text;
  }

	function sp2pl(text) {

		var atags,ptags;

    atags = text.split(' ');
    for (var i = 0; i < atags.length; i++) {
      atags[i] = trim(atags[i]);
    }
    ptags = atags.join("+");

		return ptags;
	}

	function submSimpy() {

		var href,ti,dsc,tgs;

		href=sp2pl(trim(url.value));
		ti=sp2pl(trim(title.value));
		dsc=sp2pl(trim(desc.value));
		tgs=sp2pl(trim(tags.value));

		GM_xmlhttpRequest({
		  method:"GET",
		  url:simpyurl+"href="+escape(href)+"&title="+escape(ti)+"&urlNickname="+escape(ti)+"&note="+escape(dsc)+"&tags="+escape(tgs)+"&accessType=1"
		});
	}
  
  if (stumbit != null) {
      // See http://www.userscripts.org/scripts/show/1411
    window.addEventListener('submit', submitHandler, true);
    HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
    HTMLFormElement.prototype.submit = submitHandler;
  }
  
}) ();
