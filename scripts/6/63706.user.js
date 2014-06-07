// ==UserScript==
// @name           Ikariam Farm List
// @namespace      sycdan
// @description    Lets you create a list of towns you regularly target, making espionage and pillages quicker.  Also shows a summary of your hideouts, including how many spies are at home or on missions.
// @include        http://s*.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @version        0.18
// ==/UserScript==

/*
Possible future features:
-Target sorting
-Check garrison button on pillage view
-Track time since a target went inactive

0.18
-Your own cities are no longer added as targets from combats where you were a defender
-Increased speed of scanning all hideouts and rescanning old targets
-Limited the number of old-target refreshes to 10 per page load and reduced the time between rescans to 3 hours
*/

ScriptUpdater.check(63706,'0.18');

IkaTools.init({
	trackData:{
		resources:false,
		construction:false
	}
});

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');}
String.prototype.ltrim=function(){return this.replace(/^\s+/,'');}
String.prototype.rtrim=function(){return this.replace(/\s+$/,'');}

jQuery.fn.extend({
	outerHtml:function(replacement){
		if(replacement)
		  return this.each(function(){$(this).replaceWith(replacement);});
		var tmp_node=$('<div></div>').append($(this).clone());
		var html=tmp_node.html();
		tmp_node.remove();
		return html;
	}
});

