scr_meta=<><![CDATA[
// ==UserScript==
// @name	Monkey Smileys By Madmax Xavier
// @version	2.00
// @author	 Madmax Xavier
// @namespace	M360/OUG13
// @description	Use the animated smileys(for fakku only) in forums. Just click on the smiley to insert. Enjoy...
// @include        http://www.fakku.net/*
// @include        http://www.fakku.net/posting.php*
// @include        http://www.fakku.net/viewonline.php*
// @include        http://www.fakku.net/viewforum.php*

// ==/UserScript==
]]></>;

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	
smileyarr["AddEmoticons12699"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12699.gif";
smileyarr["AddEmoticons12698"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12698.gif";
smileyarr["AddEmoticons12697"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12697.gif";
smileyarr["AddEmoticons12696"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12696.gif";
smileyarr["AddEmoticons12695"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12695.gif";
smileyarr["AddEmoticons12694"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12694.gif";
smileyarr["AddEmoticons12693"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12693.gif";
smileyarr["AddEmoticons12692"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12692.gif";
smileyarr["AddEmoticons12691"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12691.gif";
smileyarr["AddEmoticons12690"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12690.gif";
smileyarr["AddEmoticons1269"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons1269.gif";
smileyarr["AddEmoticons12689"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12689.gif";
smileyarr["AddEmoticons12688"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12688.gif";
smileyarr["AddEmoticons12687"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12687.gif";
smileyarr["AddEmoticons12686"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12686.gif";
smileyarr["AddEmoticons12685"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12685.gif";
smileyarr["AddEmoticons12684"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12684.gif";
smileyarr["AddEmoticons12683"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12683.gif";
smileyarr["AddEmoticons12682"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12682.gif";
smileyarr["AddEmoticons12681"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12681.gif";
smileyarr["AddEmoticons12680"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12680.gif";
smileyarr["AddEmoticons1268"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons1268.gif";
smileyarr["AddEmoticons12679"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12679.gif";
smileyarr["AddEmoticons12678"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12678.gif";
smileyarr["AddEmoticons12677"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12677.gif";
smileyarr["AddEmoticons12676"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12676.gif";
smileyarr["AddEmoticons12675"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12675.gif";
smileyarr["AddEmoticons12674"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12674.gif";
smileyarr["AddEmoticons12673"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12673.gif";
smileyarr["AddEmoticons12672"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12672.gif";
smileyarr["AddEmoticons12671"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12671.gif";
smileyarr["AddEmoticons12670"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12670.gif";
smileyarr["AddEmoticons1267"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons1267.gif";
smileyarr["AddEmoticons12669"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12669.gif";
smileyarr["AddEmoticons12668"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12668.gif";
smileyarr["AddEmoticons12667"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12667.gif";
smileyarr["AddEmoticons12666"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12666.gif";
smileyarr["AddEmoticons12665"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12665.gif";
smileyarr["AddEmoticons12664"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12664.gif";
smileyarr["AddEmoticons12663"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12663.gif";
smileyarr["AddEmoticons12662"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12662.gif";
smileyarr["AddEmoticons12661"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12661.gif";
smileyarr["AddEmoticons12660"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12660.gif";
smileyarr["AddEmoticons1266"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons1266.gif";
smileyarr["AddEmoticons12659"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12659.gif";
smileyarr["AddEmoticons12658"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12658.gif";
smileyarr["AddEmoticons12657"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12657.gif";
smileyarr["AddEmoticons12656"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12656.gif";
smileyarr["AddEmoticons12655"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12655.gif";
smileyarr["AddEmoticons12654"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12654.gif";
smileyarr["AddEmoticons12653"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12653.gif";
smileyarr["AddEmoticons12652"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12652.gif";
smileyarr["AddEmoticons12651"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12651.gif";
smileyarr["AddEmoticons12650"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12650.gif";
smileyarr["AddEmoticons1265"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons1265.gif";
smileyarr["AddEmoticons12649"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12649.gif";
smileyarr["AddEmoticons12648"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12648.gif";
smileyarr["AddEmoticons12647"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12647.gif";
smileyarr["AddEmoticons12646"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12646.gif";
smileyarr["AddEmoticons12645"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12645.gif";
smileyarr["AddEmoticons12644"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12644.gif";
smileyarr["AddEmoticons12643"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12643.gif";
smileyarr["AddEmoticons12642"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12642.gif";
smileyarr["AddEmoticons12641"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12641.gif";
smileyarr["AddEmoticons12640"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12640.gif";
smileyarr["AddEmoticons1264"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons1264.gif";
smileyarr["AddEmoticons12639"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12639.gif";
smileyarr["AddEmoticons12638"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12638.gif";
smileyarr["AddEmoticons12637"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12637.gif";
smileyarr["AddEmoticons12636"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12636.gif";
smileyarr["AddEmoticons12635"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12635.gif";
smileyarr["AddEmoticons12634"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12634.gif";
smileyarr["AddEmoticons12633"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12633.gif";
smileyarr["AddEmoticons12632"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12632.gif";
smileyarr["AddEmoticons12631"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12631.gif";
smileyarr["AddEmoticons12630"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12630.gif";
smileyarr["AddEmoticons1263"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons1263.gif";
smileyarr["AddEmoticons12629"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12629.gif";
smileyarr["AddEmoticons12628"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12628.gif";
smileyarr["AddEmoticons12627"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12627.gif";
smileyarr["AddEmoticons12626"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12626.gif";
smileyarr["AddEmoticons12625"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12625.gif";
smileyarr["AddEmoticons12624"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12624.gif";
smileyarr["AddEmoticons12623"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12623.gif";
smileyarr["AddEmoticons12622"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12622.gif";
smileyarr["AddEmoticons12621"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12621.gif";
smileyarr["AddEmoticons12620"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12620.gif";
smileyarr["AddEmoticons1262"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons1262.gif";
smileyarr["AddEmoticons12619"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12619.gif";
smileyarr["AddEmoticons12618"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12618.gif";
smileyarr["AddEmoticons12617"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12617.gif";
smileyarr["AddEmoticons126164"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126164.gif";
smileyarr["AddEmoticons126163"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126163.gif";
smileyarr["AddEmoticons126162"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126162.gif";
smileyarr["AddEmoticons126161"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126161.gif";
smileyarr["AddEmoticons126160"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126160.gif";
smileyarr["AddEmoticons12616"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12616.gif";
smileyarr["AddEmoticons126159"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126159.gif";
smileyarr["AddEmoticons126158"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126158.gif";
smileyarr["AddEmoticons126157"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126157.gif";
smileyarr["AddEmoticons126156"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126156.gif";
smileyarr["AddEmoticons126155"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126155.gif";
smileyarr["AddEmoticons126154"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126154.gif";
smileyarr["AddEmoticons126153"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126153.gif";
smileyarr["AddEmoticons126152"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126152.gif";
smileyarr["AddEmoticons126151"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126151.gif";
smileyarr["AddEmoticons126150"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126150.gif";
smileyarr["AddEmoticons12615"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12615.gif";
smileyarr["AddEmoticons126149"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126149.gif";
smileyarr["AddEmoticons126148"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126148.gif";
smileyarr["AddEmoticons126147"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126147.gif";
smileyarr["AddEmoticons126146"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126146.gif";
smileyarr["AddEmoticons126145"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126145.gif";
smileyarr["AddEmoticons126144"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126144.gif";
smileyarr["AddEmoticons126143"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126143.gif";
smileyarr["AddEmoticons126142"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126142.gif";
smileyarr["AddEmoticons126141"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126141.gif";
smileyarr["AddEmoticons126140"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126140.gif";
smileyarr["AddEmoticons12614"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12614.gif";
smileyarr["AddEmoticons126139"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126139.gif";
smileyarr["AddEmoticons126138"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126138.gif";
smileyarr["AddEmoticons126137"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126137.gif";
smileyarr["AddEmoticons126136"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126136.gif";
smileyarr["AddEmoticons126135"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126135.gif";
smileyarr["AddEmoticons126134"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126134.gif";
smileyarr["AddEmoticons126133"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126133.gif";
smileyarr["AddEmoticons126132"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126132.gif";
smileyarr["AddEmoticons126131"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126131.gif";
smileyarr["AddEmoticons126130"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126130.gif";
smileyarr["AddEmoticons12613"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12613.gif";
smileyarr["AddEmoticons126129"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126129.gif";
smileyarr["AddEmoticons126128"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126128.gif";
smileyarr["AddEmoticons126127"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126127.gif";
smileyarr["AddEmoticons126126"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126126.gif";
smileyarr["AddEmoticons126125"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126125.gif";
smileyarr["AddEmoticons126124"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126124.gif";
smileyarr["AddEmoticons126123"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126123.gif";
smileyarr["AddEmoticons126122"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126122.gif";
smileyarr["AddEmoticons126121"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126121.gif";
smileyarr["AddEmoticons126120"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126120.gif";
smileyarr["AddEmoticons12612"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12612.gif";
smileyarr["AddEmoticons126119"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126119.gif";
smileyarr["AddEmoticons126118"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126118.gif";
smileyarr["AddEmoticons126117"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126117.gif";
smileyarr["AddEmoticons126116"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126116.gif";
smileyarr["AddEmoticons126115"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126115.gif";
smileyarr["AddEmoticons126114"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126114.gif";
smileyarr["AddEmoticons126113"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126113.gif";
smileyarr["AddEmoticons126112"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126112.gif";
smileyarr["AddEmoticons126111"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126111.gif";
smileyarr["AddEmoticons126110"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126110.gif";
smileyarr["AddEmoticons12611"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12611.gif";
smileyarr["AddEmoticons126109"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126109.gif";
smileyarr["AddEmoticons126108"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126108.gif";
smileyarr["AddEmoticons126107"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126107.gif";
smileyarr["AddEmoticons126106"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126106.gif";
smileyarr["AddEmoticons126105"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126105.gif";
smileyarr["AddEmoticons126104"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126104.gif";
smileyarr["AddEmoticons126103"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126103.gif";
smileyarr["AddEmoticons126102"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126102.gif";
smileyarr["AddEmoticons126101"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126101.gif";
smileyarr["AddEmoticons126100"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons126100.gif";
smileyarr["AddEmoticons12610"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons12610.gif";
smileyarr["AddEmoticons1261"]="http://imadmax.webs.com/GreasemonkeyScript/Monkey-Emoticon/AddEmoticons1261.gif";
	

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

// Auto Updator
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '93222', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();
