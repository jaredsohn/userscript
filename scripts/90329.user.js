// ==UserScript==
// @name			ManganTroos
// @namespace		are.erepublik
// @description		Buat Makan Sampe Health 100
// @version			0.0.1a
// @include			http://*.erepublik.com/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require			http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==

var $j = jQuery.noConflict();

$j(document).ready(function(){
  var sisaSehat = parseFloat($j('#wellnessBar > span ').html());
  console.log(sisaSehat	);
  if (sisaSehat < 100)
  {
	eatTillDrop();
  }
});

function eatTillDrop()
{
	var url = "/eat?format=json&_token="+$j('#a69925ed4a6ac8d4b191ead1ab58e853').val()+"&jsoncallback=?";
	$j.post(url, {},  function (data){
			processResponse(data);
		}, 'json');

}

function processResponse(data){
	$j('#wellnessBar > span').html(data.health);
	
	$j('#eatFoodTooltip > p > big ').html(data.food_remaining);
	
	healthValue = parseFloat($j('#wellnessBar span').html());
	food_remaining = parseFloat(data.food_remaining);
	
	if (data.has_food_in_inventory > 0 && healthValue<=100 && food_remaining>0) eatTillDrop();
	
}
