// ==UserScript==
// @name	Hupu Penzi Goaway		
// @include	*.hupu.com/*
// ==/UserScript==
(function(){
	var jianren_list = ['我真的笑了', 'serga', '喜欢冰人呀', '睡能养舟', '雲鸟', 'cloud_z_f ', '快乐南瓜', 'Chris_qx', 'defan'];
	var i, j, k, temp, author, u;
	if (typeof document.getElementsByClassName != 'function') { return; }
	var floors = document.getElementsByClassName('floor_box');
	for (i in floors) {
		author = false;
		for(j = 0; j < floors[i].children.length; j++) {
			if (floors[i].children[j].className == 'author') { author = floors[i].children[j]; break; }
		}
		if (!author) { console.log('Unexpected el 1'); return; }
		u = false;
		for(j = 0; j < author.children.length; j++) {
			if (author.children[j].tagName.toLowerCase() == 'a' && author.children[j].className == 'u') { u = author.children[j]; break; }
            for (k = 0; k < author.children[j].children.length; k++) {
                if (author.children[j].children[k].tagName.toLowerCase() == 'a' && author.children[j].children[k].className == 'u') { u = author.children[j].children[k]; break; }
            }
		}
		if (!u) { console.log('Unexpected el 2'); return; }
		if (jianren_list.indexOf(u.innerHTML) > -1) { //Find wild Penzi
            var user = false;
			for(j = 0; j < floors[i].parentNode.children.length; j++) {
				if (floors[i].parentNode.children[j].className == 'user') { user = floors[i].parentNode.children[j]; break; }
			}
            if (!user) { console.log('Unexpected el 3'); return; }
            for (j = 1; j < floors[i].children.length; j++) {
                floors[i].children[j].style.visibility = 'hidden';
            }
			floors[i].style.overflow = 'hidden';
            floors[i].style.height = author.offsetHeight + 'px';
            user.style.display = 'none';
			temp = document.createElement('span');
			temp.innerHTML = '手贱围观';
            temp.user = user;
			author.appendChild(temp);
			temp.onmouseover = function() { this.style.textDecoration = 'underline'; }
			temp.onmouseout = function() { this.style.textDecoration = 'none'; }
			temp.onclick = function() { 
				var all = this.parentNode.parentNode;
				all.style.height = 'auto';
                for (var j = 1; j < this.parentNode.parentNode.children.length; j++) {
                    this.parentNode.parentNode.children[j].style.visibility = 'visible';
                }
                this.user.style.display = 'block';
				this.style.display = 'none';
			}
		}
	}
})();