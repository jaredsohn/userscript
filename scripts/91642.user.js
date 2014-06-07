// ==UserScript==
// @name           Battle fix
// @namespace      http://www.erepublik.com/en/referrer/ivicaSR
// @description    Zanimacija
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("/css/cmp/pvp.css", "http://www.t2-studio.com/erep/pvp.css");



var scriptCode = new Array();

scriptCode.push('function displayFighters(type) {'        );
scriptCode.push('	if(battleData[type].length){'        );
scriptCode.push('		var id;'        );
scriptCode.push('		if(type == \'attackers\'){'        );
scriptCode.push('			id = \'right_attackers\';'        );
scriptCode.push('		}else{'        );
scriptCode.push('			id = \'left_attackers\';'        );
scriptCode.push('		}'        );
scriptCode.push('		var current = battleData[type].pop();'        );
scriptCode.push('		$j(\'<li style="width:0" title="\' + current.name + \'"><img alt="" width="25" height="25" src="\' + current.avatar + \'"><small>\' + current.name + \'</small><big>\' + current.damage + \'</big></li>\')'        );
scriptCode.push('				.hide().prependTo(\'#\'+id).gx({\'width\':\'50px\'},200, \'Sine\').fadeIn(\'slow\');'        );
scriptCode.push('		//$j(\'#\'+id+" li").eq(1).fadeTo("slow", 0.66);'        );
scriptCode.push('		//$j(\'#\'+id+" li").eq(2).fadeTo("slow", 0.33);'        );
//scriptCode.push('		$j(\'#\'+id+" li").eq(1).gx({\'opacity\':0.66},200, \'Sine\');'        );
//scriptCode.push('		$j(\'#\'+id+" li").eq(2).gx({\'opacity\':0.33},200, \'Sine\');'        );
//scriptCode.push('		$j("#"+id+" li:last").tipsy("hide");'        );
//scriptCode.push('		$j("#"+id+" li:last").remove();'        );
scriptCode.push('		already_queued.push(current.id);'        );
scriptCode.push('	}'        );
scriptCode.push('}'        );



var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;
document.getElementsByTagName('head')[0].appendChild(script);




