// (C) 2008 by SVZ-Scripter.de
// Bei Fragen: mario@svz-scripter.de
// Changelog:
// 05.02.09. - Nach den Änderungen ist das Script wieder am laufen
// Author: Mario
// ==UserScript==
// @name            Invite-Box ausblenden
// @description     Blendet die nevige alte Einladebox aus
// @include         http://*schuelervz.net/*
// @include          http://*studivz.net/*
// @include          http://*meinvz.net/*
// ==/UserScript==
{
document.getElementById("mod-invitation-invitationbox").style.visibility="hidden";
}