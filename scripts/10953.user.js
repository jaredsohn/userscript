// ==UserScript==
// @name           Youtube Multi (Watch?) 
// @namespace      userscripts.com/Anarchon
// @description    Mega Youtube Package (Comments next to Video(Optimised), Directors and Promoted Remover , Works with my Download Script!
// @include        http://*youtube.com/watch?*
// ==/UserScript==



//#############################################################################################################################
//##########################################Directors Remover##################################################################
//#############################################################################################################################

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];	
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style); 
}

function delString(input) {
 	 var foo = document.getElementsByTagName('div');
 	 if (!foo) { return; }
 	 for(i=0; i<foo.length; i++){
  	 foo[i].innerHTML = foo[i].innerHTML.replace(input, '');
 	
  	}
  	}
///add css


//addGlobalStyle('footPromoDiv { display: none ! important; }');
addGlobalStyle('.footPromoDiv { display: none ! important; }');
addGlobalStyle('#footPromoDiv { display: none ! important; }');
addGlobalStyle('.marT5 { display: none ! important; }');
//addGlobalStyle('.commentSpamBug { display: none ! important; }');
addGlobalStyle('#highlightBox { display: none ! important; }');
addGlobalStyle('.highlightBox { display: none ! important; }');
delString('Promoted Videos');


 
 



//#############################################################################################################################
//##########################################YouTube comments next to videos####################################################
//#############################################################################################################################

GM_addStyle("#recent_comments, #all_comments { height:180px; overflow-y:auto; margin-bottom:10px; }");

var a = $('aboutVidDiv');
var c = $('recent_comments');
var c2 = $('all_comments');
var d = $('commentsDiv');

if (!c && !c2) return;

a.parentNode.insertBefore((c || c2), a.nextSibling);

d.getElementsByTagName("h2")[0].innerHTML = "Comments â†— and responses â†“";

function $(id) { return document.getElementById(id); }


}