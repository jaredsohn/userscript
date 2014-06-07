// ==UserScript==
// @name           Deutsche Bank (db easyNet) new login
// @include        https://ebank.db-pbc.pl/auth/login.jsp
// @author         Gwiazda Krzysztof
// @version        1.3
// ==/UserScript==

// =====
// Gdzie się zalogować
// =====
// Bezpśredni link do logowania: https://ebank.db-pbc.pl/auth/login.jsp
// lub 
// Strona główna banku: https://www.deutschebank.pl/ -> zakładka: Logowanie -> db easyNet
// =====

// Proszę podać login do bankowości elektronicznej zamiast 'xxx' np. '52222498'

var db_bank_login = 'xxx'; // domyślnie: xxx


// =====
// Wykonanie kodu
// Proszę nic poniżej nie zmieniać
// =====
var db_login_target = document.getElementById('idPl')

if (db_bank_login == 'xxx' || db_bank_login == '') 
{
  db_login_target.setAttribute('autocomplete','on');
  db_login_target.removeAttribute('onpaste');
  db_login_target.removeAttribute('ondrop');
}
else
{
  db_login_target.value = db_bank_login;
}

var db_pass_target = document.getElementById('passPl')

db_pass_target.removeAttribute('onpaste');
db_pass_target.removeAttribute('ondrop');