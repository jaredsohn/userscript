// ==UserScript==
// @name           planetrenders_download
// @namespace      http://userscripts.org/users/76357
// @description    Descargar renders de planetrenders.net sin estar registrado.
// @include        http://*.planetrenders.net/renders/displayimage.php?*
// @include        http://planetrenders.net/renders/displayimage.php?*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
 $('td a img').each(function(i){
  if(this.src.indexOf('normal_') != -1) {
   var e_img = this.src;
   e_img = e_img.replace('normal_','');
   $(this).parent().attr('href','#');
   $(this).parent().removeAttr('onclick');
   $(this).parent().parent().append('<img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%85IDAT%18%19%05%C1%CB%8BUu%1C%00%F0%CF%EF%DCs_%E3%D8%0C%F8%AA%26%23%85%0A%17%22%0Ee%AF%5DmZ%08%B9ie%8B%C0%1E%B8%14%C2%5D%BB%96%1A%FD%05EnB%A26%B5J0%09%A2%A4%B26Q%92Le%C9%8C3%E9%3C.s%E7%9Es%CF%F9%7D%FB%7C%D2%C7_%DC%B8%98s%3A%3D%AE%F3%A0j%00%00%10%00%40%B7d%D0%F5%D1%1B%A7%16%CFA%99%23%BDv%F2%85%83%FB%06%83AJ%A9%03%00%00%00%26%99%B6%99%FA%FC%EA%AD%D7q%0E%CAq%95%FB%FD%FE%20%5D%BA%B6n%E2%9EQ%BA%E9%D0%81U%C3%EE%A6%26%B2%FB%5BC%BF%DE%9A3%13G%94%F6x%E7%D5C%DA%9C%12%40Y7%14EG%91%A8%8B%15%87%F6%AE%EA%F7%FE%B6Y%8D4m%A3%EC%F7%1D%3E%F8%90%3F%97v%99%EF%ED%953%00PBFQ%24U%AC%E9u%D7m%ECl%AA%DA%89%BAi4%B1%AD%DF%EF%DB%AE%86%F6%0C%0B!%10%00J%C8(R%12MV%B5S%93%A6%B23%AD%D4%B9%D1f%A4%A9%C8%AD%B2H%22%02%00%94%10A%91%92%81%7DF%DB%CB%A2%D3%B5%FC%DBy%BB%FB%8C%EBF9%DB3%93w%AC%FC7%F2%FE%A7%7F%C8%D1%99%3Bs%E1z%5C%FD%F9%CE3%25DP%14%C9lg%C1%9D%95%BB%E6%06%CBv%C6%13%2F%9Ex%D2%2B%8B%B3%BE%FC%FE_%EF%9E%3E%02%00.%5D%5B%93s%BA%5E%04%22(%8Ad%B6%BB%DF%C3%C3%E3%D6%7FY7%AE%A6%EE%8F%1Ap%E5%C7%BB%00%26%0D%5B%15k%1B%B5%94%B2%12%22%B8y%EF-m%CE%DA%9C%3DQ%ADY%EE%25%9D%60%DAf%17%CF.%CA9%04%3A%C2LIUU%B6%B6keDHxy%F1%1C%80%CE%D1%0D%3F%7CU%98TS%EF%5D%FEK%91h%DA%2C%B7Y%20%22%08f%BAY%99%40%00%80v8%AF%C9%A1j%1B%9D%A2%8B%90%B4RJ%22%87%88%ACi%A6%EA%BAQ%0E%BAiS%9E%CE%1D%3B%F0%2C)%09%10F%E3%9FtS%E9%EC%C9%DD%9A%5C%A3%20%88%94%0D%CA%9E%0B%9F%DCvok%5B%D9%2B%D3%E5%CF%BE%5Ez%AEn%E3h%04%00m%8E%B9%8E%AEl%C7%877%DE%B6w%E6QIam%FC%8F7%9F%FE%40a%60%5C%D5%CA3%A7%8E%9F%07%00%80on~%17%8F%3D%C8%81%D9%91%97%8E%9D0%DF%5B%A0%60c%B2%60%FF%AE%C6L%8F2%25)%22%00%00%C0Sg%AF%7C%FB%F8%23%C3%E7%E7%FB%F3%06%E5%03%9A%3C%95r%96%A2%95%D3%D8%EF%B7%97%ACnM%FD%0F5%92A%FBcV7%DF%00%00%00%00IEND%AEB%60%82" alt="" /> <a href="' + e_img +'">Download</a>');
  }
 });
}