var NEWLINE='\r\n';
var FarmList={
	defaultSafeResources:100,
	resourceNames:['Wood','Wine','Marble','Glass','Sulfur'],
	icons:{
		addTarget:'data:image/gif;base64,R0lGODlhMgAiAPcAAEI2IWJ1AGV9AH9oAHlwAHpgQiuSACyVAC2ZAC6dADChADGlADKoADOsADqqADSwADWzADa3ADe7ADm/ADrCADvGADzKAD3OAD7SAD/VAEmMAEORAEabAEqQAFeFAF+GAFqOAFORAFyXAEilAE62AFC+AF22AGGOAGqPAGyUAG2aAHKQAHqQAH2ZAHOtAELDAEPHAETLAEXOAEvHAEvLAE3PAEXSAEDZAELdAE/VAFHAAFXOAFnBAEPgAETkAEXoAEbsAEfvALA+AL40AL44AIRfAIpaAJZOAJlVAJlXAJpZAJpbAJtdAJxfAIBtAIhuAJxgAJ1iAJ1kAJ5mAJ5oAJ9qAJ9sAJFzAJV9AJlyAKVOAKtGAKxJAKlcALlAALhGALxJALlUAKJzAKF7VqR9V8snAM0lAMopAMssAMwpAM8sAM4vAMQwAM4wAM41AM43AMk/ANMsANAuANknANwgANooANoqAOQWAOIbAOYaAOoQAOsTAPcFAPcGAPEKAPEMAPgGAP8AAOAiAIGOAKaDWfjCgPvGhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAMgAiAAAI/wALkBlIkJDBgwgTKizIsKHDAoUiSjREsaLFixgzapwYEQDEAiBDihxJsqTJkxA9FhI4pqXLlzBjypwpM+XHMUFy6tzJs6fPnz1VqhQIpKjRo0iTKl2aVOjNH1CjSp061YUYF1SzUnW6coyPr2DDig2bI0ygMDvGqhXLtcCYHnDjyp0LtwWcQHjx2sFCt29cp4YE4hhMuLDhGm/y5gmUBxBeQTwMSyYMWOCNy5gzZ6ZRJ9CfLDasBLJyY5AgzyY0q75ceUyG17Bjx3YTqI6O11UCVXktAwzjGbKDZ2hLBoPx48iPswi0p8RxKoGoHI8xJ1CX5NgxtL7Avbv37nECXf/xPiXQFO8qPMP4zr61hffw478nEajPi/hSAkmRH36F/P9tjVHBgAQWWEEKXwSCRxQMMthGIG00yKAcEKZgoIGtUaDhhhxSAEVeIIYoYiBQdNhhaxOkqOKKE6DgRSB0NCGjjGsEssaMNAaiBgosstiaBEAGKSSQIgRyx5BMBMLEkC8+MeSTrUUg5ZRUTnlHICdQuUQgS1A5Ah+BjFDlmK1BYOaZaJ6pRSBooKlEIEqgyUUgRKRpJwStPaDnnnzu6YAegWyxZxKBJLGnE4HwAUKfjD4QYAOQRiqppB+AyUYIDSARCBINcLAFXgRMKiqkHhky1BgMpKrqqqwK4AdeQ6SREUgaQrzKxwCs5qpqawv06uuvwC7QgRAjnuFBsMj22poCzDbr7LPNblBEGYGYYYQG0GbrbIAJdOvtt+CCG8ARAYRrbrilnorAuuy26+678Mb7boAH1Gvvvfjmq++++QZowL8AByzwwAQXPHBbBQCg8MIMN+zwwxA/bNNKKFVsscWmFrDRxhx3jFHEIIcscsQBAQA7',
		addTargetHover:'data:image/gif;base64,R0lGODlhMgAiAPcAAEI2IXpgQqF7VqR9V/8AAPwIAfwIAvwIA/wIBPoQA/sQB/sQCPkYBvoYC/cgCvggC/gkD/YsEPkgEPkgEfgoFfgoFvA8DPA/DPE/D/cwF/cwGPcwGfM8FvM/F/U4GPU4GvQ8GfQ/GvgwG+9ADu9IE+xQE+5QGO1YH/FAE+5XIO9bJvVAIPVAI/VIKfFYLPNfOehgFelgF+hoG+loHuB/FuloIOR/IeV/JOV/J+Z/Kud/LOhwIuh/L+1wNul/Mul/Nep/OOt/O+x/Pu1/QO1/Q/F/T6aDWb7/HL//It2PHNuXHtyfJt6fLtunLNG/IdW/LuKXNdy/R96/UOyHSOiPQu2PUuenWeSvVeG3UeG/WemvZOq/d8vfLM3fMdDPLtTHNdTPPNHXOcnnLs7nPcH/KML/LcT/M8b/Ocf/PtjHQtjPScz3R8n/RMv/Ssz/T87/Vc//WtLnTdnnZtzncd7ndd3ved7vf9f3bdH/YNP/ZtT/bNb/cdn3c9r3edz3fdj/d9n/feHXcuLffN33g9v/gtz/iN7/jvjCgPvGhOPniuDvheLvj+D/k+H/meP/n+X/pOb/qgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAMgAiAAAI/wADDBhI0IjBgwgTKizIsKHDAIciSkREsaLFixgzapwYEQDEACBDihxJsqTJkxA9HhIooKXLlzBjypwpM+VHAZBy6tzJs6fPnz1VqhT4qKjRo0iTKl2aVOhNR1CjSp06dUuRLVSzUnW6UkCjr2DDig276AWBF4nGqhXLNYAARnDjyp0LV0sLAnjxiqhCt29cp4gEGhpMuLBhRSzyTiAwAQHeCoIMSyYMWGChy5gzZ7azgcCCKYOIECBSyAoFz4E0q75cWQCh17Bjx15BQAOd10MIDHntxwUBCXVkCyfUdgCg48iTI79CoMEc5EIICEHeJwOBHsqzA2r9p7v3794/EP+g8j0IgSDfsxBQwAe8+9Z74sufH18OgQN35gMhAIS+BwJY0CdgWwLoYeCBCOohhQoEQPDDgw+GQEAIED4IwoRSJJhga3l06OGHefiQ14gklkiADyCC2BoeLLboIh5RpEBABDzUWGMHBHRg440EcBDFiy+2BseQRBY5pBoEPGCkDgToYOQJBEBh5JStvWHllVhe6QABaWCZAwE5YBmHAQTEkeWZrbmh5ppsrrkDASiwiQMBOLBZAwEmtKmnG6214eefgP65BgMEzPDnDQTc8CcTBBgARqCQtkEgG5RWaqmlX5BJQhhs2ECADWyMIQNeTVxqKqUeITKUAGi06uqrsD6WkQBeJWBAAAYxzFrAErD26mprZwQr7LDEntEFDCaO4EWxzAbbmhnQRivttNGKocQFBFiQBBfUdistgWWEK+645JLrBA1OlKtuuamuSsa78MYr77z01jsvgUjkq+++/Pbr77/9EnjEwAQXbPDBCCd8cFsBAODwwxBHLPHEFE9s00ooZayxxqoGsNHHIIeMUcUkl2xyxQEBADs%3D',
		removeTarget:'data:image/gif;base64,R0lGODlhMgAiAPcAAD50AFUwAEI2IXIXAHQ/AENPAFNEAF1bAF9fAERgAEB6AEd6AE9wAFltAFp2AHVAAHpcAGJrAGZuAH1jAHpgQiuSACyVAC2ZAC6dADefADChADGlADKoADOsAD+tADSwADWzADa3ADe7ADyxAD21ADm/ADrCADvGADzKAD3OAD7SAD/VAESaAEefAFWEAFiOAFOUAFWaAEa1AEG/AEuyAEi9AFKpAFqqAFSyAGeGAG+GAGWXAGGnAGegAEbFAEjJAEjLAEDZAELdAEPgAETkAEXoAEbsAEfvAIIdAIorAIU5AI44AI8/AJM0AKEGAKYPAKUUAKYWAKAYAKAfAKgbALcJALgMALgOAL4LAL4MAK0oALg/AL86AIBKAJlXAIFvAI5oAIlyAKF7VqR9V8YBAMYFAMUIAMsFAMIaANEFANcCANcEANYMANwBAN0CAN4dAN8eAMstAMc5AMc6AM0xANkmAOABAOgEAO0AAOAcAOUYAOsRAOkTAPIAAPUAAPcFAPUHAPELAPEMAPoAAP8AAKaDWfjCgPvGhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAMgAiAAAI/wApjBlIsJDBgwgTKizIsKFDCoYiSjxEsaLFixgzapwYUQBECiBDihxJsqTJkxA9GhIopqXLlzBjypwpM+VHMUdy6tzJs6fPnz1VqhRopKjRo0iTKl2aVOjNIlCjSp1KVWqXNEuqVnW6UgyRr2DDioWwpolYIlQIEfJzti0RrhTEDJlLt65dO4QG4aALJItaQmbsCqbr9JBAIYgTK17cRu0ExD/S/E3zY7HlxIUFBtnMubPnKmq1BKGh5i8WH55Td84sZoXr17BjI1HL5gVetVdi69YNd4yK38CDCzeg1k+fv1OEK1/OOoXz59CjJ/DzN6+S6Cl4zOmBHTprFODDi/8fr4B68Qjja8j5W+fG+PBwxZyYT7++fSl/8biwf4IOIUGE6BHgDPydwJoJCCaooIJWVOfAgibs8J8NhMgAByFhQGgCayV06OGHHXpwRnWEAABiCXmQqBYfJ5bAmggwxiijCCy48dcgahUwowg6EPIGCYSIwAUhYOwoAmshJKnkkg3g8VcUd6gVwJJJjrAHIXEQsgUhf8RAZZKsgSDmmGMiYN4gSYDAhloDkDlmDoH89ccXbo7J2gd45onnAzjm9QCeaKjlhJ56tuAFIF7AQKie8XXg6KMdENCnHwc8yoRaZECq6aacenTIUGJwIOqoHJRGCB4MkCqBWniQ6uqrsLJ/tsGstG4ABSFtLFDrBhn0ueuvwNbKmgbEFmvsscQ+QUgZyDbrrAbxYSDttNRWa+212FrrKagXdOvtt+CGK+644cZnwbnopqvuuuy2u258FcQr77z01mvvvfXCRYEA/Pbr778AByxwwDathNLBCCP8KQUbNezwwxgNLPHEFA8cEAA7',
		removeTargetHover:'data:image/gif;base64,R0lGODlhMgAiAPcAAEI2IX1DFnpgQoYiCpcjEaYJAr4LBbQYBLcfBrMfDbgfCrsfEq8+E7cmErc7I7Q+JoZTKINtJo14OKteGaxeG7FHIbNSM7lnPaF7VqR9V8cOB8cOCMgCAMsJAcsKBcIRBsIRCNUGA9AIA9kEANoEAtoFA94DAN4CAcowGdkmC+ECAe0AAOwGAuESBeEQCPIAAPYAAPYCAPoAAP8AAPsLA/wIAvoQBPsQBvkYCPkaCfcmDvYoDvggDfcoEPYwFcZeGe9QHO1YHfFAFfNAG/JIH/NIIeV/JMNzQJqbOq2IJK+IKrSIPLSZM7ecPrOrKbW9Kp2bRKaDWburSL7/HL//It+fMcmoKNi/O+OPMuSXPMCrV9y3QNPXPsH/KML/Lcf3N8T/M8b/Ocf/PsHSStzHT9XXR9zXX9jfWczScN/PYNHLdc/nQ8roV8n/RMv/Ssz/T8/3Us7/Vc//WtXvX9D3V9jvadToe9X3aNH/YNP/ZtT/bNb/cdj/d9n/feDHXNXogdfohdv/gtz/iN7/jvjCgPvGhOD/k+H/meP/n+X/pOb/qgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAMgAiAAAI/wAFZBhIMIrBgwgTKizIsKFDAYQiSixEsaLFixgzapwYEQBEASBDihxJsqTJkxA9EhKIoaXLlzBjypwpM+VHDIpy6tzJs6fPnz1VqhSYqKjRo0iTKl2aVOhNRFCjSp1KVaqFEA+qVnW6EsOhr2DDir1QwoHYQwtmzIBxtu0hrgIwGJpLt65dFTNkqKELaIPaGR7sCqbrtJDAQYgTK158Qu0RxH9C/A3xZ7HlxIUFCtrMubNnA2pRCEJD4q8GO55Td86MIZDr17BjE1DrQgtetSBi69YNN0Of38CDC4egNsaLvw2EK1/Omo/z59CjS4DxN2+F6HzSFPGDHTrrPeDDi/8fD4W6WhhLxtch8teHmfHh4WLQQ7++/fsJ/q6Qcl/PkBk3zMCDgHf0pwdreSSo4IILflBdEwzmQQaAZ8wwRw8zZBFhHqzh4eGHIHrIhgjVzYBEiHjoUKJaOaCIB2tyxCjjjHKM0ZhaMqgVAY1ybDHDDnTMIAcQM2DBoxysxaHkkkwyscJfCrCgVgBMKgkHDjMIMUMQM9RQRpVKsvbGmGSSqYR5MjDwRgtqDVAmmVfY8FcNVbxJJmtu5KlnnhTkmBcFeaagVgF77rmGETQYwUWhe8rXxqOQtjGBnzAkAekPanEQ6aacdupRIUNhIMaopIoxglorOFGqFaiW6uqrsLJ/FsastIaBwAwmPFFrGF/4ueuvwNbKGhjEFmvsscQeMEMHyDbrLBjyeSHttNRWa+212Fr7aahddOvtt+CGK+644cpHxbnopqvuuuy2u658U8Qr77z01mvvvfXCJQAA/Pbr778AByxwwDathNLBCCMMqgAbNezwwxgNLPHEFA8cEAA7',
		wood:'/skin/resources/icon_wood.gif',
		crystal:'/skin/resources/icon_glass.gif',
		glass:'/skin/resources/icon_glass.gif',
		marble:'/skin/resources/icon_marble.gif',
		wine:'/skin/resources/icon_wine.gif',
		sulfur:'/skin/resources/icon_sulfur.gif',
		time:'/skin/resources/icon_time.gif',
		spy:'/skin/characters/military/120x100/spy_120x100.gif',
		warehouse:'/skin/img/city/building_warehouse.gif',
		recall:'/skin/layout/icon-missionAbort.gif',
		hideout:'/skin/img/city/building_safehouse.gif',
		barracks:'/skin/img/city/building_barracks.gif',
		target:'/skin/img/icon_target2.gif',
		crate:'/skin/layout/crate.gif',
		occupied:'/skin/img/island/besatzung_rot_cursor.gif',
		city:'/skin/layout/icon-city2.gif',
		defending:'/skin/unitdesc/unit_defend.gif',
		pillage:'/skin/actions/plunder.gif',
		blockade:'/skin/actions/blockade.gif',
		occupy:'/skin/actions/occupy.gif',
		espionage:'/skin/actions/espionage.gif',
		down:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMU7nOPkAAABeSURBVDhPY2AY1KChoeE/Mv7//z8jsoPR5XF6Bl0hiA8yDISxyeENFWwaSDYEZAPVDCLGMKIjmpCriDYIn6tIMoSqBmEzjGTXwDQQnQCJsQFmGDFqiUqgFBs0agADAMXiy62IQZxHAAAAAElFTkSuQmCC',
		up:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMU7nOPkAAABRSURBVDhPY2AYBRSHQENDw38QHhwGwVxDsauoYhC6IWS7iioG4TKEZFdRxSBChhDtKqoYhM2Q////M4IwNjmcqR1dMcgAZMVUSVcU5zViDQAAoybLrVjkt6YAAAAASUVORK5CYII%3D',
		top:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMU7nOPkAAABfSURBVDhPzZIxDgAgCAP15/wcw6AxBrRKB02YrGeBlvLlERHN1GgqA7G30HT6J5B4J6KA1pafXVFA0QKuXVFApzjAriigEwSOAwXkQVS1Wnl34axWsQFmMSVX8KaywgZGgBucx8CxiAAAAABJRU5ErkJggg%3D%3D',
		ignore:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMU7nOPkAAABpSURBVDhPzZJRCgAhCETbm3tzw4+WCLd5QiwFfsToc0pbu/qYmc/h7s9seNU/H7Mmxj1gEZm2/ZWsoAyJDsdABIYHrVxh0M5VCXIUlMHKbkYBXkDSYcBILlpQBFLjVvrbRCUqHbn9PakDBr0bnMtxgKsAAAAASUVORK5CYII%3D',
		combat:'/skin/unitdesc/unit_attack.gif',
		eye:'/skin/layout/icon-status-small.gif',
		mission:'/skin/layout/icon-mission.gif',
		military:'/skin/characters/military/120x100/swordsman_r_120x100.gif',
	},
	units:{
		'battering ram':{
			'id':307,
			'weight':30,
			'siegeDamage':76,
			'siegeAmmo':0
		},
		'catapult':{
			'id':306,
			'weight':30,
			'siegeDamage':133,
			'siegeAmmo':5
		},
		'mortar':{
			'id':305,
			'weight':30,
			'siegeDamage':322,
			'siegeAmmo':3
		},
	},
	init:function(){
		FarmList.load();
		
		//Remove &nbsp; from city names
		var cities=IkaTools.getCities();
		for(var i in cities){
			cities[i].name=cities[i].name.replace(/&nbsp;/i,' ');
            FarmList.yourCities[cities[i].id]=cities[i];
        }

		//Get current city coords, if possible
		var m=IkaTools.getCurrentCity().name.match(/\[(\d+):(\d+)\]/);
		if(m){
			FarmList.currentCityX=m[1];
			FarmList.currentCityY=m[2];
		}else{
			FarmList.currentCityX=-1;
			FarmList.currentCityY=-1;
			FarmList.setStatus('You must select "Show coordinates in town naivagtion"<br/>in the options menu if you want travel time calcuations to work.',null,false,5);
		}
		
		GM_addStyle(''
			+'#FarmList_status{position:absolute;display:block;border:1px solid #CB9B6A;background:#FDF7DD;z-index:100;padding:2px;text-align:left;left:0;top:0;}'
			+'#FarmList_status .success{color:#00aa00;font-weight:bold;}'
			+'#FarmList_status .failure{color:#ff0000;font-weight:bold;}'
			+'#FarmList_addTargetButton a{background:url('+FarmList.icons.addTarget+') no-repeat top center;cursor:pointer;}'
			+'#FarmList_addTargetButton a:hover{background:url('+FarmList.icons.addTargetHover+') no-repeat top center;cursor:pointer;}'
			+'#FarmList_removeTargetButton a{background:url('+FarmList.icons.removeTarget+') no-repeat top center;cursor:pointer;}'
			+'#FarmList_removeTargetButton a:hover{background:url('+FarmList.icons.removeTargetHover+') no-repeat top center;cursor:pointer;}'
			+'.FarmList_tableTitleRow th{padding:0;}'
			+'.FarmList_tableTitleRow h2{font-size:large;font-weight:bold;padding:0;}'
			+'.FarmList_toggleListButton{float:right;color:#aaa;margin-right:5px;cursor:pointer;}'
			+'#FarmList .FarmList_header{font-weight:bold;margin-left:10px;}'
			+'#FarmList .FarmList_spyImage{padding:0;margin:0;}'
			+'#FarmList {width:990px;margin:0 auto 15px auto;}'
			+'#FarmList table {border: 3px double #CB9B6A; background: #FDF7DD; text-align:left;margin-bottom:15px;width:100%;}'
			+'#FarmList table thead {background: #E7C680 url(skin/input/button.gif) repeat-x scroll 0 0;}'
			+'#FarmList table th {font-weight: bold; padding: 3px 1px 0px 3px;text-align:center;}'
			+'#FarmList table td {border-top: 1px solid #ECCF8E;padding: 0 0 0 3px;}'
			+'#FarmList table td.actions{padding:0px 0 2px 0;vertical-align:top;text-align:right;}'
			+'#FarmList table td.actions a.button{margin:0px 0 0 0}'
			+'#FarmList table .combatDiv{position:absolute;display:none;}'
			+'#FarmList table td.actions div.spy{padding:0px 0 4px 0;color:#000;font-weight:normal;vertical-align:top;text-align:left;}'
			+'#FarmList table td.actions div.spy>img{margin-bottom:-8px}'
			+'a.playerStatus.active{font-weight:bold;color:#ff0000;}'
			+'a.playerStatus.inactive{font-weight:bold;color:#aaaaaa;}'
			+'a.playerStatus.vacation{font-weight:bold;color:#00aa00;}'
			+'#FarmList table tr.alt{background:#FEE8C8;}'
			+'#FarmList table tr.alt td.actions div.spies{background:#FEE8C8;}'
			+'#FarmList table tr.resources td{padding:2px 0 1px 0;border-top-width:0px;border-right:1px solid #ECCF8E;}'
			+'#FarmList a.button{padding:0 0 2px 0;margin:2px 0 0 0;}'
			+'#FarmList img.button{padding:0 0 0px 0;margin:2px 0 0 0;}'
			+'#FarmList a.button img{vertical-align:middle;}'
			+'#FarmList_hideoutList tr td{padding:6px 2px 8px 2px;}'
			+'#FarmList_hideoutList tr.active td{font-weight:bold;}'
			+'#FarmList_ignoreList a{cursor:pointer;}'
			+'#FarmList .FL_tooltipAnchor{cursor:pointer;}'
			+'#FarmList .FL_tooltipAnchor:hover>.FL_tooltip{display:inline;}'
			+'#FarmList .FL_tooltip{display:none;position:absolute;background-color:#F1D7AD;border:1px solid #BE8D53;border-top-width:4px;padding:4px 8px;}'
			+'#FarmList .FL_tooltip table{margin-bottom:0;}'
			+'#FarmList .FL_tooltip ul.resources{display:inline;margin:0;width:100%;}'
			+'#FarmList .FL_tooltip ul.resources li{display:inline;padding:4px 0 8px 0;width:inherit;text-align:left;padding-left:34px;}'
			+'#FarmList .FL_tooltip ul.resources li.wood{background:url('+FarmList.icons.wood+') no-repeat 4px 2px;}'
			+'#FarmList .FL_tooltip ul.resources li.glass{background:url('+FarmList.icons.glass+') no-repeat 4px 2px;}'
			+'#FarmList .FL_tooltip ul.resources li.wine{background:url('+FarmList.icons.wine+') no-repeat 4px 2px;}'
			+'#FarmList .FL_tooltip ul.resources li.marble{background:url('+FarmList.icons.marble+') no-repeat 4px 2px;}'
			+'#FarmList .FL_tooltip ul.resources li.sulfur{background:url('+FarmList.icons.sulfur+') no-repeat 4px 2px;}'
			+'ul.resources li.updated.spy,#plunder ul.resources li.updated.spy{background:url('+FarmList.icons.eye+') no-repeat 8px 5px;}'			
			+'ul.resources li.updated.pillage,#plunder ul.resources li.updated.pillage{background:url('+FarmList.icons.combat+') 4px 2px no-repeat;}'
			+'#FarmList .FL_tooltip .textLabel{display:none;}'
			+'#FarmList .center,.center{text-align:center;}'
			+'#FarmList .right,.right{text-align:right;}'
			+'#FarmList .left,.left{text-align:left;}'
			+'#FarmList .bold,.bold{font-weight:bold;}'
			+'#island img.spyIndicator{width:28px;margin:-5px 0 0 -7px;border:0;}'
			//+'#island .FL_tooltip{bottom:50px;overflor:visible;z-index:99999;}'
			+'table.targetData{margin:0;border-bottom:1px dotted #BE8D53;}'
			+'table.targetData tr th{vertical-align:top;text-align:right;padding-top:10px;}'
			+'table.targetData tr td{vertical-align:top;text-align:left;padding:0 3px 0 3px;}'
			+'#plunder ul.resources li,#blockade ul.resources li{display:inline;padding:4px 0 8px 34px;}'
		);
		if(typeof(FarmList.views[IkaTools.getView()])=='function')FarmList.views[IkaTools.getView()]();
		FarmList.refreshTargets();
		FarmList.ready=true;
		FarmList.draw();
	},
	load:function(){
        FarmList.yourCities={};
		FarmList.spies=(typeof(IkaTools.getVal('FarmList.spies'))=='undefined'||typeof(IkaTools.getVal('FarmList.spies').keys)=='undefined')?{keys:[]}:IkaTools.getVal('FarmList.spies');
		FarmList.targets=(typeof(IkaTools.getVal('FarmList.targets'))=='undefined'||typeof(IkaTools.getVal('FarmList.targets').keys)=='undefined')?{keys:[]}:IkaTools.getVal('FarmList.targets');
		FarmList.players=(typeof(IkaTools.getVal('FarmList.players'))=='undefined'||typeof(IkaTools.getVal('FarmList.players').keys)=='undefined')?{keys:[]}:IkaTools.getVal('FarmList.players');
		FarmList.islands=(typeof(IkaTools.getVal('FarmList.islands'))=='undefined'||typeof(IkaTools.getVal('FarmList.islands').keys)=='undefined')?{keys:[]}:IkaTools.getVal('FarmList.islands');
		FarmList.combats=(typeof(IkaTools.getVal('FarmList.combats'))=='undefined'||typeof(IkaTools.getVal('FarmList.combats').keys)=='undefined')?{keys:[]}:IkaTools.getVal('FarmList.combats');
		FarmList.serverTime=FarmList.parseTimestamp($('#servertime')[0].innerHTML);
		FarmList.expireCombats();
	},
	save:function(){
		FarmList.saveTargets();
		FarmList.saveSpies();
		FarmList.saveCombats();
		FarmList.savePlayers();
		FarmList.saveIslands();
	},
	savePlayers:function(){
		IkaTools.setVal('FarmList.players',FarmList.players);
	},
	saveIslands:function(){
		IkaTools.setVal('FarmList.islands',FarmList.islands);
	},
	saveTargets:function(){
		IkaTools.setVal('FarmList.targets',FarmList.targets);
	},
	saveSpies:function(){
		IkaTools.setVal('FarmList.spies',FarmList.spies);
	},
	saveCombats:function(){
		IkaTools.setVal('FarmList.combats',FarmList.combats);
	},
	clearData:function(){
		IkaTools.setVal('FarmList.spies',0);
		IkaTools.setVal('FarmList.targets',0);
		IkaTools.setVal('FarmList.players',0);
		IkaTools.setVal('FarmList.islands',0);
		IkaTools.setVal('FarmList.combats',0);
		FarmList.load();
		FarmList.refreshActionButton();
		FarmList.draw();
	},
	refreshTargets:function(){
        var max=10;
        var done=0;
		for(var i in FarmList.targets.keys){
			var target=FarmList.getTarget(FarmList.targets.keys[i]);
			if(Math.abs(FarmList.daysApart(FarmList.serverTime,target.updated))>0.125){
				FarmList.targetRefreshData(target,done<max-1);
                if(++done>=max)return;
			}
		}
	},
	draw:function(){
		if(!FarmList.ready)return;
		
		//Find and clear the list container, or create a new one
		var div=$('#FarmList');
		if(div.length>0){
			div.html('');
			div=div[0];
		}else{
			div=document.createElement('div');
			div.id='FarmList'
			$('body').append(div);
		}
	
		FarmList.drawTargetList(div);
		FarmList.drawHideoutList(div);
	},
	drawTargetList:function(div){
		var showTargetList=IkaTools.getVal('FarmList.showTargetList');
		var html=[];
		
		//Clear target-level spy and combat lists
		for(var i in FarmList.targets.keys){
			var target=FarmList.getTarget(FarmList.targets.keys[i]);
			target.spies=[];
			target.combats=[];
		}
		
		//Assign spies to targets
		for(var i in FarmList.spies.keys){
			var spy=FarmList.spies[FarmList.spies.keys[i]];
			if(spy.targetId in FarmList.targets){
				FarmList.getTarget(spy.targetId).spies.push(spy);
			}
		}
		
		//Assign combats to targets
		for(var i in FarmList.combats.keys){
			var combat=FarmList.combats[FarmList.combats.keys[i]];
			if(combat.targetId in FarmList.targets){
				FarmList.getTarget(combat.targetId).combats.push(combat);
			}
		}
		
		html.push('<table id="FarmList_targetList" width="100%"><thead><tr class="FarmList_tableTitleRow"><th colspan="12"><a class="FarmList_toggleListButton" id="FarmList_toggleTargetList" title="'+(showTargetList?'Hide':'Show')+'">'+(showTargetList?'[-]':'[+]')+'</a><h2>Target List</h2></tr>');
		
		if(showTargetList){
			html.push('<tr>');
			html.push('<th><img height="20" src="'+FarmList.icons.target+'" title="Target City" class="left"/></th>');
			html.push('<th><img height="20" src="/skin/img/city/building_townhall.gif" title="Town Hall Level"/></th>');
			html.push('<th><img height="20" src="/skin/layout/stadtmauer_icon.gif" title="Town Wall Level"/></th>');
			html.push('<th width="70" title="Artillery Required"><img src="/skin/characters/military/120x100/ram_r_120x100.gif" width="20" title="Battering ram"/>/<img src="/skin/characters/military/120x100/catapult_r_120x100.gif" width="20" title="Catapult"/>/<img src="/skin/characters/military/120x100/mortar_r_120x100.gif" width="20" title="Mortar"/></th>');
			html.push('<th><img height="20" src="'+FarmList.icons.time+'" title="Travel Time"/></th>');
			html.push('<th><img height="20" title="Cargo Ships Required" src="/skin/characters/fleet/40x40/ship_transport_r_40x40.gif"/></th>');
			html.push('<th><img height="20" src="'+FarmList.icons.combat+'" title="Attacks in last 24 hours"/></th>');
			html.push('<th><img height="20" src="/skin/layout/bulb-off.gif" title="Player"/></th>');
			html.push('<th><img height="20" src="'+FarmList.icons.military+'" title="Military Score"/></th>');
			html.push('<th colspan="2"><img height="20" src="/skin/layout/icon-island.gif" title="Island"/></th>');
			html.push('<th class="right" width="205"><img id="FarmList_clearDataButton" height="20" class="button" tite="Clear All Data" src="'+FarmList.icons.removeTarget+'"></th>');
			html.push('</tr></thead><tbody>');
			
			var alt=true;
			var ignored=[];
			for(var i in FarmList.targets.keys){		
				var target=FarmList.getTarget(FarmList.targets.keys[i]);
				if(!target)
					continue;
				if(target.ignored){
					ignored.push(target);
					continue;
				}
				var player=FarmList.getPlayer(target.playerId);
				if(!player){
					continue;
				};
				var island=FarmList.islands[target.islandId];
				var spyCount=target.spies.length;
				
				html.push('<tr'+(alt=!alt?' class="alt"':'')+'>');
				html.push('<td>'+(target.occupied?'<img src="'+FarmList.icons.occupied+'" title="Under occupation" height="20"/> ':'')+'<a href="/index.php?view=island&cityId='+target.id+'">'+target.name+'</a>'+'</td>');
				html.push('<td class="center">'+target.hallLevel+'</td>');
				html.push('<td class="center">'+target.wallLevel+'</td>');
				html.push('<td class="center">'+FarmList.getArtilleryRequired(target,FarmList.units['battering ram'])+' / '+FarmList.getArtilleryRequired(target,FarmList.units['catapult'])+' / '+FarmList.getArtilleryRequired(target,FarmList.units['mortar'])+'</td>');
				html.push('<td class="left FL_tooltipAnchor">'+(FarmList.getTravelTimeString(FarmList.getTravelTime(FarmList.currentCityX,FarmList.currentCityY,island.x,island.y))+'').replace(/\d+s/,'')+FarmList.createTooltip(FarmList.getTravelTimeTable(island.x,island.y))+'</td>');
				html.push('<td class="center'+(target.resources.updated?' FL_tooltipAnchor':'')+'">'+FarmList.getShipsRequired(target)+FarmList.createTooltip(FarmList.getResourceHTML(target))+'</td>');
				html.push('<td class="center'+(target.combats.length?' FL_tooltipAnchor" id="FarmList_combats'+target.id+'"':'"')+'>'+target.combats.length+(target.combats.length?FarmList.createTooltip(FarmList.targetGetCombatsHTML(target)):'')+'</td>');
				html.push('<td class="left">'+FarmList.targetGetPlayerName(target)+'</td>');
				html.push('<td class="center'+('troops' in target?' FL_tooltipAnchor':'')+'"><span'+('troops' in target?' class="bold"':'')+'>'+IkaTools.addCommas(player.scores.military.score)+'</span>'+FarmList.createTooltip((target.troopsUpdated?'<p>Checked '+FarmList.formatMillisecondsElapsed(FarmList.serverTime.getTime()-target.troopsUpdated.getTime(),false)+' ago<br/><br/></p>':'')+target.troops)+'<div/></td>');
				html.push('<td class="FL_tooltipAnchor"><a title="View Island ('+island.name+')" href="/index.php?view=island&id='+island.id+'">'+island.x+':'+island.y+'</a></td>');
				html.push('<td><img src="'+FarmList.icons[island.tradeGood]+'"/></td>');
				
				var s='';
				for(var x in target.spies){
					var spy=target.spies[x];
					var city=IkaTools.getCityById(spy.cityId);
					s+='<div class="spy"><img src="'+FarmList.icons.spy+'" height="22"/>'
					+'<a class="button" title="Check Resources" id="FarmList_checkResources'+spy.id+'"><img src="'+FarmList.icons.warehouse+'" height="18"/></a>'
					+'<a class="button" title="Check Garrison" id="FarmList_checkGarrison'+spy.id+'"><img src="'+FarmList.icons.barracks+'" height="18"/></a>'
					+'<a class="button" title="Recall Spy" id="FarmList_recallSpy'+spy.id+'"><img src="'+FarmList.icons.recall+'" height="18"/></a>'
					+' '+city.name
                    +'</div>'
					;
				}
                
				html.push('<td class="actions">'
				+'<a class="button" id="FarmList_top'+target.id+'" title="Move to Top"><img src="'+FarmList.icons.top+'" width="13"/></a>'
				+'<a class="button" id="FarmList_up'+target.id+'" title="Move Up"><img src="'+FarmList.icons.up+'" width="13"/></a>'
				+'<a class="button" id="FarmList_down'+target.id+'" title="Move Down"><img src="'+FarmList.icons.down+'" width="13"/></a>'
				+'<a class="button" id="FarmList_ignore'+target.id+'" title="Ignore"><img src="'+FarmList.icons.ignore+'" width="13"/></a>'
				+'<a class="button" id="FarmList_remove'+target.id+'" title="Remove"><img src="'+FarmList.icons.removeTarget+'" height="18"/></a>'
				+'<a class="button" href="/index.php?view=plunder&destinationCityId='+target.id+'" title="Pillage"><img height="18" src="'+FarmList.icons.pillage+'"/></a>'
				+'<a class="button " href="/index.php?view=blockade&destinationCityId='+target.id+'" title="Blockade"><img height="18" src="'+FarmList.icons.blockade+'"/></a>'
				+'<span class="FL_tooltipAnchor"><a class="button" id="FarmList_sendSpy'+target.id+'" title="Send Spy"><img height="18" src="'+(spyCount>0?FarmList.icons.mission:FarmList.icons.espionage)+'"/></a>'+(s==''?'':FarmList.createTooltip(s))+'</span>'
				+'</td></tr>');
			}
			
			//Create ignore list
			if(ignored.length>0){
				html.push('<tr'+(alt=!alt?' class="alt"':'')+'><td colspan="12" id="FarmList_ignoreList">Ignored targets: ');
				var done=0;
				for(var i in ignored){
					var target=ignored[i];
					if(done++>0)html.push(', ');
					var player=FarmList.getPlayer(target.playerId);
					if(done++>0)html.push('<a id="FarmList_unignore'+target.id+'" title="Unignore '+target.name+'">'+target.name+(player?' ('+player.name+' {'+player.status.substr(0,1).toUpperCase()+'}'+')':'')+'</a>');
				}
				html.push('</td></tr>');
			}
		}
		
		$(div).append(html.join(''));
		
		$('td.actions',div).click(function(e){
			var button=e.target;
			if(button.tagName.match(/^img$/i))
				button=button.parentNode;
			var m=button.id.match(/(\D+)(\d+)/);
			var action=m[1];
			var id=m[2];
			if(action.match(/^FarmList_top$/i)){
				var idx=FarmList.targets.keys.indexOf(id);
				if(idx>0){
					var $this=$(this).closest('tr');
					$this.insertBefore($this.prevAll().filter(':last'));
					var $sibs=$this.siblings().andSelf();
					$sibs.removeClass('alt');
					$sibs.filter(':even').addClass('alt');
					if($this.next().hasClass('alt'))
						$this.removeClass('alt');
					else
						$this.addClass('alt');
					FarmList.targets.keys.splice(idx,1);
					FarmList.targets.keys.splice(0,0,id);
					FarmList.saveTargets();
				}
			}else if(action.match(/^FarmList_up$/i)){
				var idx=FarmList.targets.keys.indexOf(id);
				if(idx>0){
					var $this=$(this).closest('tr');
					var $prev=$(this).closest('tr').prev();
					$prev.toggle();
					$this.insertBefore($prev);
					$this.toggleClass('alt');
					$prev.toggleClass('alt');
					$prev.toggle();
					var newIdx=idx;
					while(FarmList.targets[FarmList.targets.keys[--newIdx]].ignored){if(newIdx==0)break;}
					FarmList.targets.keys.splice(newIdx,0,FarmList.targets.keys.splice(idx,1)[0]);
					FarmList.saveTargets();
				}
			}else if(action.match(/^FarmList_down$/i)){
				var idx=FarmList.targets.keys.indexOf(id);
				if(idx>=0&&idx<FarmList.targets.keys.length-1){
					var $this=$(this).closest('tr');
					var $next=$(this).closest('tr').next();
					$next.toggle();
					$this.insertAfter($next);
					$this.toggleClass('alt');
					$next.toggleClass('alt');
					$next.toggle();
					var newIdx=idx;
					while(FarmList.targets[FarmList.targets.keys[++newIdx]].ignored){if(newIdx==FarmList.targets.keys.length-1)break;}
					FarmList.targets.keys.splice(newIdx,0,FarmList.targets.keys.splice(idx,1)[0]);
					FarmList.saveTargets();
				}
			}else if(action.match(/^FarmList_ignore$/i)){
				FarmList.ignoreTarget(id);
				FarmList.refreshActionButton();
				FarmList.draw();
			}else if(action.match(/^FarmList_remove$/i)){
				var target=FarmList.getTarget(id);
				var answer=confirm('Remove all data for '+target.name+'?');
				if(answer){
					var $this=$(this).closest('tr');
					var $sibs=$this.siblings();
					$this.remove();
					$sibs.filter(':odd').removeClass('alt');
					$sibs.filter(':even').addClass('alt');
					FarmList.removeTarget(target);
					FarmList.refreshActionButton();
				}
			}else if(action.match(/^FarmList_sendSpy$/i)){
				FarmList.targetSendSpy(id);
			}else if(action.match(/^FarmList_checkResources$/i)){
				FarmList.runMission(FarmList.spies[id],'resources');
			}else if(action.match(/^FarmList_checkGarrison$/i)){
				FarmList.runMission(FarmList.spies[id],'garrison');
			}else if(action.match(/^FarmList_recallSpy$/i)){
				FarmList.runMission(FarmList.spies[id],'retreat');
			}
		});
		$('#FarmList_toggleTargetList',div).click(function(){
			IkaTools.setVal('FarmList.showTargetList',showTargetList?false:true);
			FarmList.draw();
		});
		$('#FarmList_clearDataButton',div).click(function(){
			var answer=confirm('You are about to clear all of your collected target data.'+NEWLINE+NEWLINE+'Proceed?');
			if(answer)
				FarmList.clearData();
		});
		$('a[id^="FarmList_unignore"]',div).click(function(){
			FarmList.unignoreTarget(this.id.match(/\d+/)[0]);
			FarmList.refreshActionButton();
			FarmList.draw();
		});
	},
	targetGetCombatsHTML:function(target){
		if(!(target=FarmList.getTarget(target)))return;
		var s='';
		if(target.combats.length){
			s+='<table>';
			for(var i in target.combats){
				var combat=target.combats[i];
				s+='<tr><td class="left"><img src="'+FarmList.icons[combat.type]+'" title="'+combat.type+'" height="20"/></td><td>'+FarmList.formatMillisecondsElapsed(FarmList.serverTime.getTime()-combat.time.getTime(),false)+' ago</td><td>'
				if(combat.type=='pillage'&&combat.resources){
					s+=combat.resources;
				}
				s+='</td></tr>';
			}
			s+='</table>';
		}else{
			s+='<p>None</p>';
		}
		return s;
	},
	createTooltip:function(html){
		return '<div class="FL_tooltip">'+html+'</div>';
	},
	drawHideoutList:function(div){
		var showHideoutList=IkaTools.getVal('FarmList.showHideoutList');
		var html=[];
		
		html.push('<table id="FarmList_hideoutList" width="100%"><thead><tr class="FarmList_tableTitleRow"><th colspan="4"><a class="FarmList_toggleListButton" id="FarmList_toggleHideoutList" title="'+(showHideoutList?'Hide':'Show')+'">'+(showHideoutList?'[-]':'[+]')+'</a><h2>Hideout List</h2></tr>');
		if(showHideoutList){
		
			html.push('<tr>');
			html.push('<th class="left"><img height="20" src="'+FarmList.icons.city+'" title="City"/></th>');
			html.push('<th><img height="20" src="'+FarmList.icons.hideout+'" title="Hideout Level (max spies)"/></th>');
			html.push('<th><img height="20" src="'+FarmList.icons.defending+'" title="% of spies on defence"/><img height="20" src="'+FarmList.icons.spy+'" title="Spies at defending / On a mission"/></th>');
			html.push('<th class="right"><img id="FarmList_scanHideouts" class="button" title="Scan Hideouts" src="'+FarmList.icons.hideout+'" height="20"/></th>');
			html.push('</tr></thead><tbody>');
		
			var alt=true;
			var cities=IkaTools.getCities();
			for(var i in cities){
				var city=cities[i];
				if(city.type)
					continue;
				html.push('<tr class="'+(alt=!alt?'alt':'')+(city.id==IkaTools.getCurrentCityId()?' active':'')+'">'
				+'<td><a title="Switch to '+city.name+'" href="/index.php?cityId='+city.id+'" onclick="var sel=document.getElementById(\'citySelect\');for(var i in sel.options){var opt=sel.options[i];if(opt.value==\''+city.id+'\'){sel.selectedIndex=i;}}sel.form.submit();return false;">'+city.name+'</a></td>'
				);
				
				var hideout=IkaTools.cityGetBuildingByType('safehouse',city);
				if(hideout){
					html.push('<td class="center"><a title="View hideout in '+city.name+'" href="/index.php?view=safehouse&id='+city.id+'&position='+hideout.position+'">'+hideout.level+'</a></td>');
					html.push('<td class="center">'+(city.spiesDefending&&city.spiesAbroad?Math.round((parseInt(city.spiesDefending)/(parseInt(city.spiesDefending)+parseInt(city.spiesAbroad)))*100)+'% ('+city.spiesDefending+' / '+city.spiesAbroad+')':'Unknown')+'</td>');
					if(typeof(city.spiesUntrained)=='undefined'){
						html.push('<td class="right"></td>');
					}else if(city.spiesUntrained>0){
						html.push('<td class="right"><a class="button" id="FarmList_trainSpy'+city.id+'">Train Spy</a></td>');
					}else{
						html.push('<td class="right">All spies trained!</td>');
					}
					html.push('</tr>');
				}else{
					html.push('<td class="center" colspan="3">No hideout</td></tr>');
				}
			}
		}
		
		$(div).append(html.join(''));
		
		$('#FarmList_toggleHideoutList',div).click(function(){
			IkaTools.setVal('FarmList.showHideoutList',showHideoutList?false:true);
			FarmList.draw();
		});
		
		$('#FarmList_scanHideouts',div).click(function(){
			var cities=IkaTools.getCities();
            var ownCities=[];
			for(var i in cities)
                if(!cities[i].type)ownCities.push(i);
			for(var i in ownCities)
                FarmList.cityScanHideout(cities[ownCities[i]],i<ownCities.length-1);
		});
		
		$('[id^="FarmList_trainSpy"]',div).click(function(){
			FarmList.cityTrainSpy(this.id.match(/\d+/)[0]);
		});
	},
	cityTrainSpy:function(city){
		city=typeof(city)=='object'?city:IkaTools.getCityById(city);
		var status=FarmList.setStatus('Requesting spy training in '+city.name+'... ');
		var hideout=IkaTools.cityGetBuildingByType('safehouse',city);
		if(!hideout){
			FarmList.setStatus('there is no known hideout!',status,true,5,false);
			return;
		}
		var url='http://'+document.domain+'/index.php?view=safehouse&id='+city.id+'&position='+hideout.position;
		IkaTools.getRemoteDocument(url,function(doc){
			var trainButton=$('#units .forminput a.button',doc);
			var upgrading=$('#upgradeInProgress',doc).length>0;
			if(upgrading){
				FarmList.setStatus('the hideout is being upgraded!',status,true,5,false);
			}else if(trainButton.length==0){
				FarmList.setStatus('either the hideout is full, training is in progress, or there are insufficient resources.',status,true,5,false);
			}else{
				var url='http://'+document.domain+'/'+trainButton.attr('href');
				IkaTools.getRemoteDocument(url,function(doc){
					FarmList.setStatus('training started!',status,true,3,true);
					//TODO: rescan hideout
				});
			}
		});
	},
	getShipsRequired:function(target){
		if(!(target=FarmList.getTarget(target)))return;
		if(target.resources.updated){	
			var total=0;
			for(var i in FarmList.resourceNames){
				total+=FarmList.getUnsafeResources(target,FarmList.resourceNames[i]);
			}
			return total<=5?0:Math.ceil(total/500);
		}else{
			return '?';
		}
	},
	getUnsafeResources:function(target,resource){
		if(!(target=FarmList.getTarget(target)))return;
		var qty=target.resources[resource.toLowerCase()];
		if(typeof(qty)=='undefined'||isNaN(qty)){
			return 0;
		}else{
			return Math.max(0,qty-target.safeResources);
		}
	},
	getResourceHTML:function(target){
		//Generate output
		if(target.resources.updated){
			if('safeResources' in target){var safeResources=target.safeResources;}else{var safeResources=FarmList.defaultSafeResources;}
			var resourceNames=['Wood','Wine','Marble','Glass','Sulfur'];
			var s='';
			var total=0;
			for(var i in resourceNames){
				var res=resourceNames[i];
				var qty=FarmList.getUnsafeResources(target,res);
				total+=qty;
				s+=qty>0?'<li class="'+res.toLowerCase()+'" title="'+res+'">'+IkaTools.addCommas(qty)+'</li>':'';
			}
			if(total<=5){s='<li class="none">No resources available</li>';}
			
			var elapsed=FarmList.formatMillisecondsElapsed(Math.max(FarmList.serverTime.getTime()-target.resources.updated.getTime(),0),false);
			s+='<li class="updated '+target.resources.updateType+'" title="Updated by a '+(target.resources.updateType=='spy'?'spy report':'combat report')+'">'
			+(elapsed==''?'an unknown amount of time':elapsed)+' ago</li>';
			
		}else{
			return '<p>Unknown</p>';
		}
		return '<ul class="resources">'+s+'</ul>';
	},
    getTravelTime:function(x1,y1,x2,y2){
		if(x1==-1||y1==-1||x2==-1||y2==-1)
			return '?';
        if(x1==x2&&y1==y2)
            time=1200/60*0.5;
        else
            time=1200/60*(Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2)));
        return time*60*1000;
    },
	getTravelTimeString:function(time){
		return unsafeWindow.getTimestring(time,3,' ','',true,true); 
	},
    getTravelTimeTable:function(x,y){
        var table=document.createElement('table');
		var times=[];
		var html=[];
        var cities=IkaTools.getCities().slice(0);
		cities.sort(function(a,b){
				var m1=a.name.match(/\[(\d+):(\d+)\]/);
				if(m1)
					a.time=FarmList.getTravelTime(m1[1],m1[2],x,y);
				else
					a.time=-1;
				var m2=b.name.match(/\[(\d+):(\d+)\]/);
				if(m2)
					b.time=FarmList.getTravelTime(m2[1],m2[2],x,y);
				else
					b.time=-1;
				return a.time-b.time;
		});
		html.push('<table>');
		for(var i in cities){
			var city=cities[i];
			if(city.type)
				continue;
			html.push('<tr><td><a onclick="var sel=document.getElementById(\'citySelect\');for(var i in sel.options){var opt=sel.options[i];if(opt.value==\''+city.id+'\'){sel.selectedIndex=i;}}sel.form.submit();return false;">'+city.name+'</a></td>');
			if(city.time>0)
				html.push('<td>'+(FarmList.getTravelTimeString(city.time)+'').replace(/\d+s/,'')+'</td></tr>');
			else
				html.push('<td>?</td></tr>');
		};
		html.push('</table>');
        return html.join('');
    },
	getArtilleryRequired:function(target,unit){
        var target=FarmList.getTarget(target);if(!target)return '?';
		var w=target.wallLevel;
		var h=target.hallLevel;
		
		if(isNaN(h)||isNaN(w)||typeof(h)=='undefined'||typeof(w)=='undefined'||typeof(unit)=='undefined')return '?';
		if(w==0)return 0;
		
		var maxUnits=(h>9?18:(h>3?12:6));
		var seg=(h>9?7:(h>4?5:3));
		
		//There are some cases where this function doesn't return the best figure, so here are some overrides
        if(unit.id==305&&seg==5&&(w>=13&&w<=13))return 9;//default is 8, which leaves at little health on one segment after 2 rounds
		if(unit.id==305&&seg==7&&(w>=10&&w<=10))return 12;//default is 11, which leaves at little health on one segment after the first round, causing an extra casualty
        if(unit.id==305&&seg==7&&(w>=12&&w<=14))return 12;//default is 11, which leaves at little health on one segment after 2 rounds
		if(unit.id==305&&seg==7&&w==18)return 16;//default is 14, which sometimes leaves a tiny bit of health after 2 rounds, as does 15
		if(unit.id==305&&seg==7&&(w>=24&&w<=25))return 18;//default is 14, but this override means the 3 center segments die in the first round
		
		var arm=15+(8*Math.floor(w/3));
		var hp=100+(w*50);
		var hpTot=seg*hp;
		var hitDam=unit.siegeDamage-arm;
		if(hitDam<=0)return '-';
		var segHits=Math.ceil(hp/hitDam);
		var totHits=seg*segHits;
		var rnd=Math.ceil(totHits/maxUnits);
		return Math.ceil(totHits/rnd)*(unit.siegeAmmo==0?1:Math.ceil(rnd/unit.siegeAmmo));
	},
	formatMillisecondsElapsed:function(milliseconds,showSeconds){
		if(typeof(showSeconds)=='undefined'){var showSeconds=true;};
		var seconds=Math.floor(milliseconds/1000);
		var days=seconds>3600*24?Math.floor(seconds/(3600*24)):0;
		seconds=seconds%(3600*24);
		var hours=seconds>3600?Math.floor(seconds/3600):0;
		var minutes=Math.floor((seconds%3600)/60);
		seconds=seconds%60;
		var text='';
		text=showSeconds?seconds+' second'+(seconds==1?'':'s'):'';
		text=minutes>0||(!showSeconds&&milliseconds<60000)?minutes+' minute'+(minutes==1?'':'s')+(text==''?'':', '+text):text;
		text=hours>0?hours+' hour'+(hours==1?'':'s')+(text==''?'':', '+text):text;
		text=days>0?days+' day'+(days==1?'':'s')+', '+text:text;
		return text;
	},
	//Returns the number of days between two dates
	//If date1 is more recent than date returns a positive value, otherwise negative
	daysApart:function(date1,date2){
		return (((date1.getTime()-date2.getTime())/1000)/3600)/24;
	},
	//Get local time from a timestamp
	parseTimestamp:function(t,sourceGmtOffset){
		//Assume the timestamp is in GMT unless an hour offset is passed
		var d=new Date();
		if(typeof(sourceGmtOffset)=='undefined'){var sourceGmtOffset=0;}
		//Get the local GMT offset in hours
		var localGmtOffset=-d.getTimezoneOffset()/60;
		//Attempt to match the constituent parts of the timestamp
		var re=/(\d+)\.(\d+)\.(\d+)\s+(\d+):(\d+):(\d+)/i;
		var res=re.exec(t);
		if(res!=null){
			d.setTime(0);
			d.setDate(res[1]);
			d.setMonth(res[2]-1);
			d.setFullYear(res[3]);
			d.setHours(res[4]);
			d.setMinutes(res[5]);
			d.setSeconds(res[6]);
			//Adjust the time to get its TZ correct
			d.setTime(d.getTime()+((sourceGmtOffset+localGmtOffset)*60*60000));
		}
		return d;
	},
	runMission:function(spy,mission){
		var target=FarmList.getTarget(spy.targetId);if(!target)return;
		
		var player=FarmList.getPlayer(target.playerId);
		if(mission=='garrison'&&player.scores.military.score==0){
			var answer=confirm(player.name+' has 0 military score, which means they probably have no troops in '+target.name+'.'+NEWLINE+NEWLINE+'Are you sure you want to risk your spy anyway?');
			if(!answer)
				return;
		}
		
		var city=IkaTools.getCityById(spy.cityId);
		var status=FarmList.setStatus('Attempting '+mission+' mission in '+target.name+'... ');
		var hideout=IkaTools.cityGetBuildingByType('safehouse',city);
		if(!hideout){
			FarmList.setStatus(' no hideout found!',status,true,5,false);
			return;
		}		
		var url='http://'+document.domain+'/index.php?view=safehouseMissions&id='+city.id+'&position='+hideout.position+'&spy='+spy.id;
		IkaTools.getRemoteDocument(url,function(doc){
			var jqMission=$('#mainview #missionlist .'+mission+':first',doc);
			if(jqMission.length<1){
				FarmList.setStatus('could not retrieve mission data!',status,true,5,false);
				FarmList.cityScanHideout(city);
				return;
			}
			var risk=$('.missionRisk',jqMission).contents()[1].nodeValue.trim();
			var cost=$('.missionCosts .gold',jqMission).text();
			var answer=confirm(
				'Your spy from '+city.name+' is about to attempt the "'+mission+'" mission in '+target.name+'.'+NEWLINE
				+'This will cost '+cost+' gold and there is a '+risk+' chance of failure.'+NEWLINE
				+NEWLINE
				+'Proceed?'
			);
			if(answer){
				FarmList.targetRefreshData(target,false,function(target){
					var url='http://'+document.domain+'/'+$('.missionStart a:first',jqMission).attr('href');
					IkaTools.getRemoteDocument(url,function(doc){
						var success=false;
						
						if(mission=='resources'){
							var jqResources=$('#mainview #resources tr',doc);
							if(jqResources.length>0){
								success=true;
								target.resources={
									wood:parseInt($('.count',jqResources[1]).text().replace(/\D/g,'')),
									wine:parseInt($('.count',jqResources[2]).text().replace(/\D/g,'')),
									marble:parseInt($('.count',jqResources[3]).text().replace(/\D/g,'')),
									glass:parseInt($('.count',jqResources[4]).text().replace(/\D/g,'')),
									sulfur:parseInt($('.count',jqResources[5]).text().replace(/\D/g,'')),
									updated:FarmList.parseTimestamp($('td',$('#mainview .record tr',doc)[2])[1].innerHTML),
									updateType:'spy'
								}
							}
						}else if(mission=='garrison'){
							var jqReports=$('#mainview .record .reportTable',doc);
							if(jqReports.length>0){
								success=true;
								var s='';
								$('#mainview .record .report',doc).each(function(){
									s+=this.innerHTML;
								});
								target.troops=s;
								target.troopsUpdated=new Date();
								target.troopsUpdated.setTime(FarmList.serverTime.getTime());
							}
						}else if(mission=='retreat'){
							success=true;
							FarmList.removeSpy(spy)
						}				
						
						if(success){
							FarmList.setStatus('mission succeeded!',status,true,3,true);
						}else{
							FarmList.removeSpy(spy);
							FarmList.setStatus('mission failed!',status,true,5,false);
							FarmList.cityScanHideout(city);
						}
						
						FarmList.saveTargets();
						FarmList.draw();
					});
				});
			}else{
				FarmList.setStatus('',status);
			}
		});
	},
	targetSendSpy:function(target){
		if(!(target=FarmList.getTarget(target)))return;
		if(IkaTools.getCurrentCity().type){
			alert('Please activate a city you own before sending a spy.');
			return;
		}
		target=FarmList.getTarget(target);
		var status=FarmList.setStatus('Sending spy to '+target.name+'... ');
		var url='http://'+document.domain+'/index.php?view=sendSpy&destinationCityId='+target.id+'&islandId='+target.islandId;
		IkaTools.getRemoteDocument(url,function(doc){
			if($('#mainview .buildingDescription',doc).length==0){
				FarmList.setStatus('the target no longer exists!',status,true,5,false);
				FarmList.removeTarget(target);
				FarmList.draw();
				return;
			}
			var error=$('#mainview .error:first');
			if(error.length>0){
				FarmList.setStatus(error.html(),status,true,5,false);
				return;
			}
			var risk=$('#mainview #sendSpy .risk .percentage',doc).text();
			var cost=$('#mainview #sendSpy .costs',doc).contents()[1].nodeValue;
			var answer=confirm('You are about to send a spy from '+IkaTools.getCurrentCity().name+' to '+target.name+'.'+NEWLINE+'This will cost '+cost+' gold and there is a '+risk+' chance of discovery.'+NEWLINE+NEWLINE+'Proceed?');
			if(answer){
				var url='http://'+document.domain+'/'+$('#sendSpy .centerButton a:first',doc).attr('href');
				IkaTools.getRemoteDocument(url,function(doc){
					//If it didn't go back to the island view, show the mainview so I can figure out what to report
					if($('#mainview #cities',doc).length>0)
						FarmList.setStatus('spy is enroute!',status,true,3,true);
					else{
						alert('Failed to send spy! '+NEWLINE+$('#mainview',doc).html());
						FarmList.setStatus('',status);
					}
				});
			}else{
				FarmList.setStatus('',status);
			}
		});
	},
	targetRefreshData:function(target,suppressDraw,callback){
		var target=FarmList.getTarget(target);if(!target)return;
		
		//If the last update was very recent, don't refresh
		if(FarmList.daysApart(FarmList.serverTime,target.updated)<0.043){
			if(typeof(callback)=='function')
				callback(target);
			return;
		}
		
		var status=FarmList.setStatus('Refreshing '+target.name+'... ');
		var error=false;
		var url='http://'+document.domain+'/index.php?view=island&cityId='+target.id;
		IkaTools.getRemoteDocument(url,function(doc){
			var cityLink=$('#mainview a#city_'+target.id,doc);
			if(cityLink.length==0){
				FarmList.removeTarget(target);
                if(!suppressDraw)FarmList.draw();
				FarmList.setStatus('target no longer exists!',status,true,5,false);
				return;
			}
			
			var cityLocation=cityLink[0].parentNode;
			target.name=FarmList.getCityName(cityLocation);
			target.hallLevel=FarmList.getCityLevel(cityLocation);
			target.occupied=$('.occupied',cityLocation).length>0;
            
			var player=FarmList.getPlayer(target.playerId);
            if(!player){
                FarmList.removeTarget(target);
                if(!suppressDraw)FarmList.draw();
                FarmList.setStatus('no player associated!',status,true,3,false);
                return;
            }
            player.name=$('.cityinfo .owner',cityLocation).contents()[1].nodeValue.toString().trim();
            player.status=FarmList.getPlayerStatus(cityLocation);
            
			var $allianceLink=$('.ally a:first',cityLocation);
			if($allianceLink.length){
				player.alliance=$allianceLink.text();
				player.allianceId=$allianceLink.attr('href').match(/allyId=(\d+)/i)[1];
			}else{
				player.alliance='';
				player.allianceId=0;
			}
			
			FarmList.playerUpdateMilitaryScore(player,function(){
				var url='http://'+document.domain+'/index.php?view=city&id='+target.id;
				IkaTools.getRemoteDocument(url,function(doc){
					//Check if buildings are visible, which will only be possible if a spy is present
					var jqBuildings=$('#mainview #locations li',doc);
					if(jqBuildings.length>0){
						//Loop through all the buildings
						target.warehouses=[];
						jqBuildings.each(function(){
							if(this.className.match(/warehouse/i)){
								target.warehouses.push(parseInt($('a',this).attr('title').match(/\d+/)[0]));
							}else if(this.className.match(/townHall/i)){
								target.hallLevel=parseInt($('a',this).attr('title').match(/\d+/)[0]);
							}else if(this.className.match(/wall/i)){
								var m=$('a',this).attr('title').match(/(\d+)/);
								target.wallLevel=m==null?0:parseInt(m[1]);
							}
						});
						target.safeResources=FarmList.defaultSafeResources;
						for(var i in target.warehouses)
							target.safeResources+=target.warehouses[i]*80;
						target.occupied=$('.occupation_warning',doc).length>0;
						target.buildingsUpdated=new Date();
						target.wallUpdated=new Date();
					}
					target.updated=new Date();
					FarmList.saveTargets();
					if(!suppressDraw)FarmList.draw();
					FarmList.setStatus('done!',status,true,3,true);
					if(typeof(callback)=='function')
						callback(target);
				});
			});
		});	
	},
	getCityName:function(cityLocation){
		return $('ul.cityinfo li.name',cityLocation).contents()[1].nodeValue;
	},
	getCityLevel:function(cityLocation){
		return parseInt($('ul.cityinfo li.citylevel',cityLocation).contents()[1].nodeValue);
	},
	getCityId:function(cityLocation){
		return $('a[id^="city_"]',cityLocation).attr('id').match(/_(\d+)/i)[1];
	},
	getPlayerStatus:function(cityLocation){
		var cityLink=$('a[id^="city"]',cityLocation);
		return $('span.vacation',cityLink).length>0?'vacation':($('span.inactivity',cityLink).length>0?'inactive':'active');
	},
	ignoreTarget:function(target){
		target=FarmList.getTarget(target);
		target.ignored=true;
		FarmList.moveTargetToBottom(target);
	},
	unignoreTarget:function(target){
		target=FarmList.getTarget(target);
		target.ignored=false;
		FarmList.moveTargetToBottom(target);
	},
	moveTargetToBottom:function(target){
		target=FarmList.getTarget(target);
		var idx=FarmList.targets.keys.indexOf(target.id);
		if(idx>=0&&idx<FarmList.targets.keys.length-1)
			FarmList.targets.keys.splice(FarmList.targets.keys.length,0,FarmList.targets.keys.splice(idx,1)[0]);
		FarmList.saveTargets();
	},
	addTarget:function(id,name,playerId,islandId,hallLevel){
		FarmList.targets[id]={
			id:id,
			name:name,
			playerId:playerId,
			islandId:islandId,
			hallLevel:hallLevel
		};
		if(FarmList.targets.keys.indexOf(id)<0)
			FarmList.targets.keys.push(id);
		FarmList.saveTargets();
	},
	getTarget:function(target){
		target=typeof(target)=='object'?target:FarmList.targets[target];
		if(typeof(target)=='undefined'||typeof(target.id)=='undefined')
			return false;
		
		if(!('updated' in target)){
			target.updated=new Date();
			target.updated.setTime(0);
		}
		if(!('buildingsUpdated' in target)){
			target.buildingsUpdated=new Date();
			target.buildingsUpdated.setTime(0);
		}
		if(!('wallUpdated' in target)){
			target.wallUpdated=new Date();
			target.wallUpdated.setTime(0);
		}
		if(!('spies' in target)){
			target.spies=[];
		}
		if(!('combats' in target)){
			target.combats=[];
		}
		if(!('wallLevel' in target)){
			target.wallLevel='?';
		}
		if(!('resources' in target)){
			target.resources={updated:0};
		}
		if(!('safeResources' in target)){
			target.safeResources=FarmList.defaultSafeResources;
		}
		
		return target;
	},
	removeTarget:function(target){
		target=FarmList.getTarget(target);
		var idx=FarmList.targets.keys.indexOf(target.id);
		
		//Delete the player if this is the only target of theirs
		var playerId=target.playerId;
		var playerTargets=0;
		for(var i in FarmList.targets.keys){
			if(FarmList.getTarget(FarmList.targets.keys[i]).playerId==playerId)
				playerTargets++;
		}
		if(playerTargets<2)
			FarmList.removePlayer(playerId);
			
		//Delete the island if this is the only target on it
		var islandId=target.islandId;
		var islandTargets=0;
		for(var i in FarmList.targets.keys){
			if(FarmList.getTarget(FarmList.targets.keys[i]).islandId==islandId)
				islandTargets++;
		}
		if(islandTargets<2)
			FarmList.removeIsland(islandId);
		
		//Delete any combats at this target
		var targetCombats=[];
		for(var i in FarmList.combats.keys){
			var combat=FarmList.combats[FarmList.combats.keys[i]];
			if(combat.targetId==target.id)
				targetCombats.push(combat);
		}
		for(var i in targetCombats)
			FarmList.removeCombat(targetCombats[i]);
		
		if(idx>=0)
			FarmList.targets.keys.splice(idx,1);
		delete FarmList.targets[target.id];
		FarmList.saveTargets();
	},
	addPlayer:function(id,name,alliance,status){
		FarmList.players[id]={
			id:id,
			name:name,
			alliance:alliance,
			status:status
		};
		if(FarmList.players.keys.indexOf(id)<0)
			FarmList.players.keys.push(id);
		FarmList.savePlayers();
	},
	getPlayer:function(player){
		player=typeof(player)=='object'?player:FarmList.players[player];
		if(typeof(player)=='undefined'||typeof(player.id)=='undefined')
			return false;
		
		if(!('scores' in player)){
			player.scores={};
		}
		if(!('military' in player.scores)){
			player.scores.military={
				score:'?',
				updated:new Date()
			};
			player.scores.military.updated.setTime(0);
		}
		
		return player;
	},
	removePlayer:function(player){
		player=FarmList.getPlayer(player);
		var idx=FarmList.players.keys.indexOf(player.id);
		if(idx>=0)
			FarmList.players.keys.splice(idx,1);
		delete FarmList.players[player.id];
		FarmList.savePlayers();
	},
	addIsland:function(id,name,x,y,tradeGood) {
		FarmList.islands[id]={
			id:id,
			name:name,
			x:x,
			y:y,
			tradeGood:tradeGood
		};
		if(FarmList.islands.keys.indexOf(id)<0)
			FarmList.islands.keys.push(id);
		FarmList.saveIslands();
	},
	removeIsland:function(island){
		var island=typeof(island)=='object'?island:FarmList.islands[island];
		var idx=FarmList.islands.keys.indexOf(island.id);
		if(idx>=0)
			FarmList.islands.keys.splice(idx,1);
		delete FarmList.islands[island.id];
		FarmList.saveIslands();
	},
	addSpy:function(id,targetId,cityId){
		FarmList.spies[id]={
			id:id,
			targetId:targetId,
			cityId:cityId,
		}
		if(FarmList.spies.keys.indexOf(id)<0)
			FarmList.spies.keys.push(id);
		FarmList.saveSpies();
	},
	removeSpy:function(spy){
		var spy=typeof(spy)=='object'?spy:FarmList.spies[spy];
		var idx=FarmList.spies.keys.indexOf(spy.id);
		if(idx>=0)
			FarmList.spies.keys.splice(idx,1);
		delete FarmList.spies[spy.id];
		FarmList.saveSpies();
	},
	addCombat:function(id,targetId,time,type,name){
		FarmList.combats[id]={
			id:id,
			time:time,
			type:type,
			targetId:targetId,
			name:name
		};
		if(FarmList.combats.keys.indexOf(id)<0)
			FarmList.combats.keys.push(id);
		FarmList.saveCombats();
		return FarmList.combats[id];
	},
	removeCombat:function(combat){
		var combat=typeof(combat)=='object'?combat:FarmList.combats[combat];
		var idx=FarmList.combats.keys.indexOf(combat.id);
		if(idx>=0)
			FarmList.combats.keys.splice(idx,1);
		delete FarmList.combats[combat.id];
		FarmList.saveCombats();
	},
	//Remove combats that are older than 24 hours
	expireCombats:function(){
		for(var i in FarmList.combats.keys){
			var combat=FarmList.combats[FarmList.combats.keys[i]];
			if(FarmList.daysApart(FarmList.serverTime,combat.time)>1)
				FarmList.removeCombat(combat);
		}
	},
	parseCityLocation:function(cityLocation,doc){
		if(!doc)doc=document;
		
		//Get target data
		var targetId=FarmList.getCityId(cityLocation);
		var targetName=FarmList.getCityName(cityLocation);
		var hallLevel=FarmList.getCityLevel(cityLocation);
		
		//Get player data
		var playerId=$('.cityinfo .owner a.messageSend',cityLocation).attr('href').match(/receiverId=(\d+)/i)[1];
		var playerName=$('.cityinfo .owner',cityLocation).contents()[1].nodeValue.toString().trim();
		var playerStatus=FarmList.getPlayerStatus(cityLocation);
		var alliance=$('.cityinfo .ally a:first',cityLocation).html();
		
		//Get island data
		var m=$('div#breadcrumbs span.island',doc).html().match(/(\w+)\D*(\d+):(\d+)/);
		var islandName=m[1];
		var islandX=parseInt(m[2]);
		var islandY=parseInt(m[3]);
		var tradeGood=$('#tradegood',doc).attr('class').match(/^\s*(\w+) /i)[1];
		
		//Get island ID in whatever way possible
		var islandId=0;
		var jq=$('.cityactions .espionage a:first',cityLocation);
		if(jq.length>0){
			islandId=jq.attr('href').match(/islandId=(\d+)/i)[1];
		}else{
			jq=$('.cityinfo .ally a:first',cityLocation);
			if(jq.length>0){
				islandId=jq.attr('href').match(/[&?]id=(\d+)/i)[1];
			}else{
				jq=$('.buildplace a:first',cityLocation.parentNode);
				if(jq.length>0)
					islandId=jq.attr('href').match(/islandId=(\d+)/i)[1];
				else
					alert('Unable to determine island ID!  Please switch to a town with a hideout.');
			}
		}
		
		FarmList.addPlayer(playerId,playerName,alliance,playerStatus);
		FarmList.addIsland(islandId,islandName,islandX,islandY,tradeGood);
		FarmList.addTarget(targetId,targetName,playerId,islandId,hallLevel);
		FarmList.draw();
	},
	addActionButton:function(cityLocation){
		//Get city data
		var targetId=FarmList.getCityId(cityLocation);
		var target=FarmList.getTarget(targetId);
		
		//Create the button elements		
		var span=document.createElement('span');span.className='textLabel';
		var a=document.createElement('a');a.appendChild(span);
		var li=document.createElement('li');li.appendChild(a);
		
		//Remove any existing buttons
		$('#FarmList_removeTargetButton').remove();
		$('#FarmList_addTargetButton').remove();
		
		if(!target){
			li.id='FarmList_addTargetButton';
			span.innerHTML='Add Target';
			a.title='Add to target list';
			$(a).click(function(){
				FarmList.parseCityLocation(cityLocation);
				FarmList.addActionButton(cityLocation);
			});
		}else if(target.ignored){
			li.id='FarmList_addTargetButton';
			span.innerHTML='Unignore Target';
			a.title='Remove target from ignore list';
			$(a).click(function(){
				FarmList.unignoreTarget(targetId);
				FarmList.draw();
				FarmList.addActionButton(cityLocation);
			});
		}else{
			li.id='FarmList_removeTargetButton';
			span.innerHTML='Remove Target';
			a.title='Remove from target list';
			$(a).click(function(){
				var target=FarmList.getTarget(targetId);
				if(typeof(target)=='undefined')return;
				var answer=confirm('Remove all data for '+target.name+'?');
				if(answer){
					FarmList.removeTarget(target);
					FarmList.draw();
					FarmList.addActionButton(cityLocation);
				}
			});
		}
		
		//Add the button the the action panel
		$('div#actions ul.cityactions').append(li);
	},
	cityScanHideout:function(city,suppressDraw){
		city=typeof(city)=='object'?city:IkaTools.getCityById(city);
		if(city.type)return;
		var status=FarmList.setStatus('Scanning hideout in '+city.name+'... ');
		var hideout=IkaTools.cityGetBuildingByType('safehouse',city);
		if(!hideout){
			FarmList.setStatus('there is no known hideout!',status,true,5,false);
		}else{
			var url='http://'+document.domain+'/index.php?view=safehouse&id='+city.id+'&position='+hideout.position;
			IkaTools.getRemoteDocument(url,function(doc){
				FarmList.views.safehouse(doc);
				if(!suppressDraw)FarmList.draw();
				FarmList.setStatus('done!',status,true,3,true);
			});
		}
	},
	addTargetById:function(targetId,callback){
        if(targetId in FarmList.yourCities)return;
		var status=FarmList.setStatus('Adding '+targetId+' as target... ');
		var url='http://'+document.domain+'/index.php?view=island&cityId='+targetId;
		IkaTools.getRemoteDocument(url,function(doc){
			var jq=$('a#city_'+targetId,doc);
			if(jq.length==1){
				FarmList.parseCityLocation(jq[0].parentNode,doc);
				FarmList.setStatus('done!',status,true,3,true);
				if(typeof(callback)=='function')
					callback(targetId);
			}
			else{
				FarmList.setStatus('target not found!',status,true,5,false);
			}
		});
	},
	targetGetMilitaryHTML:function(target){
		var target=FarmList.getTarget(target);if(!target)return;
		if(target.troops){
			return (target.troopsUpdated?'<p>Checked '+FarmList.formatMillisecondsElapsed(FarmList.serverTime.getTime()-target.troopsUpdated.getTime(),false)+' ago<br/><br/></p>':'')+target.troops;
		}else{
			return '<p>Unknown</p>';
		}
	},
	targetGetDataHTML:function(target){
		var target=FarmList.getTarget(target);if(!target)return;
		var player=FarmList.getPlayer(target.playerId);if(!player)return;
		var html=[];
		
		html.push('<div class="contentBox01h"><h3 class="header">Target Data</h3><div class="content"><table class="targetData"><tbody>');
		html.push('<tr><th>Name:</th><td class="target">'+target.name+'</td></tr>');
		html.push('<tr><th>Player:</th><td class="player">'+FarmList.targetGetPlayerName(target)+' ('+player.scores.military.score+' generals scrore, checked '+FarmList.formatMillisecondsElapsed(FarmList.serverTime.getTime()-player.scores.military.updated.getTime(),false)+' ago)</td></tr>');
		html.push('<tr><th>Resources:</th><td class="resources">'+FarmList.getResourceHTML(target)+'</td></tr>');
		html.push('<tr><th>Recent Combats:</th><td class="combats">'+FarmList.targetGetCombatsHTML(target)+'</td></tr>');
		html.push('<tr><th>Military:</th><td class="military">'+FarmList.targetGetMilitaryHTML(target)+'</td></tr>');
		html.push('</tbody></table></div><div class="footer"/>');
		
		return html.join('');
	},
	targetGetPlayerName:function(target){
		var target=FarmList.getTarget(target);if(!target)return;
		var player=FarmList.getPlayer(target.playerId);if(!player)return;
		return '<a class="playerStatus '+player.status+'" title="View Score ('+player.name+' is '+(player.status=='vacation'?'on ':'')+player.status+')" href="?view=highscore&searchUser='+player.name+'">'+player.name+'</a>'+(player.allianceId?'</span> [<a title="View Alliance ('+player.alliance+')" href="?view=allyPage&allyId='+player.allianceId+'">'+player.alliance+'</a>]':'')
	},
	refreshActionButton:function(){
		var $selected=$('#cities .city.selected:first');
		if($selected.length){
			var city=IkaTools.getCityById(FarmList.getCityId($selected[0]));
			if(!city||city.type)
				FarmList.addActionButton($selected[0]);
		}
	},
	views:{
		island:function(){
			//Add a button to the action panel when a city is selected, as long as it's not one of yours
			$('#cities>.city').each(function(){
				var id=FarmList.getCityId(this);
				var city=IkaTools.getCityById(id);
				if(!city||city.type){
					$(this).click(function(){
						FarmList.addActionButton(this);
					});
				}
				if(IkaTools.getVal('FarmList.options.showSpyIndicators')==true&&$('.cityinfo .spy',this).length){
					$('a:first span .after',this).append('<img class="spyIndicator" src="'+FarmList.icons.spy+'" title="You have a spy in this city">');
				}
				//Show recent combats here -- has display issues, so disabled for now
				/*var target=FarmList.getTarget(id);
				if(target){
					$('a:first',this).addClass('FL_tooltipAnchor');
					$('a:first',this).append(FarmList.createTooltip(FarmList.targetGetCombatsHTML(target)));
				}*/
			});
			FarmList.refreshActionButton();
		},
		safehouse:function(doc){
			if(!doc)doc=document;
			
			var cityId=$('#changeCityForm input[name="id"]',doc).attr('value');
			var city=IkaTools.getCityById(cityId);
			var m=$('#reportInboxLeft .content',doc).html().match(/(\d+)/g);
			city.spiesUntrained=m[1];
			city.spiesDefending=m[2];
			city.spiesAbroad=m[3];
			IkaTools.saveCities();

			//Loop through all spies and add those that are awaiting orders
			var spyIds=[];
			$('#mainview .spyinfo',doc).each(function(){
				var jq=$('.missionButton a:first',this);
				if(jq.length>0){
					var spyId=jq.attr('href').match(/spy=(\d+)/i)[1];
					var targetId=$('.city a:first',this).attr('href').match(/id=(\d+)/i)[1];
					FarmList.addSpy(spyId,targetId,cityId);
					spyIds.push(spyId);
				}
			});
			
			//Remove any spies that no longer exist
			var removeSpies=[];
			for(var i in FarmList.spies.keys){
				var spy=FarmList.spies[FarmList.spies.keys[i]];
				if(spy.cityId==cityId){
					if(spyIds.indexOf(spy.id)<0)
						removeSpies.push(spy);
				}
			}
			for(var i in removeSpies)
				FarmList.removeSpy(removeSpies[i]);
			
			//Add untracked targets for spies
			var doneTargets=[];
			for(var i in spyIds){
				var targetId=FarmList.spies[spyIds[i]].targetId;
				if(!(targetId in FarmList.targets)&&doneTargets.indexOf(targetId)<0){
					FarmList.addTargetById(targetId,function(targetId){
						FarmList.targetRefreshData(targetId);
					});
					doneTargets.push(targetId);
				}
			}
		},
		blockade:function(){
			var targetId=$('#cityNav #changeCityForm input[name="destinationCityId"]').attr('value');
			var target=FarmList.getTarget(targetId);if(!target)return;
			var $notices=$('#mainview #notices');
			$notices.append(FarmList.targetGetDataHTML(target));
		},
		plunder:function(){
			var targetId=$('#cityNav #changeCityForm input[name="destinationCityId"]').attr('value');
			var target=FarmList.getTarget(targetId);if(!target)return;
			
			var freeShips=$('#globalResources .transporters a:first').contents()[1].innerHTML.match(/(\d+) \(/)[1];
			
			//Hide the form until target data is refreshed
			var $notices=$('#mainview #notices');
			var divLoading=document.createElement('div');
			divLoading.innerHTML='<div class="center"><p>Loading target data, please wait...<br/><br/></p></div>';
			$notices.append(divLoading);
			var $form=$('#mainview #plunderForm');
			$form.hide();
			
			var player=FarmList.getPlayer(target.playerId);
			FarmList.targetRefreshData(target,true,function(){
				$(divLoading).remove();
				$form.show();
				$notices.append(FarmList.targetGetDataHTML(target));
					
				//Set required ships
				var ships=FarmList.getShipsRequired(target);
				if(ships=='?')ships=0;
				var jqShips=$('#extraTransporter',$form);
				jqShips.attr('value',ships);
				
				//Set requried siege units
				var artillery=['mortar','catapult','battering ram'];
				var sufficient=false;
				var problems='';
				for(var i in artillery){
					var unitName=artillery[i];
					var required=FarmList.getArtilleryRequired(target,FarmList.units[unitName]);
					if(sufficient||required==0){
						break;
					}else if(required=='?'){
						problems+=(problems==''?'':'<br/>')+'The level of the city wall is unknown, so make sure you send lots of siege units!';
						break;
					}
					var available=$('.assignUnits li.'+unitName,$form);
					if(available.length>0){
						var amount=$('.amount',available).contents()[1].nodeValue;
						if(required>amount){
							problems+=(problems==''?'':'<br/>')+'Insufficient '+unitName+'s available!';
						}else{
							var jqInput=$('input.textfield',available);
							jqInput.attr('value',required);
							var evt=document.createEvent('KeyEvents');
							evt.initKeyEvent('keyup',true,true,window,false,false,false,false,13,0);
							jqInput[0].dispatchEvent(evt);
							sufficient=true;
						}
					}else{
						if(required=='-')problems+=(problems==''?'':'<br/>')+'The wall is too hard for '+unitName+'s!';
						else problems+=(problems==''?'':'<br/>')+'No '+unitName+'s available!';
					}
				}
				if(problems!='')$notices.append('<div class="warning">'+problems+'</div>');
				
				//Reduce your free ships by the amount used by siege units
				freeShips=freeShips-parseInt($('#mainview #transporterCount').text());
				
				if(ships>freeShips)
					$notices.append('<div class="warning">You do not have sufficient cargo ships available to collect all of the resources at once!<br/>You have '+freeShips+' available to carry resources and non-siege units, but you would need '+ships+' to get them all.</div>');
			});
		},
		//Load data from each new, finished, combat report
		militaryAdvisorCombatReports:function(doc){
			if(!doc)doc=document;
			$('#finishedReports .operations td.subject',doc).each(function(){
				var combatTime=FarmList.parseTimestamp($('.date:first',this.parentNode).text());
				//Only process finished combats that are less than a day old
				if(this.className.match(/running/i)==null&&FarmList.daysApart(FarmList.serverTime,combatTime)<1){
					var jqA=$('a:first',this);
					var combatName=jqA.text().trim();
					var combatId=jqA.attr('href').match(/combatId=(\d+)/i)[1];
					if(!(combatId in FarmList.combats)){
						(function(jqA){
							var status=FarmList.setStatus('Loading '+combatName+'... ');
							var url='http://'+document.domain+'/'+jqA.attr('href');
							IkaTools.getRemoteDocument(url,function(doc){
								FarmList.views.militaryAdvisorReportView(doc);
								FarmList.setStatus('done!',status,true,3,true);
							});
						})(jqA);
					}
				}
			});
		},
		militaryAdvisorReportView:function(doc){
			if(!doc)doc=document;
			
			var report=$('#troopsReport',doc);
			var defender=$('.defender b:first a:first',report);
			
			//Stop if the defending city no longer exists
			if(defender.length<1)
				return;
			
			var targetId=defender.attr('href').match(/cityId=(\d+)/i)[1];
			var header=$('.header',report);
			var result=$('div.result',report);
			var combatId=$('div p.link:first a.button:first',report).attr('href').match(/combatId=(\d+)/i)[1];
			var combatTime=FarmList.parseTimestamp($('.date',header).text());
			var combatName=header.contents()[0].nodeValue.trim();
			
			//Determine the type of combat
			//TODO: Need a way to determine if the combat was for of type "occupy", without using localized strings
			if($('.overview .fleet',report).length>0)
				var combatType='blockade';
			else
				var combatType='pillage';
			
			//Stop if this combat is more than a day old
			if(FarmList.daysApart(FarmList.serverTime,combatTime)>1)
				return;
			
			//If the target's not in the list, add it then return here to continue
			if(!(targetId in FarmList.targets)){
				FarmList.addTargetById(targetId,function(){
					FarmList.views.militaryAdvisorReportView(doc);
				});
				return;
			}
			var target=FarmList.getTarget(targetId);
			
			//If the wall level hasn't been checked recently, go to the detailed view to find it
			if(target.wallUpdated<combatTime&&combatType!='blockade'){
				(function(target){
					var status=FarmList.setStatus('Checking wall level in '+target.name+'... ');
					var jqA=$('.link a.button:first',doc);
					var url='http://'+document.domain+'/'+jqA.attr('href');
					IkaTools.getRemoteDocument(url,function(doc){
						FarmList.views.militaryAdvisorDetailedReportView(doc);
						FarmList.draw();
						FarmList.setStatus('done!',status,true,3,true);
					});
				})(target);
			}
			
			//Stop if this is an ongoing battle
			if(result.length==0)
				return;
			
			//Check if the combat is less than a day old, and track it if we're not already
			if(!(combatId in FarmList.combats)){				
				var combat=FarmList.addCombat(combatId,targetId,combatTime,combatType,combatName);
				combat.resources=$('ul.resources',result).outerHtml();
				FarmList.saveCombats();
			}
			
			if(combatType=='pillage'&&target.resources.updated){
				var jqResources=$('ul.resources li',result);
				if(jqResources.length){
					//Only apply this combat report to the target if it is later than the resources were last updated
					if(combatTime>target.resources.updated){
						jqResources.each(function(){
							var resource=$(this).attr('class').toLowerCase();
							var amount=parseInt($(this).contents()[1].nodeValue);
							target.resources[resource]=Math.max(0,target.resources[resource]-amount);
						});
						target.resources.updated=combatTime;
						target.resources.updateType='pillage';
						FarmList.saveTargets();
					}
				}
			}
		},
		militaryAdvisorDetailedReportView:function(doc){
			if(!doc)doc=document;
			var combatId=$('#mainview #back a',doc).attr('href').match(/combatId=(\d+)/i)[1];
			if(!(combatId in FarmList.combats))
				return;
			var combat=FarmList.combats[combatId];
			var target=FarmList.getTarget(combat.targetId);
			if(target.wallUpdated<combat.time){
				var wallLevel=0;
				//Check if there is a wall
				var jq=$('#fieldDefender .main .s314d:frist',doc);
				if(jq.length>0){
					//The wall level is only shown in tooltips, so we need to check every script block...
					$('script',doc).each(function(){
						var m=$(this).html().match(/wall level: (\d+)/i);
						if(m){
							wallLevel=m[1];
						}
					});
				}
				target.wallLevel=wallLevel;
				target.wallUpdated=combat.time;
				FarmList.saveTargets();
			}
		},
		options:function(){
			//Load current options
			var options={};
			options.showSpyIndicators=IkaTools.getVal('FarmList.options.showSpyIndicators')==true?true:false;
			
			var divContainer=document.createElement('div');
			divContainer.id='FarmList_options';
			divContainer.className='contentBox01h';
			$(divContainer).append('<h3 class="header">FarmList Options</h3>');
			var divContent=document.createElement('div');
			divContent.className='content';
			var table=document.createElement('table');
			
			var tr=document.createElement('tr');
			var th=document.createElement('th');
			th.innerHTML='Show spy indicators on island view:';
			$(tr).append(th);
			var inputSpyIndicators=document.createElement('input');
			inputSpyIndicators.type='checkbox';
			$(inputSpyIndicators).attr('checked',options.showSpyIndicators);
			$(inputSpyIndicators).click(function(){
				options.showSpyIndicators=!options.showSpyIndicators;
				$(this).attr('checked',options.showSpyIndicators);
				IkaTools.setVal('FarmList.options.showSpyIndicators',options.showSpyIndicators);
			});
			var td=document.createElement('td');
			$(td).append(inputSpyIndicators);
			$(tr).append(td);
			$(table).append(tr);
			
			$(divContent).append(table);
			$(divContainer).append(divContent);
			$(divContainer).append('<div class="footer">');
			$('#mainview').append(divContainer);
		},
	},
	setStatus:function(msg,div,append,timeout,success){
		if(!msg)msg='';
		if(!timeout)timeout=0;
		
		var parent=$('#FarmList_status');
		if(parent.length==0){
			parent=document.createElement('div');
			parent.id='FarmList_status';
			$('body').append(parent);
		}else{
			parent=parent[0];
		}
		$(parent).css('top',document.documentElement.scrollTop);
        $(parent).css('left',document.documentElement.scrollLeft);
		
		if(!div){
			var div=document.createElement('div');
			div.className='FarmList_status';
			parent.appendChild(div);
		}
		
		if(msg==''){
			$(div).remove();
		}else{
			if(success==true)
				$(div).addClass('success');
			else if(success==false)
				$(div).addClass('failure');
			
			if(append)
				$(div).append(msg);
			else
				$(div).html(msg);
			
			if(timeout>0){
				window.setTimeout(function(){
					FarmList.setStatus('',div);
				},timeout*1000);
			}
		}
		
		if($('*',parent).length==0)
			$(parent).remove();
		else
			return div;
	},
	playerUpdateMilitaryScore:function(player,callback){
		var url='http://'+document.domain+'/index.php?view=highscore&highscoreType=army_score_main&searchUser='+player.name;
		IkaTools.getRemoteDocument(url,function(doc){
			var jqScore=$('#mainview table.table01 tr td.score',doc);
			var found=false;
			//Loop through each row
			jqScore.each(function(){
				var jqName=$('td.name',this.parentNode);
				if(jqName.length){
					if(jqName.text().trim().replace(/\s/g,' ')==player.name.trim().replace(/\s/g,' ')){
						found=true;
						player.scores.military={
							score:parseInt($(this).text().replace(/\D/,''))
						};
					}
				}
			});
			if(!found){
				player.scores.military={
					score:'?'
				};
			}
			player.scores.military.updated=new Date();
			FarmList.savePlayers();
			if(typeof(callback)=='function')
				callback(player);
		});
	},
};

FarmList.init();