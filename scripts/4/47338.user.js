// bkz
// 23.04.2009
// Copyleft Onur Ulusu
// görüş ve öneri: onurulusu@gmail.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ChangeLog
// version 1.1
// 1.1    29.04.2009
// yogun istek uzerine(godfather istedi) bakiniz vermek icin text secmeyince uyari // vermiyor artik, bos bakinizi koyuyor direk.
// 1.0    23.04.2009
// dogru calisiyor gibi..
// --------------------------------------------------------------------
// ==UserScript==
// @name           bkz
// @description	   eusozluk'te entry girerken bkz vermeyi modifiye eder. metini secip bkz, gbkz ya da * butonuna tiklamak yeterli.
// @author		   Onur Ulusu
// @version		   1.0
// @include        http://www.eusozluk.com/*
// @include        http://eusozluk.com/*
// ==/UserScript==

function bkzver(a) { 

    var textarea = document.getElementById("aciklama");  
	
    var len = textarea.value.length;  
    var start = textarea.selectionStart;  
    var end = textarea.selectionEnd;  
    var sel = textarea.value.substring(start, end);  
    
    var replace = '(' +a+': '+ sel + ')';  
     
    // replace the text with bkz, gbkz or u..
    textarea.value =  textarea.value.substring(0,start) + replace + textarea.value.substring(end,len);  

}


// override the existing function
function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}


embedFunction(bkzver); 