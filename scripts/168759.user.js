// ==UserScript==
// @name       Tumblr Post Shortener
// @version    0.7
// @description  Goddammit, stop making long ass posts because you think I want to see your whole fucking photo essay.
// @match      http://*.tumblr.com/*
// ==/UserScript==

var posts = document.getElementById('posts'),
    i = 1,
    embiggen_span = document.createElement('div'),
    embiggen_a = document.createElement('a'),
    expand_text = localStorage['boxofbaskets.expander.vulgar'] ? 'Fucking embiggen' : '[ + Expand ]',
    collapse_text = localStorage['boxofbaskets.expander.vulgar'] ? 'TOO DAMN LONG' : '[ - Collapse ]',
	embiggen = function(){
        post = document.querySelector('#' + this.classList[1]);
        post_content = post.querySelector('.post_content');
        post_content.classList.toggle('collapsed_post');
        if(this.children[0].textContent == expand_text) this.children[0].textContent = collapse_text;
        else this.children[0].textContent = expand_text;
    };

window.onload = function(){
    embiggen_a.innerText = expand_text;
    embiggen_span.className = 'embiggener';
    embiggen_span.appendChild(embiggen_a);
    embiggen_span.collapsed = '1';
    
    css_node = document.createElement('style');
    css_node.type = 'text/css';
    css_node.textContent = ".embiggener{text-decoration: none; font-weight: bold; cursor: pointer; clear: both} .collapsed_post{height: 500px; overflow: hidden;}";
    document.head.appendChild(css_node);
    
    var scan_posts = function(){
        for(i; i < posts.children.length; i++){
            var post_content = posts.children[i].querySelector('.post_content');
            if(post_content && post_content.offsetHeight > 1000){
             	post_content.classList.toggle('collapsed_post');
                
                embiggener_clone = embiggen_span.cloneNode(true);
                embiggener_clone.onclick = embiggen;
                embiggener_clone.classList.add(posts.children[i].querySelector('.post').getAttribute('id'));
                
                posts.children[i].querySelector('.post_header').appendChild(embiggener_clone);
            }
        }
    }
    
    scan_posts();
    setInterval(scan_posts, 700);
}
