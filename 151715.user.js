// ==UserScript==
// @name           Idea Bank autocomplete
// @include        https://secure.ideabank.pl/
// @include        https://secure.ideabank.pl/main/index*
// @author         Gwiazda Krzysztof
// @version        1.2
// ==/UserScript==

// =====
// Gdzie się zalogować
// =====
// Bezpśredni link do logowania: https://secure.ideabank.pl/
// lub 
// Strona główna banku: http://www.ideabank.pl/ -> zakładka: LOGOWANIE
// =====

// Proszę podać login do bankowości elektronicznej zamiast 'xxx' np. '52222498'


var idea_bank_login = 'xxx'; // domyślnie: xxx


// =====
// Wykonanie kodu
// Proszę nic poniżej nie zmieniać
// =====
var idea_target = document.getElementById('log')

if (idea_bank_login == 'xxx' || idea_bank_login == '') 
{
  idea_target.setAttribute('autocomplete','on');
}
else
{
  idea_target.value = idea_bank_login;
}