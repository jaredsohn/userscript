// ==UserScript==
// @name           GMail - autologin - PL & ENG
// @description  Skrypt pozwala na autologowanie się do konta GMail || Script allows to autolog to your GMail account; Skrypt napisany przez pawellogrd || Script writed by pawellogrd
// @include        https://www.google.com/accounts/ServiceLogin?service=mail*
// @copyright pawellogrd
// ==/UserScript==
// Configurations:

Uzytkownik="User";	//Nazwa użytkownika || User
Haslo="Password";	//Hasło || Password

document.getElementById('Email').value=Uzytkownik;
document.getElementById('Passwd').value=Haslo;
document.getElementsByTagName('form')[0].submit();