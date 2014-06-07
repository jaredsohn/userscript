// ==UserScript==
// @name           Spotweb Categorie addon
// @namespace      torrie
// @description    Spotweb custom categories
// @include        http://*.bornie.nl/spotweb*
// @include        http://www.myspotweb.nl*
// @include        http://myspotweb.nl*
// @include        http://*spotnetonline.nl*
// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

$ = unsafeWindow.$;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



var beeldHTML = '';


var cat = new Array();
var i = 0;
var noporn = ',~cat0_z3';
var porn = ',cat0_z3';
var nl = ',cat0_c1,cat0_c2,cat0_c6,cat0_c11';


if($('.blue').html().indexOf('d26') > 0)
{
 noporn = ',~cat0_d23,~cat0_d24,~cat0_d25,~cat0_d26';
 porn = ',cat0_d23,cat0_d24,cat0_d25,cat0_d26';
}

cat[i++] = ['Compressed', 'cat0_a0,cat0_a1,cat0_a2'];
cat[i++] = ['DVD', 'cat0_a3,cat0_a10'];
cat[i++] = ['Blu-ray', 'cat0_a6'];
cat[i++] = ['HD', 'cat0_a4,cat0_a7,cat0_a8,cat0_a9'];
cat[i++] = ['Boeken', 'cat0_a5'];




var max = i;
for(i = 0; i < max; i++ )
{
	beeldHTML += '<li><a href="?page=index&amp;search[tree]='+ cat[i][1]  + noporn +  '" class="filter ">&nbsp;&nbsp;&nbsp;' + cat[i][0] + '</a></li>';
	beeldHTML += '<li><a href="?page=index&amp;search[tree]='+ cat[i][1]  + nl + noporn + '" class="filter ">&nbsp;&nbsp;&nbsp;' + cat[i][0] + ' NL</a></li>';
}


cat[max++] = ['NL', 'cat0_c1,cat0_c2,cat0_c11'];

beeldHTML +='<li>&nbsp;</li>';

beeldHTML += '<li style ="margin-left: -10px;"><a href="?page=index&amp;search[tree]='+  porn +  '" class="filter ">&nbsp;&nbsp;&nbsp;Porn</a></li>';
for(i = 0; i < max; i++ )
{
	if(cat[i][1].indexOf('z') == -1)
	{
		beeldHTML += '<li><a href="?page=index&amp;search[tree]='+ cat[i][1]  + porn +  '" class="filter ">&nbsp;&nbsp;&nbsp;' + cat[i][0] + ' Porn</a></li>';
	}
}

$('.blue .filterlist').html(beeldHTML);


beeldHTML = "";
max = 0;
cat = new Array();
cat[max++] = ['Windows', 'cat2_a0'];
cat[max++] = ['Mac', 'cat2_a1'];
cat[max++] = ['Linux', 'cat2_a2'];
cat[max++] = ['Playstation', 'cat2_a3'];
cat[max++] = ['Playstation 2', 'cat2_a4'];
cat[max++] = ['Playstation 3', 'cat2_a12'];
cat[max++] = ['PSP', 'cat2_a5'];
cat[max++] = ['Xbox', 'cat2_a6'];
cat[max++] = ['Xbox 360', 'cat2_a7'];
cat[max++] = ['Gameboy Advance', 'cat2_a8'];
cat[max++] = ['Nintendo DS', 'cat2_a10'];
cat[max++] = ['Nintendo 3DS', 'cat2_a16'];
cat[max++] = ['Gamecube', 'cat2_a9'];
cat[max++] = ['Wii', 'cat2_a11'];
cat[max++] = ['Windows Mobile', 'cat2_a13'];
cat[max++] = ['iOS', 'cat2_a14'];
cat[max++] = ['Android', 'cat2_a15'];


for(i = 0; i < max; i++ )
{
	beeldHTML += '<li><a href="?page=index&amp;search[tree]='+ cat[i][1]   +  '" class="filter ">&nbsp;&nbsp;&nbsp;' + cat[i][0] + '</a></li>';
}
$('.green .filterlist').html(beeldHTML);


beeldHTML = "";
max = 0;
cat = new Array();
cat[max++] = ['Windows', 'cat3_a0'];
cat[max++] = ['Mac', 'cat3_a1'];
cat[max++] = ['Linux', 'cat3_a2'];
cat[max++] = ['OS2', 'cat3_a3'];
cat[max++] = ['Windows Mobile', 'cat3_a4'];
cat[max++] = ['Navigatie', 'cat3_a5'];
cat[max++] = ['iOS', 'cat3_a6'];
cat[max++] = ['Android', 'cat3_a7'];


for(i = 0; i < max; i++ )
{
	beeldHTML += '<li><a href="?page=index&amp;search[tree]='+ cat[i][1]   +  '" class="filter ">&nbsp;&nbsp;&nbsp;' + cat[i][0] + '</a></li>';
}
$('.red .filterlist').html(beeldHTML);



addGlobalStyle('#filter {position: relative !important; top 0px !important; }');