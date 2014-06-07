// ==UserScript==
// @name           Fora VB - autologin
// @description  Skrypt pozwala na autologowanie się do for VB | Script allows to autologin forum VB
// @include        *
// @copyright pawellogrd
// ==/UserScript==
// Configurations:

Uzytkownik="User";	//Nazwa użytkownika || User
Haslo="Password";	//Hasło || Password

document.getElementById('vb_login_username').value=Uzytkownik;
document.getElementById('vb_login_password').value=Haslo;
document.getElementsByTagName('form')[0].submit();