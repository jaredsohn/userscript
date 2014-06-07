// ==UserScript==
// @name        Sadistic.pl Piwny filtr
// @grant GM_getValue 
// @grant GM_setValue 
// @description  Wyświetla tematy na głównej które osiągnęły jakąś tam granicę ustaloną przez użyszkodnika. Ustawienia filtra widoczne po zalogowaniu w rozwinięciu profil.
// @include     http://www.sadistic.pl/
// @include     http://www.sadistic.pl/portal/*
// @include     http://www.sadistic.pl/humor_hard*
// @include		http://www.sadistic.pl/poczekalnia*
// @require        http://code.jquery.com/jquery-latest.min.js
// @version     1.1
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);


var beers = 0;
var active = true;
var obj = null;

var sort_active = false;
var sort_type = 1;

function readValues(){
	
	if(GM_getValue("beers")!= null){
		beers = GM_getValue("beers");
		
	}else{
		beers = 40;
		GM_setValue("beers", beers);
		
		alert("ustawione domyslnie na: "+beers+" piw.");
	}
	
	if(GM_getValue("active")!= null){
		active = GM_getValue("active");
	}else{
		GM_setValue("active", true);
	}
	
	
	
	if(GM_getValue("sort_active")!= null){
		sort_active = GM_getValue("sort_active");
	}else{
		GM_setValue("sort_active", false);
	}
	
	if(GM_getValue("sort_type")!= null){
		sort_type = GM_getValue("sort_type");
	}else{
		GM_setValue("sort_type", -1);
	}

	obj = $(".header_beers");
}
function hideCrap(){
	
	obj = $(".header_beers");
	
	
	$(obj).each(function(){
	
	if(parseInt($(this).html()) < parseInt(beers)){
		
		
		$(this).parent().parent().hide();
	}
	});
	
}
function sortNShit(type){
	
	obj = $(".header_beers").parent().parent();

// sort based on timestamp attribute
	obj.sort(function (a, b) {

    // convert to integers from strings
    	a = parseInt($(a).find('.header_beers').html(), 10);
    	b = parseInt($(b).find('.header_beers').html(), 10);

    // compare
		    if(a > b) {
		        return 1;
		    } else if(a < b) {
		        return -1;
		    } else {
		        return 0;
		    }
		    
		
	});	
	if(type == -1){
		var temp = new Array();
		for(var i = 0; i < obj.size(); i++){
			temp[obj.size() - 1 - i] = obj.eq(i);
		}
		obj = temp;
	}
	$(".portal").append(obj);
}
function showCrap(){
	
	obj = $(".header_beers");
	
	$(obj).each(function(){
	
	if(parseInt($(this).html()) < parseInt(beers)){
		
		
		$(this).parent().parent().show();
	}
	});
}

readValues();



var blurfocus = "onblur=\"if (this.value == '') {this.value = '"+beers+"';}\" onfocus=\"if (this.value == '"+beers+"') {this.value = '';}\"";


$("a:contains('Profil')").next('ul').append('<li style="background-color: rgb(13,13,13);">'+
												'<p style="color: white; background-color: rgb(13,13,13); margin:0; padding:5px; display: inline-block;">ilość piw: </p>'+
												'<input class="inp" type="text" value="'+beers+'" '+blurfocus+' style="width:40px; background-color: rgb(0,0,0); text-align:center; display:inline-block;"></input>'+
												'<button class="butt" style="width: 30px; background-color: black; color:white;" >OK</button>'+
												'<input type="checkbox" class="checkbox01" '+(active == true ? "checked=\"checked\"" : "")+'></input>'+
											'</li>'+
											'<li style="background-color: rgb(13,13,13);">'+
												'<button class="sortuj" style="width: 147px; background-color: black; color:white;" >Sortuj '+(sort_type == -1 ? "rosnąco" : "malejąco")+'</button>'+
												'<input type="checkbox" class="checkbox02" '+(sort_active == true ? "checked=\"checked\"" : "")+'></input>'+
											'</li>'
											);


if(active) hideCrap();
if(sort_active) sortNShit(sort_type);


$('.sortuj').click(function(){
	
	if(sort_type == 1){
		sort_type = -1;
		GM_setValue("sort_type", -1); 
	}else{
		sort_type = 1;
		GM_setValue("sort_type", 1);
	}
	sortNShit(sort_type);
	$('.sortuj').html('Sortuj '+(sort_type == -1 ? "rosnąco" : "malejąco"));
	
});
$(".butt").click(function(){
	var val = $('.inp').val();
	GM_setValue("beers", parseInt(val));
	beers = val;
	if(!active) $('.checkbox01').click();
	hideCrap();
});

$('.checkbox01').click(function(){
	if(active){ 
		active = false;
		GM_setValue("active", false); 
		
		showCrap();
		
	}else{ 
		active = true;
		GM_setValue("active", true); 
		hideCrap();
	}
});
$('.checkbox02').click(function(){
	if(sort_active){ 
		sort_active = false;
		GM_setValue("sort_active", false); 
		
	}else{ 
		sort_active = true;
		GM_setValue("sort_active", true); 
		sortNShit(sort_type);
	}
})





