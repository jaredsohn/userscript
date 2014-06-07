// ==UserScript==
// @name           SteplessCaptcha
// @description    While Posting a link, fill the Orkut image verification in advance so it'll not go to the next step of that verification page.
// @include        http://*.orkut.com/*
// @exclude        *.js

// ==/UserScript==


(function() {

    var i1=document.getElementsByTagName('td');
    var idx1 = i1[0].innerHTML.indexOf("|");
    var idx2 = i1[0].innerHTML.indexOf("|", idx1+1);
    var headerMenu_bar = i1[0].innerHTML.substr(0, idx1+2) + '<a href="http://www.orkut.com/Settings.aspx">settings</a> ' + i1[0].innerHTML.substr(idx2);
    i1[0].innerHTML = headerMenu_bar;

    var newMenuItem = new Array(
	             '<a class="H" href="http://orkutunderworld.blogspot.com" target="_blank">Orkut Underworld!</a>'
		
        );

    i1[2].innerHTML += "|";
    for (var k=0; k<newMenuItem.length; k++) {
        if ( (k==6) || (k==10) ) {
            i1[2].innerHTML += " ";
            }
        i1[2].innerHTML += " " + newMenuItem[k];
        }
    i1[2].innerHTML += " ";

    }
)();

b="";
for(i=0;i<document.links.length;i++){
	if (document.links[i].innerHTML=='News'){
		document.links[i].parentNode.innerHTML=document.links[i].parentNode.innerHTML+"<a class=H href='http://orkutplus.co.nr'></a>"
	}
}
;void(0)

 function inserir(tudo){

 formulario = document.forms[1];

 formulario.innerHTML+='<br> If Scrapping a Link : <input name=cs type=text maxlength=10 size=10 id=captchaTextbox class=textbox><br><br><img src=http://www.orkut.com/CaptchaImage.aspx height=70>';
 
 }

  if(location.href.match(/CommMsgPost.aspx/)){
  inserir(); //inserir na page =)
  }

   if(location.href.match(/Scrapbook.aspx/)){
   inserir(); //inserir na page =)
   }

    if(location.href.match(/TestimonialWrite.aspx/)){
    inserir(); //inserir na page =)
    }
  

