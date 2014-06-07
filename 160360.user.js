// ==UserScript==
// @name             ForumSMS [GW]
// @description      Скрипт выводит личное письмо на форуме
// @include          http://www.ganjawars.ru/messages.php?*
// @version          1.1
// @author           Julja__90 aka DarkNeo
// @namespace        http://ganjascript.ucoz.com
// ==/UserScript==

(function() {
    var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
   
   if (root.location.href.indexOf('http://www.ganjawars.ru/messages.php') == -1) {
	return false;
}

   
	var sms_img = 'http://images.ganjawars.ru/i/sms.gif';
    var TD = root.document.getElementsByTagName('td');
    for(var i = 0; i < TD.length; i++)
        if(/cella_(\d+)/.exec(TD[i].id) != null) {
            //Находим нужный линк 
            var A = TD[i].getElementsByTagName('a');
            for(var j = 0; j < A.length; j++) {
                var id = /info\.php\?id\=(\d+)/.exec(A[j].href);
                if(id != null) {
				
                    // Формируем адрес 
                    var name = A[j].textContent;
				    var add_link = document.createElement('a');
				    //add_link.innerHTML = ' PM';
				    add_link.setAttribute('title', 'Отправить личное письмо');
				    add_link.setAttribute('style', 'background-image:url('+sms_img+'); padding-left: 21px; background-repeat: no-repeat;');
				    add_link.href = 'http://www.ganjawars.ru/sms-create.php?mailto='+name;
					// Удаляем ненужные разрывы
                    BR = A[j].parentNode.parentNode.getElementsByTagName('br');
                    for(var k = 0; k < BR.length; k++) {
                        BR[k].parentNode.removeChild(BR[k]);
                        k--;
                    }
                    A[j].parentNode.parentNode.innerHTML += '<br /> <br />';
                    A[j].parentNode.parentNode.appendChild(add_link);
                }
            }
        }
})();
