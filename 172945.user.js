// ==UserScript==
// @name       Tumblr Position Rememberer
// @version    0.6
// @description  Holy fuck, don't you hate it when you're infinite scrolling and you refresh or some shit and lose your spot? Not any fucking more, motherfucker. Fuck!
// @match      http://*.tumblr.com/dashboard*
// ==/UserScript==

var posts = document.getElementById('posts'),
	page = 1,
	num_posts = 0,
	anchor = '';

window.onload = function(){
	num_posts = posts.children.length; // Should reliably be 12 the first time, but it doesn't hurt to be safe.
	root = document.body.getAttribute('data-page-root');
	if(root != '/dashboard') page = root.substring(root.indexOf('/', 1)+1, root.lastIndexOf('/'));
	if(localStorage['boxofbaskets.position.anchor'] && localStorage['boxofbaskets.position.page']){
		right_column = document.getElementById('right_column');
		radar = document.getElementById('tumblr_radar');
		anchor_link = document.createElement('ul');
		anchor_link.className = 'controls_section';
		anchor_link.innerHTML = '<li><a class="posts" href="' + '/dashboard/' + localStorage['boxofbaskets.position.page'] + '/' + localStorage['boxofbaskets.position.anchor'] + '"><div>Go to last saved point</div></a></li>';
		right_column.insertBefore(anchor_link, radar);
	}
	setInterval(function(){
		if(num_posts != posts.children.length){
			posts.children[num_posts + 1].children[0].style.border = '2px solid #FF934C';
			localStorage['boxofbaskets.position.anchor'] = posts.children[num_posts].children[0].getAttribute('data-post-id');
			localStorage['boxofbaskets.position.page'] = ++page;
			num_posts = posts.children.length;
		}
	},1000);
}