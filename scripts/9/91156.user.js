// ==UserScript==
// @name           free-lance.ru project ajax
// @author         LLIypLLIuk
// @description    Load free-lance's project content and if in you do not have pro akkaunt, then script hidden project's pro
// @include        *.free-lance.ru/
// @include        *.free-lance.ru/?kind=1*
// @include        *.free-lance.ru/?kind=2*
// @include        *.free-lance.ru/?kind=3*
// @include        *.free-lance.ru/?kind=4*
// @include        *.free-lance.ru/?kind=5*
// ==/UserScript==


function weblancerClick() {
  var postn = this.href.replace(/.+?\//g, '').replace(/\.html.+?$/, '');
	lnk=this;
  this.innerHTML = '<br/><img src="data:image/gif;base64,R0lGODlhEAAQAPQAAP%2F%2F%2FwAAAPj4%2BDg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla%2BKIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK%2Bo2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC%2B0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU%2FNXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK%2BkCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm%2F4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg%2BboUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC%2BRAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA%3D%3D">подгрузка содержимого...';

  try {
    var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open('GET', this.href, true);
    xmlhttp.link = this;
    xmlhttp.onreadystatechange = function() {
        if(this.readyState != 4) return;
		lnk.innerHTML="";
		var to = this.link; 
		to = to.parentNode;
		if(this.responseText.lastIndexOf('<div class="contest-body">')>0){
			to.getElementsByTagName('div')[0].innerHTML = '<p><div class="contest-body">'+this.responseText.match(/<div class="contest-body">([\s\S]*?)<div style="width: 100%;\s/m)[1]+'</p>';
		} else{
			to.getElementsByTagName('div')[0].innerHTML = '<p'+this.responseText.match(/<div class="prj_text"([\s\S]*?)<\/div>\s/m)[1]+'</p>';
		}
		if(this.responseText.lastIndexOf('<td style="font-size:11px;padding-top:8px;vertical-align:middle;">')>0){
			to.getElementsByTagName('div')[0].innerHTML = to.getElementsByTagName('div')[0].innerHTML+'<p><br /><br />'+this.responseText.match(/<td style="font-size:11px;padding-top:8px;vertical-align:middle;">([\s\S]*?)<\/div>\s/m)[1]+'</p>';
		}
	};
    xmlhttp.send(null);
  } catch(e) {
    return true;
  }

  return false;
}

window.addEventListener("load", function() {
    var links = document.querySelectorAll('a');
    for(var i = 0; i < links.length; i++) {
		to = links[i].parentNode;
		to = to.parentNode;
		if((links[i].href.lastIndexOf('/projects')>0)&&(to.className==="project-full-in")){
			var add = document.createElement('a');
			add.innerHTML = '<br />Подробнее';
			add.href=links[i].href;
			add.onclick = weblancerClick;
			to.appendChild(add);
		}else{
			if((links[i].href.lastIndexOf('/proonly')>0)&&(to.className!="project-full-in")){
				to.innerHTML="<a href='"+links[i].href+"'><img src='http://www.free-lance.ru/images/ico_pro_small.gif' border='0' alt='Только ПРО' title='Только ПРО' /></a>";
			}
		}
	}
}, false);