// ==UserScript==
// @name        MikroPager
// @namespace   http://www.wykop.pl/ludzie/Deykun
// @description Pozwala przechodzić do wpisu dodanego przed i po aktualnie przeglądanym.
// @author      Deykun (specjalne podziękowania dla Marmite za pomoc)
// @icon	http://i.imgur.com/gtY5D9i.png 
// @include	https://*.wykop.pl/wpis/*
// @include     http*wykop.pl/wpis/*
// @exclude     http*wykop.pl/wpis/edytuj-komentarz/*
// @version     1.01
// ==/UserScript==


if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}

function main(){
	//Ustalenie ID wpisu i ustalenia id wpisów obok
	var id=$(".favorite").eq(0).attr("data-id");
	var bid=parseInt(id,10)-2;
	var aid=parseInt(id,10)+2;
	
    	//Bóg jeden wie dlaczego w tym właśnie miejscu id zmieniają się z nieparzystych na parzyste
    	if (id==4999275)
        	{
        	var aid=parseInt(id,10)+3;
        	}
    	if (id==4999278)
        	{
        	var bid=parseInt(id,10)-3;
        	}
    	
    //Treść menu koło wpis - spokojnie możesz dodać własne linki, bo nie zajmują one miejsca i niczego nie spychają
	  
	 var wpis='<class style="float:right; margin-top:-17px; margin-right:5px; padding-bottom:0px; font-size:x-small;" ><a class="small cac" href="http://www.wykop.pl/wpis/' + bid +'">wcześniejszy</a> | <a class="small cac" href="http://www.wykop.pl/wpis/' + aid +'">późniejszy</a></class>';

	//Dodanie menu do okna wpisu
	$('div.clr.brbottbd.pding5_0.headline').append(wpis);
	

}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}