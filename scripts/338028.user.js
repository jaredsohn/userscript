// ==UserScript==
// @name           Preloader conteúdo /forum.php (hardMOB)
// @author         drag.hm
// @version        0.2
// @description    pré-carrega botões, smiles, etc... para acelerar a navegação
// @include        http://www.hardmob.com.br/forum.php
// @run-at         document-end

// ==/UserScript==

/* irei adicionar mais entradas depois */

var images = new Array()
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
				}
			}
			preload(
"http://www.hardmob.com.br/images/statusicon/thread_new-30.png",
"http://www.hardmob.com.br/images/statusicon/thread_hot-30.png",
"http://www.hardmob.com.br/images/statusicon/thread_lock-30.png",
"https://images.weserv.nl/?il&amp;q=84&amp;fnr&amp;url=www.hardmob.com.br/images/buttons/verdinhas.png",
"https://images.weserv.nl/?il&amp;q=84&amp;fnr&amp;url=www.hardmob.com.br/dbtech/postbittabs/images/tab",
"https://images.weserv.nl/?il&amp;q=84&amp;fnr&amp;url=www.hardmob.com.br/dbtech/postbittabs/images/tab_selected.png"
			)