// ==UserScript==
// @name           Getin Bank autocomplete
// @include        https://secure.getinbank.pl/
// @include        https://secure.getinbank.pl/main/index*
// @author         Gwiazda Krzysztof
// @version        1.3
// ==/UserScript==

// =====
// Gdzie się zalogować
// =====
// Bezpśredni link do logowania: https://secure.getinbank.pl/
// lub 
// Strona główna banku: http://getinbank.pl -> zakładka: Logowanie, klienci indywidualni
// =====

// Proszę podać login do bankowości elektronicznej zamiast 'xxx' np. '52222498'


var getin_bank_login = 'xxx'; // domyślnie: xxx


// =====
// Wykonanie kodu
// Proszę nic poniżej nie zmieniać
// =====
var getin_target = document.getElementById('log')

if (getin_bank_login == 'xxx' || getin_bank_login == '') 
{
  getin_target.setAttribute('autocomplete','on');
}
else
{
  getin_target.value = getin_bank_login;
}