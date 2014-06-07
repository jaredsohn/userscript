// ==UserScript==
// @name           JvAvertirModerateur
// @namespace       
// @description    Ajoute la fonction avertir le modérateur pour jv.com
// @include        http://www.jeuxvideo.com/forums/1-1000020-*
// @include        http://www.jeuxvideo.com/forums/3-1000020-*
// @include        http://www.jeuxvideo.com/forums/1-18149-*
// @include        http://www.jeuxvideo.com/forums/3-18149-*
// @include        http://www.jeuxvideo.com/forums/1-19580-*
// @include        http://www.jeuxvideo.com/forums/3-19580-*
// @include        http://www.jeuxvideo.com/forums/1-61-*
// @include        http://www.jeuxvideo.com/forums/3-61-*
// ==/UserScript==


function add_things() {
	if (document.getElementById('col1')) {

		var lis = document.getElementById('col1').getElementsByTagName("li");
		var compte = document.getElementById('compte').getElementsByTagName("a");
		var j=0;
		var nomCompte = '';
		while (j<compte.length) {
			var infoCompte = compte[j].getElementsByTagName('strong')[0].innerHTML;
			nomCompte += infoCompte;
			j++;
		}

		var c = lis.length;
		for (var user = 0; user < c; user++) {
			if (lis[user]) {
				if (lis[user].className == 'date') {
					var elem = lis[user].getElementsByTagName("a");
					var i=0;
					var ref = '';
					while (i<elem.length) {
						var infosUrl = elem[i].href.split("?")[1];
						ref += infosUrl;
						i++;
					}
					var urlSignaler = "http://silvermo.free.fr/communaute/signaler.php?"+ref+"&rapporteur="+nomCompte; 
					lis[user].innerHTML += '&nbsp;<a class="lien_copy" href="#" onclick="window.open(\''+urlSignaler+'\',\'Avertissement\',\'toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,menuBar=no,width=520,height=300\');return(false)">';
					tagA = lis[user].getElementsByTagName("a");
					var d = tagA.length;
					for (var v = 0; v < d; v++) {
						if (tagA[v].className == 'lien_copy') tagA[v].innerHTML = '<img src="http://www2.noelshack.com/uploads/modo067671.png">';
					}
				}
			}
		}

	}
}

add_things(); 
