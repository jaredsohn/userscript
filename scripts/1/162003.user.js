// ==UserScript==
// @name        phpMyAdmin Infinite Session
// @namespace   pmais
// @description Mantiene viva la sesion de phpMyAdmin, haciendo un pedido AJAX cada minuto
// @include     http://127.0.0.1/phpmyadmin/navigation.php*
// @include     http://localhost/phpmyadmin/navigation.php*
// @include     http://127.0.0.1/*navigation.php?token=*
// @include     http://localhost/*navigation.php?token=*
// @include     http://127.0.0.1/navigation.php?token=*
// @include     http://localhost/navigation.php?token=*
// @version     1.1
// ==/UserScript==

$(function() {
	var to = 10, // TimeOut (seconds)
		u = window.location.pathname;
		
	u = u.substr(0, u.lastIndexOf("/") + 1) + $("#imgpmalogo").parent().attr("href");
	
	function l(m) {
		console.info("phpMyAdmin-Infinite-Session | " + m + " | " + u);
	}
	
	function c() {
		l("Realizando pedido...");
		$.ajax({
			url: u,
			complete: function() {
				l("Pedido terminado!");
				setTimeout(c, 1000 * to);
			}
		});
	}
	
	l("Iniciado!");
	c();
});