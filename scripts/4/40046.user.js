// ==UserScript==
// @name           fuckoffkittysafe
// @description    fuckoffkittysafe
// @include        http://redbarradio.com/forum/*
// ==/UserScript==


initFOKS = function() {
	var threadbody = document.getElementById('quickModForm').getElementsByTagName('table')[0];
	var posts = threadbody.getElementsByTagName('tbody')[0].childNodes;
	var toadd = new Array();
	for(var i=0; i<posts.length; i++){
		if(posts[i].tagName != null){
			var bs = posts[i].getElementsByTagName('b');
			if(bs.length >= 1){
				var name = bs[0].firstChild.text;
				if(name == 'Kittysafe'){
					// faggot
					posts[i].id = 'hidden'+i;
					posts[i].style.display = 'none';
					toadd.push(posts[i]);
					//posts[i].parentNode.removeChild(posts[i]);
				}else{
					// mentioned a faggot's name
					if(posts[i].innerHTML != null && posts[i].innerHTML.match('Kittysafe')){
						//if(name != 'coughman' && name != 'DavidAngelo' && name != 'redbarradio'){
								// hide post
								if(! toadd.contains(posts[i])){
									posts[i].id = 'hidden'+i;
									posts[i].style.display = 'none';
									toadd.push(posts[i]);
								}
						//}
					}
				}
			}
		}
	}
	for(var i=0; i<toadd.length; i++){
		var expand_tr = document.createElement('tr');
		var expand_td = document.createElement('td');
		var expand_a = document.createElement('a');
		var name = toadd[i].getElementsByTagName('b')[0].firstChild.text;
		var str;
		if(name == 'Kittysafe'){
			str = 'faggot';
		}else{
			str = name +' mentioned a faggot';
		}
		var expand_text = document.createTextNode(str);
		expand_a.appendChild(expand_text);
		expand_td.appendChild(expand_a);
		expand_tr.appendChild(expand_td);
		toadd[i].parentNode.appendChild(expand_tr);
		toadd[i].parentNode.insertBefore(expand_tr, toadd[i]);
		expand_a.setAttribute('href', 'javascript:void(0);');
		expand_a.id = 'expander'+toadd[i].id;
		expand_a.setAttribute('onclick', 'document.getElementById("'+toadd[i].id+'").style.display="";this.style.display="none"');
		expand_td.style.backgroundColor='RGB(128,0,0)';
		expand_a.style.color='white';
		expand_a.style.fontWeight='bold';
		expand_a.style.textAlign='center';
	}
}

if (!Array.prototype.contains){
    Array.prototype.contains = function(obj){
    var len = this.length;
    for (var i = 0; i < len; i++){
      if(this[i]===obj){return true;}
    }
    return false;
  };
}

initFOKS();

