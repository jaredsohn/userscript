// ==UserScript==
// @name           d3_no_user
// @namespace      http://dirty.ru
// @description    Hide dirty user at all
// @version 	   1.1
// @include        http://dirty.ru/*
// @include        http://www.dirty.ru/*
// @include        http://leprosorium.ru/*
// @include        http://www.leprosorium.ru/*
// ==/UserScript==
(
	function() {

		var p = location.pathname;
		var win = window.wrappedJSObject || window;
		var sBastards = win.localStorage.getItem('bastards');
		var bastards = [];
		var proMode = win.localStorage.getItem('bastards_pro_mode') == '1';
		if (sBastards) {
			try {
				bastards = JSON.parse(sBastards)
			} catch(e) {
				bastards = [];
			}
		}
		var el, div, html;
		if (p.indexOf('/my')==0) {
			if (p.indexOf('/my/socialism')==0 && (el = document.querySelector('td#td1'))) {
				el.appendChild(div=document.createElement('div'));
				div.id="lololo";
				html = '<h3>Спрятанные</h3>';
				html += '<form><div id="hidden_bastards">';
				html += '</div><div id="add_hidden_bastard">';
				html += '<label for="txt_hidden_bastard">Спрятать одного или нескольких <br />(через запятую): </label><br />';
				html += '<input type="text" id="txt_hidden_bastard" />';
				html += '<input type="image" value="Yarrr!" alt="Yarrr!" name="Yarrr!" src="http://img.dirty.ru/d3/social-add-button.gif" class="image" id="butt_hidden_bastard"><br />';
				html += '<input type="checkbox" id="chb_dont_remind"/> <label for="chb_dont_remind">И не напоминать!</label>'
				html += '</div></form>';
				div.innerHTML = html;
				el = document.querySelector('#butt_hidden_bastard');
				if (el) {
					el.addEventListener('click', soc_add_hidden_bastard, false);
				}
				el = document.querySelector('#chb_dont_remind');
				if (el) {
					el.checked = proMode;
					el.addEventListener('click', soc_pro_mode, false);
				}
				soc_draw_hidden();
			} else {
				comm_hide_posts();
			}
			
		} else if (p.indexOf('/comments')==0) {
			comm_hide_posts();
		} else if (p.indexOf('/news')==0) {
			comm_hide_posts();
		} else {
			comm_hide_posts();
		}
		
		function soc_pro_mode(e) {
			win.localStorage.setItem('bastards_pro_mode', this.checked ? '1': '0') ;
		}			
		
		function comm_hide_posts() {
			var posts = document.querySelectorAll('div.post,div.comment');
			var hideIndent = 999;
			var cindent = 0;
			var cScore = {};
			for (i=0; i<posts.length; i++) {
				var post = posts[i];
				var classes = post.className.split(' ');
				for (j=0; j<classes.length; j++) {
					if (classes[j].indexOf('indent_')==0) {
						cindent = parseInt(classes[j].substr(7));
					}
				}
				var name=get_author_name(post);
				if (is_one_of_the_bastards(name) || cindent>hideIndent) {
					if (hideIndent>100) hideIndent=cindent;
					if (is_one_of_the_bastards(name)) {
						if (cScore[name]) {
							cScore[name]++;
						} else {
							cScore[name] = 1;
						}
					}
					post.style.display = 'none';
				} else {
					hideIndent = 999;
					post.style.display = 'block';
				}
				
			}
			
			var ul = document.querySelector('ul.left_col_nav');
			if (!proMode && ul) {
				var html = 'Cпрятаны:<br /> ';
				var add = false;
				for (i=0; i<bastards.length; i++) {
					if (cScore[bastards[i]]) {
						html+='<div style="padding-left:1em"><a href="/user/'+bastards[i]+'" class="his-name">'+bastards[i]+'</a> ('+cScore[bastards[i]]+')<a href="#" title="показать его" class="show-him">[+]</a></div><br />';
						add = true;
					}
				} 
				if (!add) {
					html += 'А никто не спрятан!';
				}
				ul.appendChild(li = document.createElement('li'));
				li.innerHTML = html;
				var as = li.querySelectorAll('a.show-him');
				console.log(as);
				for (i=0; i<as.length; i++) {
					as[i].addEventListener('click', function(e){
						var basEl = this.parentNode.querySelector('a.his-name');
						var bastard;				
						if (basEl) {
							del_hidden_bastard(basEl.innerHTML, confirm('Показать OK - временно или Cancel - постоянно?'))
							comm_hide_posts();
						}
						if (e) e.preventDefault();
					}, false);
				}
			}
		}
		
		function get_author_name(el) {
			var a = el.querySelector('a[href^=\'/user/\']'), name;
			if (!a) return null;
			if (a && (name = a.innerHTML)) {
				return name;
			} else {
				return false;
			}
		}
		
		function soc_add_hidden_bastard(e) {
			var txt = document.querySelector('#txt_hidden_bastard');
			var present;
			if (txt && txt.value) {
				add_hidden_bastard(txt.value)
				soc_draw_hidden();
			}
			if (e) e.preventDefault();
		}
		function add_hidden_bastard(names) {
			var newBastards = names.split(',');
			for (i=0; i<newBastards.length; i++){
				nbast = newBastards[i].trim().toLowerCase();
				if (!is_one_of_the_bastards(nbast)) {
					bastards.push(nbast);
				}
			}
			bastards.sort();
			save_bastards();
		}
		function soc_del_hidden_bastard(e) {
			var basEl = this.parentNode.querySelector('span');
			var bastard;				
			if (basEl) {
				del_hidden_bastard(basEl.innerHTML)
				soc_draw_hidden();
			}
			if (e) e.preventDefault();
		}
		function del_hidden_bastard(name, temp) {
			for (i=0; i<bastards.length; i++){
				if (bastards[i] == name) {
					bastards.splice(i,1);
					break;
				}
			}
			if (!temp) save_bastards();
		}
		function soc_draw_hidden() {
			var el = document.querySelector('#hidden_bastards');
			var html = '';
			if (el) {
				html+='<blockquote>';
				if (bastards && bastards.length) {
					for (i=0; i<bastards.length; i++) {
						html+='<div><span>'+bastards[i]+'</span> <a href="#">[x]</a></div>';
					}
				} else {
					html += 'Никто пока не спрятан';
				}
				html+='</blockquote>';
				el.innerHTML = html;
				var as = el.querySelectorAll('div a');
				for (i=0; i<as.length; i++) {
					as[i].addEventListener('click', soc_del_hidden_bastard, false);
				}
			}
		}

		function save_bastards() {
			win.localStorage.setItem('bastards', JSON.stringify(bastards));
		}
		function is_one_of_the_bastards(name) {
			if (!name) return false;
			name = name.toLowerCase();
			for (j=0; j<bastards.length; j++){
				if (name ==  bastards[j]) {
					return true;
				}
			}
			return false;
		}
		
		String.prototype.trim = function() {
			var l=0, r=this.length-1;
			while (l<=r && this[l]==' ') l++;
			while (r>=l && this[r]==' ') r--;
			return this.substring(l, r+1);
		}
	}
)();


