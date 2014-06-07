// ==UserScript==
// @name itu-sis kisayollar
// @description itü sis'in hosgeldiniz sayfasina bir iki kisayol ekler
// @include http://*.sis.itu.edu.tr:8092/pls/pprd/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu*
// ==/UserScript==

document.getElementsByTagName('tr').item(0).getElementsByTagName('td').item(1).innerHTML += '<br><br><a href="/pls/pprd/hwskogrd.P_ViewTermGrde">Dönem Notları</a><br><a href="/pls/pprd/histo.P_HistoDonem">Derslerin Not Dağılımları</a><br><a href="/pls/pprd/nekaldi.P_Mezun">Mezuniyetime Ne Kaldı?</a><br><a href="/pls/pprd/hwskotrn.P_ViewTermTran">Transkript</a><br>';