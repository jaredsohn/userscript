// ==UserScript==
// @name           GLB Natural Attributes
// @namespace      GLB
// @description    Shows the physical attributes of players without equipment
// @include       http://goallineblitz.com/game/player.pl?player_id=*
// @require        http://userscripts.org/scripts/source/74204.user.js
// @version		1.01
// ==/UserScript==

function NaturalAtts(){
	this.normalStats = {};
	this.createBtn();
};
NaturalAtts.prototype = {};

NaturalAtts.prototype.createBtn = function(){
	var that = this;
	this.shown = 'normal';
	this.btn = document.createElement('INPUT');
	this.btn.setAttribute('type','button');
	this.btn.value = 'Show Natural Attributes';
	$('TABLE.player_stats_table').after(this.btn);
	this.btn.addEventListener('click',function() { that.figureProcess.apply(that); },false);
};

NaturalAtts.prototype.displayNormalAtts = function(){
	var that = this;
	$('DIV.stat_container').each(function(){
		var skill = $('DIV.stat_head_tall',this).text().replace(/:/,'');
		if(that.normalStats[skill]){
			var myDiv = $('DIV.stat_value_tall',this);
			myDiv.text(that.normalStats[skill]);
			myDiv.removeClass('stat_value_tall');
			myDiv.addClass('stat_value_tall_boosted');
		}
	});
};

NaturalAtts.prototype.displayNaturalAtts = function(){
	var that = this;
	$('DIV.stat_container').each(function(){
		var skill = $('DIV.stat_head_tall',this).text().replace(/:/,'');
		if($('DIV.stat_value_tall_boosted',this).length > 0){
			var myDiv = $('DIV.stat_value_tall_boosted',this);
			that.normalStats[skill] = myDiv.text();
			var fullNum = Number(that.normalStats[skill].split('(')[0]);
			var equipNum = parseInt(that.normalStats[skill].split('+')[1].replace(/\)/,''));
			var result = (fullNum - equipNum).toFixed(2);
			if(result.toString().split('.')[1] == '00'){
				myDiv.text(parseInt(result));
			}else{
				myDiv.text(result);
			}
			myDiv.removeClass('stat_value_tall_boosted');
			myDiv.addClass('stat_value_tall');
		}
	});
};

NaturalAtts.prototype.figureProcess = function(){
	if(this.shown == 'normal'){
		// we need to show natural atts
		this.btn.value = 'Show Normal Attributes';
		this.shown = 'natural';
		this.displayNaturalAtts();
	}else{
		// we need to show normal atts
		this.btn.value = 'Show Natural Attributes';
		this.shown = 'normal';
		this.displayNormalAtts();
	}
};

window.setTimeout(function(){
	new NaturalAtts();
});	