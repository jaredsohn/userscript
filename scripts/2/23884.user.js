// ==UserScript==
// @name		Displays Lingr on Full-Screen
// @namespace	http://www.kanasansoft.com/
// @description This script displays the messages of Lingr on full-screen.
// @include		http://www.lingr.com/room/*
// ==/UserScript==

(function(){
	var
	 gEBI				=	function(eid){
		return document.getElementById(eid);
	}
	,map				=	function(fnc,ary){
		for(var i=0;i<ary.length;i++){
			fnc(ary[i]);
		}
	}
	,displayNone		=	function(eid){
		var obj=gEBI(eid);
		if(obj){
			obj.style.display	=	"none";
		}
	}
	,displayMax			=	function(eid){
		var obj=gEBI(eid);
		if(obj){
			obj.style.width		=	"100%";
			obj.style.height	=	"100%";
			obj.style.margin	=	"0px";
			obj.style.padding	=	"0px";
		}
	}
	;
	if(!/fullscreen=true/.test(location.search)){return;}
	map(	displayNone					,
			[	"globalHeader"		,
				"columnB"			,
				"chatFooterWrapper"	,
				"chatFooter"		,
				"footer"			]	);
	map(	displayMax					,
			[	"enter"				,
				"everything"		,
				"ieWrapper"			,
				"columnA"			,
				"messages"			,
				"archives"			]	);
}
)();
