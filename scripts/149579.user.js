// ==UserScript==
// @name          Put Those Tracked Tags Back Where They Came From Or So Help Me
// @namespace     http://www.tumblr.com
// @description	  Shows your currently tracked tags in the sidebar again. They will pop up when you click the "Search tags" bar though.
// @version       0.0.1
// @include       http://www.tumblr.com/dashboard*
// @include       http://www.tumblr.com/blog*
// @include       http://www.tumblr.com/tagged*
// ==/UserScript==

var origEl = document.getElementById('popover_tracked_tags');
if(origEl){
	var origList = origEl.getElementsByClassName('tracked_tag');
	if(origList.length){
		var ttContainer = document.createElement('ul');
		ttContainer.setAttribute('class', 'controls_section');
		var bla = new RegExp(' new posts| new post', 'ig');
		for(var i=0; i<origList.length; i++){
			var oa = origList[i].getElementsByTagName('a');
			if(!oa.length)
				continue;
			oa = oa[0];
			
			var tli = document.createElement('li');
			var ta = document.createElement('a');
			ta.setAttribute('class', 'tag');
			var tdiv = document.createElement('div');
			tdiv.setAttribute('class', 'hide_overflow');
			
			var thref = oa.getAttribute('href');
			ta.setAttribute('href', thref);
			
			var tname = 'SOME TAG';
			var el = oa.getElementsByClassName('hide_overflow');
			if(el.length){
				tname = el[0].innerHTML;
			}
			tdiv.innerHTML = tname;
			ta.appendChild(tdiv);
			
			var tcount = null;
			el = oa.getElementsByClassName('count');
			if(el.length){
				tcount = el[0].innerHTML;
				tcount = tcount.replace(bla, '');
				var tspan = document.createElement('span');
				tspan.setAttribute('class', 'count');
				tspan.innerHTML = tcount;
				ta.appendChild(tspan);
			}
			
			tli.appendChild(ta);
			ttContainer.appendChild(tli);
		}
		var rc = document.getElementById('right_column');
		if(rc){
			var tr = document.getElementById('tumblr_radar');
			if(tr && tr.parentNode == rc){
				rc.insertBefore(ttContainer, tr);
			}else{
				rc.appendChild(ttContainer);
			}
		}
	}
}
