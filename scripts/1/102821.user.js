// ==UserScript==
// @name           strony poza setkę
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/konto_przyjaciel_fake_wszystkie.php*
// @version        2.0.1
// ==/UserScript==


var $ = unsafeWindow.$;

if(document.location.href.indexOf("?page=") != -1){
	var page = parseInt(document.location.href.split("=")[1]);
	if(page >= 100){
		$("div.pages a").not("[accesskey]").hide();
		$("div.pages").find("a:last").attr("href", "konto_przyjaciel_fake_wszystkie.php?page="+(page+1));
		$("div.pages").find("a:first").attr("href", "konto_przyjaciel_fake_wszystkie.php?page="+(page-1));
		$("div.pages").find("span").html(page);

		var next100 = document.createElement("a");
		next100.href = "konto_przyjaciel_fake_wszystkie.php?page="+(page+100);
		next100.innerHTML = "Następne 100";
		$("div.pages").append(next100);
	}
}

$("div.pages").each(function(e){
		var last = document.createElement("a"); 
		last.innerHTML = "Ostania";
		last.style.cursor = "pointer";
		last.className = "last_page";
		last.href = "javascript:void(0)";
		$(last).click(function(e){					
			last.style.cursor = "default";
			var n = findLast(1, 1000);
			last.style.cursor = "pointer";
			e.target.href = "konto_przyjaciel_fake_wszystkie.php?page="+n;
			e.target.innerHTML = n;
			e.preventDefault();
			$(e.target).unbind("click");
		});
		this.appendChild(last);
	}
);

function findLast(start, end){
	while(end-start > 1){	
		console.log("sprawdzanie " + start + " - " + end);
		
		$("a.last_page").html("Wyszukiwanie ("+start+"-"+end+")");
		
		var mid = Math.ceil((start+end)/2);
				
		if(exists(mid)){
			start = mid;
		}else{			
			end = mid;
		}
	}
	return end-1;
}

function exists(page){
	return $.ajax({url: "konto_przyjaciel_fake_wszystkie.php?page="+page, async: false}).responseText.indexOf('<div class="pages">') != -1;
}
