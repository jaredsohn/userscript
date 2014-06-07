// ==UserScript==
// @name		Amazon Warning
// @namespace	Amazon
// @description	Useless script for Amazon.
// @include		http://*.amazon.*/
// @author		ror
// @version		0.1.1
// @copyright	2010+, Daniele Mancino (http://damagedgoods.it)
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html)

// ==/UserScript==

// History:
// v0.1.1 : 2010.03.18 : Small change
// v0.1 : 2010.03.16 : First release

if (!confirm('ATTENZIONE!\nProseguendo su questo sito ti fotterai anche questo mese lo stipendio.\nSei sicuro di volere continuare?')) { window.location.href = 'http://www.emule-project.net/'; }