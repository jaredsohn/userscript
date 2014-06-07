// ==UserScript==
// @name           Esperanto Supersignoj
// @copyright      Jakob V. <jakov@gmx.at>
// @license        Creative Commons Attribution 3.0 Unported (CC BY 3.0) http://creativecommons.org/licenses/by/3.0/
// @namespace      http://userscripts.org/users/61020
// @description    Tajpu x post c,g,h,j,s,u por aldoni chapelon (aux tajpu ^ antaux c,g,h,j,s,u)
// @include        *
// @match          *
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(main);

function main(){

	//http://www.jquery4u.com/snippets/6-jquery-cursor-functions/
	jQuery.fn.getSelectionStart = function(){
		if(this.lengh == 0) return -1;
		input = this[0];

		var pos = input.value.length;

		if (input.createTextRange) {
			var r = document.selection.createRange().duplicate();
			r.moveEnd('character', input.value.length);
			if (r.text == '')
			pos = input.value.length;
			pos = input.value.lastIndexOf(r.text);
		} else if(typeof(input.selectionStart)!="undefined")
		pos = input.selectionStart;

		return pos;
	}

	//Example jQuery set text selection function call
	//$("input[name='username']").setSelection(4, 20);

	jQuery.fn.setSelection = function(selectionStart, selectionEnd) {
		if(this.lengh == 0) return this;
		input = this[0];

		if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		} else if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		}

		return this;
	}
	
	//changearray = ['cx','gx'];
	//replacewith = ["\u0109", "\u011D", "\u0124", "\u0134", "\u015C",];
	
	$('input, textarea').keyup(function(e){
		if (e.which == 32 || (65 <= e.which && e.which <= 65 + 25) || (97 <= e.which && e.which <= 97 + 25)) {
			var start = $(this).getSelectionStart();
			
			before = $(this).val().substr(0, start);
			after = $(this).val().substr(start);
			$([
				//\u007E	~
				//\u00C7	Ç
				//\u00E7	ç
				
				[/(c[Xx\^]|\^c)$/g,"\u0109"], [/(C[Xx\^]|\^C)$/g,"\u0108"],
				[/(g[Xx\^]|\^g)$/g,"\u011D"], [/(G[Xx\^]|\^G)$/g,"\u011C"],
				[/(H[Xx\^]|\^H)$/g,"\u0124"], [/(h[Xx\^]|\^h)$/g,"\u0125"],
				[/(J[Xx\^]|\^J)$/g,"\u0134"], [/(j[Xx\^]|\^j)$/g,"\u0135"],
				[/(S[Xx\^]|\^S)$/g,"\u015C"], [/(s[Xx\^]|\^s)$/g,"\u015D"],
				[/(U[Xx\^]|\^W)$/g,"\u016C"], [/(u[Xx\^]|\^w)$/g,"\u016D"],
				                                      
				[/C[\u007E]$/g,"\u00C7"], [/c[\u007E]$/g,"\u00E7"],
				
				[/\u0109x$/g,"cx"], [/\u0109X$/g,"cX"], [/\u0108x$/g,"Cx"], [/\u0108X$/g,"CX"],
				[/\u011Dx$/g,"gx"], [/\u011DX$/g,"gX"], [/\u011Cx$/g,"Gx"], [/\u011CX$/g,"GX"],
				[/\u0125x$/g,"hx"], [/\u0125X$/g,"hX"], [/\u0124x$/g,"Hx"], [/\u0124X$/g,"HX"],
				[/\u0135x$/g,"jx"], [/\u0135X$/g,"jX"], [/\u0134x$/g,"Jx"], [/\u0134X$/g,"JX"],
				[/\u015Dx$/g,"sx"], [/\u015DX$/g,"sX"], [/\u015Cx$/g,"Sx"], [/\u015CX$/g,"SX"],
				[/\u016Dx$/g,"ux"], [/\u016DX$/g,"uX"], [/\u016Cx$/g,"Ux"], [/\u016CX$/g,"UX"]
				
			]).each(function(index, item){
				before = before.replace(item[0], item[1]);
			});
			
			$(this).val(before+after);
			$(this).setSelection(start,start);
		}
		
		//if(e.which==88){
		//	var start = $(this).getSelectionStart();
		//	GM_log(start);
			
		//	signo = $(this).val().substr(start-2, 2);
		//	pos = $.inArray(signo, changearray);
		//	if(pos!=-1){
		//		GM_log(replacewith[pos]);
		//		$(this).val( $(this).val().substr(0, start-2) + replacewith[pos] + $(this).val().substr(start) );
		//		$(this).setSelection(start);
		//	}
		//}
	});
}