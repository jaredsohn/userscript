// ==UserScript==
// @name           Kurnik - autologin
// @description  Skrypt pozwala na autologowanie się do konta na Kurniku. Autor - pawellogrd
// @include        http://www.kurnik.pl/*/
// @copyright pawellogrd
// ==/UserScript==
// Configurations:

User="Użytkownik";		//Nazwa użytkownika
Password="Hasło";		//Hasło

document.getElementById('id').value=User;
document.getElementById('pw').value=Password;
document.getElementsByTagName('form')[0].submit();