// ==UserScript==
// @name           modcp_mod
// @namespace      http://nh2003.knightonlineworld.pl/test.js
// @description    Zmienia oryginalny panel moderatora na linki tekstowe.
// @include        http://board.ogame.onet.pl/thread.php*
// ==/UserScript==
test = document.getElementsByName('jumpform');
test[0].innerHTML += '<a style="font-family: tahoma; font-size: 11px;
color: orange;"
href="http://nh2003.knightonlineworld.pl/sighunter/index.php?topic='+document.location+'"
target="_blank">Sprawdz sygny!</a>';

komorki=document.getElementsByName('threadid');
threadid=komorki[1].value;

komorki=document.getElementsByName('page');
page=komorki[0].value;

komorki = document.getElementsByName('modoption');
komorki[0].innerHTML = '<span style="font-family: tahoma; font-size:
11px;"><a href="modcp.php?action=thread_close&threadid='+threadid+'"
style="color: limegreen;">[zamknij/otworz]</a> <a
href="modcp.php?action=thread_move&threadid='+threadid+'">[przenies]</a> <a
href="modcp.php?action=thread_edit&threadid='+threadid+'">[edytuj]</a> <a
href="modcp.php?action=thread_merge&threadid='+threadid+'">[polacz]</a> <a
href="modcp.php?action=thread_cut&threadid='+threadid+'&page='+page+'"
style="color: limegreen;">[podziel]</a> <a
href="modcp.php?action=thread_top&threadid='+threadid+'">[przyklej/odklej]</a>
<a
href="modcp.php?action=polladd&threadid='+threadid+'">[ankieta]</a></span>'; 