// ==UserScript==
// @name           FarmVille - Time of Harvest
// @namespace      http://sweb.uky.edu/~ganeih2
// @description    This script calculates the remaining time for growth of seeds in FarmVille  on Facebook
// @include        http://apps.facebook.com/onthefarm/index.php*
// ==/UserScript==

var percent = 0;

function _calc(id,hour) {
	var dt = new Date();
	var f = (hour*percent/100);
	var d = Math.floor(f/23);
	var h = Math.floor(f)%23;
	var m = Math.floor((f - Math.floor(f))*60);
	dt.setDate(dt.getDate() + d);
	dt.setHours(dt.getHours() + h);
	dt.setMinutes(dt.getMinutes() + m);
	var c = dt.toLocaleTimeString() + " (" + dt.toDateString() + ")";
	document.getElementById(id).innerHTML = c;
}

function fv_calculate() {
	var p = document.getElementById('fv_percent');
	percent = 100 - parseInt(p.options[p.selectedIndex].value);
	_calc('fv_c2h',2);
	_calc('fv_c4h',4);
	_calc('fv_c6h',6);
	_calc('fv_c8h',8);
	_calc('fv_c10h',10);
	_calc('fv_c12h',12);
	_calc('fv_c16h',16);
	_calc('fv_c1d',23);   //24
	_calc('fv_c2d',46);   //48
	_calc('fv_c3d',69);   //72
	_calc('fv_c4d',92);   //96
	//_calc('fv_c5d',115);  //120
	//_calc('fv_c6d',138);  //144
	//_calc('fv_c7d',161);  //168
	//_calc('fv_c8d',184);  //192
}

// hides and unhides calc div
function setVisible() {
	obj = document.getElementById('calc_win');
	obj.style.visibility = (obj.style.visibility == 'visible') ? 'hidden' : 'visible';
}

var out = '<div id="calc_win" style="visibility:hidden; border: 1px solid rgb(59, 89, 152); padding: 5px 5px 0; background: rgb(241, 241, 241) none repeat scroll 0% 0%; position: absolute; left: 1em; top: 33px; width: 215px;"><h2 style="text-align:center"><b>Schnietronics FarmVille ETH Calculator</b></h2><div style="margin-top:6px;">My crops are: <select id="fv_percent"><option value="0">0 %</option><option value="1">1 %</option><option value="2">2 %</option><option value="3">3 %</option><option value="4">4 %</option><option value="5">5 %</option><option value="6">6 %</option><option value="7">7 %</option><option value="8">8 %</option><option value="9">9 %</option><option value="10">10 %</option><option value="11">11 %</option><option value="12">12 %</option><option value="13">13 %</option><option value="14">14 %</option><option value="15">15 %</option><option value="16">16 %</option><option value="17">17 %</option><option value="18">18 %</option><option value="19">19 %</option><option value="20">20 %</option><option value="21">21 %</option><option value="22">22 %</option><option value="23">23 %</option><option value="24">24 %</option><option value="25">25 %</option><option value="26">26 %</option><option value="27">27 %</option><option value="28">28 %</option><option value="29">29 %</option><option value="30">30 %</option><option value="31">31 %</option><option value="32">32 %</option><option value="33">33 %</option><option value="34">34 %</option><option value="35">35 %</option><option value="36">36 %</option><option value="37">37 %</option><option value="38">38 %</option><option value="39">39 %</option><option value="40">40 %</option><option value="41">41 %</option><option value="42">42 %</option><option value="43">43 %</option><option value="44">44 %</option><option value="45">45 %</option><option value="46">46 %</option><option value="47">47 %</option><option value="48">48 %</option><option value="49">49 %</option><option value="50">50 %</option><option value="51">51 %</option><option value="52">52 %</option><option value="53">53 %</option><option value="54">54 %</option><option value="55">55 %</option><option value="56">56 %</option><option value="57">57 %</option><option value="58">58 %</option><option value="59">59 %</option><option value="60">60 %</option><option value="61">61 %</option><option value="62">62 %</option><option value="63">63 %</option><option value="64">64 %</option><option value="65">65 %</option><option value="66">66 %</option><option value="67">67 %</option><option value="68">68 %</option><option value="69">69 %</option><option value="70">70 %</option><option value="71">71 %</option><option value="72">72 %</option><option value="73">73 %</option><option value="74">74 %</option><option value="75">75 %</option><option value="76">76 %</option><option value="77">77 %</option><option value="78">78 %</option><option value="79">79 %</option><option value="80">80 %</option><option value="81">81 %</option><option value="82">82 %</option><option value="83">83 %</option><option value="84">84 %</option><option value="85">85 %</option><option value="86">86 %</option><option value="87">87 %</option><option value="88">88 %</option><option value="89">89 %</option><option value="90">90 %</option><option value="91">91 %</option><option value="92">92 %</option><option value="93">93 %</option><option value="94">94 %</option><option value="95">95 %</option><option value="96">96 %</option><option value="97">97 %</option><option value="98">98 %</option><option value="99">99 %</option></select> grown</div><p title="Raspberries"><b>2 hours</b>: <span id="fv_c2h"></span></p><p title="Strawberry, Blueberries, Blackberries"><b>4 hours</b>: <span id="fv_c4h"></span></p><p title="Aloe Vera"><b>6 hours</b>: <span id="fv_c6h"></span></p><p title="Pumpkins, Tomatoes, Sugar Cane"><b>8 hours</b>: <span id="fv_c8h"></span></p><p title="Green Tea"><b>10 hours</b>: <span id="fv_c10h"></span></p><p title="Rice, Carrots, Onions"><b>12 hours</b>: <span id="fv_c12h"></span><p title="Coffee, Asparagus"><b>16 hours</b>: <span id="fv_c16h"></span></p></p><p title="Soybeans, Peppers, Grapes, Sunflowers, Peas, Red Tulips, Lillies"><b>1 day</b>: <span id="fv_c1d"></span></p><p title="Eggplant, Squash, Yellow Bell, Pineapples, Cabbage, Broccoli, Daffodils, Pink Roses, Lavender"><b>2 days</b>: <span id="fv_c2d"></span></p><p title="Wheat, Cotton, Potatoes, Corn, Red Wheat"><b>3 days</b>: <span id="fv_c3d"></span></p><p title="Artichokes, Watermelons, Yellow Melon"><b>4 days</b>: <span id="fv_c4d"></span></p></div>';

var head_out = '<div><a id="anchor1" style="text-align:center; width: 50px; color:white; position:absolute; left:1em; top:13px; font-size:11px; text-decoration:none; font-family:lucida grande,tahoma,verdana,arial,sans-serif; font-weight:bold;">FVCalc</a></div>';

document.getElementById('menubar_container').innerHTML = document.getElementById('menubar_container').innerHTML + head_out;
document.getElementById('content').innerHTML = document.getElementById('content').innerHTML + out;
document.getElementById('anchor1').addEventListener('click',setVisible,false);
document.getElementById('fv_percent').addEventListener('change',fv_calculate,false);
fv_calculate();