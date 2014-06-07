// ==UserScript==
// @name           Travian New attack builder
// @namespace      new_travian_attack_builder
// @version        1.5
// @author         FDisk
// @description    Build attacks in same seccond.
// @include        http://*.travian.*/a2b.php
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://usocheckup.redirectme.net/98664.js
// ==/UserScript==

var what = $('.troop_details .units tr:eq(1)');	//Get troops table

//Replace table content with inputs
$(what).addClass('attack');
$('td',what).each(function(index){
	$(this).html('<input type="text" maxlength="6" value="'+$(this).text()+'" class="text temp">');
});

//Add controll buttons
$('#btn_ok').remove();	//Remove old button
$('form').submit(function(){return false;}).append('<p class="btn"><input type="button" alt="less" id="btn_back1" value="<<< Less" /> <input type="button" alt="More" id="btn_forward1" value="More >>" /></p><p class="btn"><input type="button" alt="OK" id="btn_ok1" value="Send" /></p>');

//Add wave
$('#btn_forward1').click(function(){
	$this = $('.troop_details .units tr:last');
	$this.clone().insertAfter($this)/*.addClass('attack_'+i)*/;
});
//Remove wave
$('#btn_back1').click(function(){
	if ($('.attack').length > 1)
		$('.attack').last().remove();
});
$('#btn_ok1').click(function(){
	_new_attack();
})


/**
 * ATTACK!!!
 */
//Create fake form and submit them (anti multihunter)
function _new_attack() {
	$('.attack').each(function(index){
		inputs = $('input',$(this));
		$.ajax({
			type: 'GET',
			url: 'a2b.php',
			data: 'z='+$('input:hidden[name="kid"]').val(),
			async: false,
			success: function(msg) {
				//Fill form
				var forma = $('form',msg);
				$(inputs).each(function(index){
					$('input[name="t'+(index+1)+'"]',forma).val($(this).val());
				});

				//Atack type:2- deffend, 3- atack, 4 - raid
				$('input:radio[name="c"]', forma).eq($('input:hidden[name="c"]').val()-2).attr("checked", "checked");
				var url = $(forma).serialize()+'&s1=ok&s1.x='+(Math.floor(Math.random()*47)+1)+'&s1.y='+(Math.floor(Math.random()*19)+1);

				$.ajax({
					type: 'POST',
					url: $(forma).attr('action'),
					data: url,
					async: false,
					success: function(msg){
						$.ajax({
							type: $('form',msg).attr('method'),
							url: $('form',msg).attr('action'),
							data: $('form',msg).serialize(),
							async: false,
							success: function(msg){
							}
						});
					}
				});
			}
		});
		$(this).remove();
	});
	window.location = "/build.php?gid=16";
}
