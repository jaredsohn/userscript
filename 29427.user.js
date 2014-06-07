// ==UserScript==
// @name           	Query String Input Autofiller
// @namespace      	http://adityamukherjee.com/geekaholic
// @description    	Automatically fill input boxes using query strings
// @include        	*
// @author		Aditya Mukherjee
// ==/UserScript==

/*
	Set the following variable to '1' (on)
	to add a hover tip on every text box
	on the page containing its #ID for easy
	identification, else '0' (off)
*/
qsi_labelbox = 1;

window.addEventListener('load', function(){
	qs = location.search.replace('?', '').split('&');
	if (!qs || qs == "")
		return;
	tags = ['input', 'textarea'];
	for(i=0;i<qs.length;i++){
		query = qs[i].split('=');
		el = document.getElementById(query[0]) || document.getElementById(query[0].toLowerCase()) || document.getElementById(query[0].toUpperCase());
		if(!el){//in case we couldn't find input#ID or textarea#ID
			for(j=0;j<tags.length;j++){
				el = document.getElementsByTagName(tags[j]);
				for(k=0;k<el.length;k++)
					if(el[k].getAttribute('name') && el[k].getAttribute('type').toLowerCase() != 'hidden' && el[k].value == "")
						if(el[k].getAttribute('name').toLowerCase() == query[0].toLowerCase())
							if(tags[j] == 'textarea')
								el[k].innerHTML = decodeURIComponent(query[1])
							else
								el[k].value = decodeURIComponent(query[1]);
			}
		} else {
			if(el.nodeName == 'TEXTAREA' && el.innerHTML == "")//for TEXTAREA (`innerHTML` not `value`)
				el.innerHTML = decodeURIComponent(query[1]);
			else {//for everything else
				if(el.getAttribute('type').toLowerCase() != 'hidden' && el.value == "")
					el.value = decodeURIComponent(query[1]);
			}
		}
	}
	
	if(qsi_labelbox){
		tags = ['input', 'textarea'];
		for(m=0;m<tags.length;m++){
			inps = document.getElementsByTagName(tags[m]);
   			for(i=0;i<inps.length;i++){
				if(inps[i].getAttribute('id'))
   					inps[i].setAttribute('title', '#' + inps[i].getAttribute('id'));
				else if(inps[i].getAttribute('name'))
					inps[i].setAttribute('title', '#' + inps[i].getAttribute('name'));
				else
					continue;
			}
		}
	}
	
}, true);