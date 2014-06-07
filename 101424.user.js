// ==UserScript==
// @name           Virtonomica: Контроль запасов месторождения
// @namespace      virtonomica
// @description    Показывает количество ходов, оставшихся до исчерпания запасов месторождения
// @include        http://virtonomic*.*/*/*/unit/view/*
// @exclude        http://virtonomic*.*/*/*/unit/view/*/*
// ==/UserScript==

var run = function() 
{

   	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;


	var zapas; 
	var isMine = 0;
	var dob = 0; // добыча на одного работника
	var dobtot; // добыча всего
	var tech; // установленная техна
	var rab;  // количество работников
	var hard;  // сложность добычи
	var hardk = [1.96, 1.4, 1, 0.714, 0.51 ]; // коэфф в зависимости от сложности
	var days; // дней осталось

	// сперва надо убедиться, что мы на основной странице месторождения
	$( 'img[src*="mine_"]' ).each ( function()
	{
		isMine = 1;
	});
	
	if ( !isMine ) return;

	
	// определить добычу на 1-го работника при первой техне и сложности 3

	$( 'img[src*="diamonds.gif"]' ).each ( function()
	{
		dob = 1;  // алмазы
	});

	$( 'img[src*="gold.gif"]' ).each ( function()
	{
		dob = 4; // золото
	});

	$( 'img[src*="bauxite.gif"]' ).each ( function()
	{
		dob = 20; // бокситы
	});

	$( 'img[src*="mn.gif"]' ).each ( function()
	{
		dob = 40; // марганец
	});


	$( 'img[src*="cr.gif"]' ).each ( function()
	{
		dob = 20; // хром
	});


	$( 'img[src*="ironore.gif"]' ).each ( function()
	{
		dob = 60; // желруда
	});


	$( 'img[src*="silicon.gif"]' ).each ( function()
	{
		dob = 80;  // кремний
	});


	$( 'img[src*="coal.gif"]' ).each ( function()
	{
		dob = 90;  // уголь
	});


	$( 'img[src*="oil.gif"]' ).each ( function()
	{
		dob = 100;  // нефть
	});

	$( 'img[src*="minerals.gif"]' ).each ( function()
	{
		dob = 200;  // минералы
	});


	$( 'img[src*="clay.gif"]' ).each ( function()
	{
		dob = 250;  // глина
	});


	if ( !dob ) return;  // неизвестный тип месторождения


	// информация о месторождении

	var cells = $( 'table.infoblock td' );

	var s = cells[2].innerHTML.replace( ' ', '', 'g' );

	// для хрома
	s = s.replace( ' ', '' ).replace( ' ', '' ).replace( ' ', '');

	zapas = parseInt( s );

	hard = parseInt( cells[7].innerHTML );
	tech = parseInt( cells[13].innerHTML );
	rab = parseInt( cells[34].innerHTML.replace( ' ', '' ) );
	
	dobtot = Math.pow( 1.05, tech-1 ) * dob * hardk[hard-1] * rab;

	if ( dobtot > 0 )
	{
		days = Math.floor( zapas/dobtot );
		cells[0].innerHTML =  cells[0].innerHTML + '<br />Ходов осталось: <font color="red">' + days.toString() + '</font>';
	}

}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);