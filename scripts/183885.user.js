// ==UserScript==
// @name           Moving Helper
// @namespace      Moving Helper
// @description    Help eRepublik caculate influence (wall height) in battlefield
// @autor          Botherlong
// @match  	       http://www.erepublik.com/*/main/change-location
// @include  	       http://www.erepublik.com/*/main/change-location
// @match  	       http://www.erepublik.com/*/military/battlefield/*
// @include  	   http://www.erepublik.com/*/military/battlefield/*
// @version        0.0.4
// @date	       2012-10-09
// ==/UserScript==



var MovingHelperInsert = function($, window, undefined) {
	if (document.location.toString().indexOf('/change-residence')!=-1) {
		$('#country_list').change(function(){
			jQuery.getJSON('http://www.erepublik.com/region-list-current-owner/' + $(this).val(), function(data) {
				$('#region_list').one('click',function(){
					$('option:gt(0)',this).each(function(){
						$(this).text('['+data.regions[$(this).index()-1].distance+'] '+$(this).text());
					});
				});
			});
		}); 
	} else if (document.location.toString().indexOf('/battlefield/')!=-1 && $('*').is('#region_list')) { 
		if($('#country_list option').size() == 1) {
			var content = $('#content').html().split('regionsInvolved')[1].split('</script>')[0];
			for(var i=0; i<$('#region_list option').size()-1; i++) {
				$('#region_list option:gt(0)').eq(i).text('['+content.split('distance":')[i+1].split(',"travelCost"')[0]+'] '+$('#region_list option:gt(0)').eq(i).text());
			}
		}else {
			$('#country_list').change(function(){
				var content = $('#content').html().split('regionsInvolved')[1].split('</script>')[0];
				var start_val = 0;
				$('#region_list').one('click',function(){
					if($('#region_list option').eq(1).val() != content.split('":{"id"')[0].split(':{"')[1])
						content = content.split('}},"')[1];
					for(var i=0; i<$('#region_list option').size()-1; i++) {
						$('#region_list option:gt(0)').eq(i).text('['+content.split('distance":')[i+1].split(',"travelCost"')[0]+'] '+$('#region_list option:gt(0)').eq(i).text());
					}
				}); 
			});
		}
	}
};

// Script Insert
var script = document.createElement('script');
script.textContent = '(' + MovingHelperInsert + ')(jQuery, window);';
document.body.appendChild(script);