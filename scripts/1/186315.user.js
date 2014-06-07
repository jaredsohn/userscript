// ==UserScript==
// @name           mBank autocomplete (stary serwis)
// @include        https://www.mbank.com.pl/
// @author         Gwiazda Krzysztof
// @version        1.0
// ==/UserScript==

// =====
// Gdzie się zalogować
// =====
// Bezpśredni link do logowania: https://www.mbank.com.pl/
// =====

// Proszę podać login do bankowości elektronicznej zamiast 'xxx' np. '52222498'


var mbank_target = 'xxx'; // domyślnie: xxx


// =====
// Wykonanie kodu
// Proszę nic poniżej nie zmieniać
// =====
var mbank_target = document.getElementById('userID')

if (mbank_login == 'xxx' || mbank_login == '') 
{
  mbank_target.setAttribute('autocomplete','on');
}
else
{
  mbank_target.value = mbank_login;
}