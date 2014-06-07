// ==UserScript==
// @name           gw2legendary filter
// @namespace      gw2legendary.com
// @description    Allow you to display one legendary weapon at a time
// @include        http*://gw2legendary.com/
// ==/UserScript==

var main = function(){
	$('#header').append('<div style="position:absolute;top:58px;left:7px"><span>Filter : </span><select id="filter" style="font-size:11px;font-family:\'Segoe UI\',Tahoma,Verdana;background-color:#333;color:white;border:none;"><option selected value="all">All weapons</option> <option value="56219">Bifrost</option> <option value="56220">Bolt</option> <option value="56210">Eternity</option> <option value="56217">Flame Seeker Prophices</option> <option value="56212">Frenzy</option> <option value="56205">Frostfang</option> <option value="56223">Howler</option> <option value="56208">Incinerator</option> <option value="56211">Juggernaught</option> <option value="56218">Kamohoali</option> <option value="56222">Kraitkin</option> <option value="56206">Kudzu</option> <option value="56216">Meteorlogicus</option> <option value="56213">Moot</option> <option value="56214">Quip</option> <option value="56221">Rodgort</option> <option value="63468">Sunrise</option> <option value="56207">The Dreamer</option> <option value="56209">The Minstrel</option> <option value="56215">The Predator</option> <option value="63469">Twilight</option></select></div>');
	
	$('#filter').change(function(){
		$('.mainwrapper>.mainitem').css('display','none');
		$('.mainwrapper>.sub').css('display','none');
		
		if($(this).val() == "all"){
			$('.mainwrapper>.mainitem').css('display','block');
		}
		else{
			$('#mainitem0-0-'+$(this).val()).css('display','block');
		}
	});
};

// Inject main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '('+main.toString()+')();';
document.body.appendChild(script);