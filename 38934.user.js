// ==UserScript== 

// @name			OGame Galaxy Return x.y.z

// @author			unkown

// @description			read in galaxy for new ogame

// @include			http://*.ogame.*/game/index.php*page=galaxy*

// ==/UserScript==



function $$(expr,node){



var result = document.evaluate(expr,node,null,0,null);





var found = [];





    var res;



    while (res = result.iterateNext())



        found.push(res);



    return found;


}




function $(expr){

return $$(expr,document);

}




var Time = 3000;



		function Galaxy() 

{

	

var galaxie= $("id('galaxyscroll')/div/input")[0];

var system = $("id('solarscroll')/div/input")[0];

if(galaxie.value==9 && system.value==499)

{

	alert('Universum eingelesen');

	clearInterval(id);

	return;

}

else if(system.value<499)

{
system.value = parseInt(system.value) + 1}

else

{

	//	alert('Galaxia '+galaxia.value+' procesada. Continuando con la siguiente.');

system.value=1;

galaxie.value =  parseInt(galaxie.value) + 1}



$("//form[@name='galaform']")[0].submit();



	setTimeout(Galaxy,Time);

}



	var id = setInterval(Galaxy,Time);