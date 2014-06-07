// ==UserScript==
// @author	  Paul Downey http://blog.whatfettle.com
// @name          Colorfield Namer
// @description	  Adds colour bands to rgb tagged colorfield photos
// @namespace     http://whatfettle.com/GreaseMonkey/ColorfieldNamer
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @version 0.1
// ==/UserScript==

// Tested with:
//    Firefox 1.5.1, GM 0.6.4 OSX
//    Firefox 1.0.7, GM 0.5.3 Windows XP
//
// Version History:

function decode_color(color)
{
    var r = '0x' + color.substring(0,2);
    var g = '0x' + color.substring(2,4);
    var b = '0x' + color.substring(4,6);

    return [1*r, 1*g, 1*b];
}

function euclidean(color1, color2)
{
    var dist = 0;
    for (var i = 0; i < 3; i++)
    {
	var l = color1[i] - color2[i];
	dist += l*l;
    }
    return dist;
}

function find_nearest(color, colors)
{
    var rgb = decode_color(color);
    var min_dist = 256*256*3;
    var nearest = "";

    for (var color1 in colors)
    {
	var rgb1 = decode_color(color1);
	var dist = euclidean(rgb, rgb1);
	if (dist < min_dist)
	{
	    min_dist = dist;
	    nearest = color1;
	}
    }
    return nearest;
}
    
function colorName(color)
{
    var colorNames = new Array()
    colorNames['000000'] = 'Black';
    colorNames['000080'] = 'Navy';
    colorNames['00008B'] = 'DarkBlue';
    colorNames['0000CD'] = 'MediumBlue';
    colorNames['0000FF'] = 'Blue';
    colorNames['003153'] = 'PrussianBlue';
    colorNames['003366'] = 'MidnightBlue';
    colorNames['003399'] = 'PowderBlue';
    colorNames['0047AB'] = 'Cobalt';
    colorNames['006400'] = 'DarkGreen';
    colorNames['007BA7'] = 'Cerulean';
    colorNames['008000'] = 'Green';
    colorNames['008080'] = 'Teal';
    colorNames['008B8B'] = 'DarkCyan';
    colorNames['0095B6'] = 'BondiBlue';
    colorNames['00A86B'] = 'Jade';
    colorNames['00BFFF'] = 'DeepSkyBlue';
    colorNames['00CCCC'] = 'RobinEggBlue';
    colorNames['00CED1'] = 'DarkTurquoise';
    colorNames['00FA9A'] = 'MediumSpringGreen';
    colorNames['00FF00'] = 'Lime';
    colorNames['00FF7F'] = 'SpringGreen';
    colorNames['00FFFF'] = 'Aqua';
    colorNames['013220'] = 'DarkGreen';
    colorNames['01796F'] = 'PineGreen';
    colorNames['03C03C'] = 'DarkPastelGreen';
    colorNames['082567'] = 'Sapphire';
    colorNames['08457E'] = 'DarkCerulean';
    colorNames['08E8DE'] = 'BrightTurquoise';
    colorNames['0BDA51'] = 'Malachite';
    colorNames['116062'] = 'DarkTurquoise';
    colorNames['120A8F'] = 'Ultramarine';
    colorNames['1560BD'] = 'Denim';
    colorNames['177245'] = 'DarkSpringGreen';
    colorNames['191970'] = 'MidnightBlue';
    colorNames['1E90FF'] = 'DodgerBlue';
    colorNames['20B2AA'] = 'LightSeaGreen';
    colorNames['228B22'] = 'ForestGreen';
    colorNames['2A52BE'] = 'CeruleanBlue';
    colorNames['2E8B57'] = 'SeaGreen';
    colorNames['2F4F4F'] = 'DarkSlateGray DarkSlateGrey';
    colorNames['310062'] = 'DarkIndigo';
    colorNames['32CD32'] = 'LimeGreen';
    colorNames['3A75C4'] = 'KleinBlue';
    colorNames['3CB371'] = 'MediumSeaGreen';
    colorNames['3D2B1F'] = 'Bistre';
    colorNames['40826D'] = 'Viridian';
    colorNames['40E0D0'] = 'Turquoise';
    colorNames['4169E1'] = 'RoyalBlue';
    colorNames['423189'] = 'DarkViolet';
    colorNames['465945'] = 'GrayAsparagus GreyAsparagus';
    colorNames['4682B4'] = 'SteelBlue';
    colorNames['483D8B'] = 'DarkSlateBlue';
    colorNames['48D1CC'] = 'MediumTurquoise';
    colorNames['4B0082'] = 'Indigo';
    colorNames['4F7942'] = 'FernGreen';
    colorNames['50C878'] = 'Emerald';
    colorNames['556832'] = 'DarkOlive';
    colorNames['556B2F'] = 'DarkOliveGreen';
    colorNames['560319'] = 'DarkScarlet';
    colorNames['5F9EA0'] = 'CadetBlue';
    colorNames['6495ED'] = 'CornflowerBlue';
    colorNames['654321'] = 'DarkBrown';
    colorNames['6600FF'] = 'PersianBlue';
    colorNames['66CDAA'] = 'MediumAquaMarine';
    colorNames['66FF00'] = 'BrightGreen';
    colorNames['696969'] = 'DimGray DimGrey';
    colorNames['6A5ACD'] = 'SlateBlue';
    colorNames['6B8E23'] = 'OliveDrab';
    colorNames['704214'] = 'Sepia';
    colorNames['708090'] = 'SlateGray SlateGrey';
    colorNames['734A12'] = 'RawUmber';
    colorNames['755A57'] = 'Russet';
    colorNames['778899'] = 'LightSlateGray LightSlateGrey';
    colorNames['77DD77'] = 'PastelGreen';
    colorNames['78866B'] = 'CamouflageGreen';
    colorNames['7B3F00'] = 'Cinnamon';
    colorNames['7B68EE'] = 'MediumSlateBlue';
    colorNames['7BA05B'] = 'Asparagus';
    colorNames['7CFC00'] = 'LawnGreen';
    colorNames['7FFF00'] = 'Chartreuse';
    colorNames['7FFFD4'] = 'Aquamarine';
    colorNames['800000'] = 'Maroon';
    colorNames['800080'] = 'Purple';
    colorNames['808000'] = 'Olive';
    colorNames['808080'] = 'Gray Grey';
    colorNames['8470FF'] = 'LightSlateBlue';
    colorNames['87CEEB'] = 'SkyBlue';
    colorNames['87CEFA'] = 'LightSkyBlue';
    colorNames['8A2BE2'] = 'BlueViolet';
    colorNames['8A3324'] = 'BurntUmber';
    colorNames['8B0000'] = 'DarkRed';
    colorNames['8B008B'] = 'DarkMagenta';
    colorNames['8B4513'] = 'SaddleBrown';
    colorNames['8FBC8F'] = 'DarkSeaGreen';
    colorNames['90EE90'] = 'LightGreen';
    colorNames['918151'] = 'DarkTan';
    colorNames['92000A'] = 'Sangria';
    colorNames['9370D8'] = 'MediumPurple';
    colorNames['9400D3'] = 'DarkViolet';
    colorNames['960018'] = 'Carmine';
    colorNames['986960'] = 'DarkChestnut';
    colorNames['987654'] = 'PaleBrown';
    colorNames['98FB98'] = 'PaleGreen';
    colorNames['98FF98'] = 'MintGreen';
    colorNames['990066'] = 'Eggplant';
    colorNames['991199'] = 'VioletEggplant';
    colorNames['9932CC'] = 'DarkOrchid';
    colorNames['993366'] = 'Mauve';
    colorNames['996666'] = 'PaleMauve';
    colorNames['9966CC'] = 'Amethyst';
    colorNames['997A8D'] = 'MountbattenPink';
    colorNames['9ACD32'] = 'YellowGreen';
    colorNames['A0522D'] = 'Sienna';
    colorNames['A52A2A'] = 'Brown';
    colorNames['A9A9A9'] = 'DarkGray DarkGrey';
    colorNames['ABCDEF'] = 'PaleCornflowerBlue';
    colorNames['ACB78E'] = 'SwampGreen';
    colorNames['ACE1AF'] = 'Celadon';
    colorNames['ADD8E6'] = 'LightBlue';
    colorNames['ADDFAD'] = 'MossGreen';
    colorNames['ADFF2F'] = 'GreenYellow';
    colorNames['AF4035'] = 'PaleCarmine';
    colorNames['AFEEEE'] = 'PaleBlue';
    colorNames['B0C4DE'] = 'LightSteelBlue';
    colorNames['B0E0E6'] = 'PowderBlue';
    colorNames['B22222'] = 'FireBrick';
    colorNames['B5A642'] = 'Brass';
    colorNames['B7410E'] = 'Rust';
    colorNames['B87333'] = 'Copper';
    colorNames['B8860B'] = 'DarkGoldenrod';
    colorNames['BA55D3'] = 'MediumOrchid';
    colorNames['BADBAD'] = 'DarkTeaGreen';
    colorNames['BC8F8F'] = 'RosyBrown';
    colorNames['BDB76B'] = 'DarkKhaki';
    colorNames['C0C0C0'] = 'Silver';
    colorNames['C41E3A'] = 'Cardinal';
    colorNames['C71585'] = 'MediumVioletRed';
    colorNames['C8A2C8'] = 'Lilac';
    colorNames['C9A0DC'] = 'Wisteria';
    colorNames['CADABA'] = 'GrayTeaGreen GreyTeaGreen';
    colorNames['CC5500'] = 'BurntOrange';
    colorNames['CC7722'] = 'Ochre';
    colorNames['CC8899'] = 'Puce';
    colorNames['CCCCFF'] = 'Periwinkle';
    colorNames['CD00CD'] = 'BrightViolet';
    colorNames['CD5700'] = 'Tenne';
    colorNames['CD5B45'] = 'DarkCoral';
    colorNames['CD5C5C'] = 'Chestnut';
    colorNames['CD7F32'] = 'Bronze';
    colorNames['CD853F'] = 'LightBrown';
    colorNames['CFB53B'] = 'OldGold';
    colorNames['D02090'] = 'VioletRed';
    colorNames['D0F0C0'] = 'TeaGreen';
    colorNames['D19275'] = 'Feldspar';
    colorNames['D1E231'] = 'Pear';
    colorNames['D2691E'] = 'Chocolate';
    colorNames['D2B48C'] = 'Tan';
    colorNames['D3D3D3'] = 'LightGrey';
    colorNames['D87093'] = 'PaleVioletRed';
    colorNames['D8BFD8'] = 'Thistle';
    colorNames['DA70D6'] = 'Orchid';
    colorNames['DAA520'] = 'Goldenrod';
    colorNames['DABDAB'] = 'PaleSandyBrown';
    colorNames['DB7093'] = 'PaleRedViolet';
    colorNames['DC143C'] = 'Crimson';
    colorNames['DCDCDC'] = 'Gainsboro';
    colorNames['DDA0DD'] = 'Plum';
    colorNames['DDADAF'] = 'PaleChestnut';
    colorNames['DE3163'] = 'Cerise';
    colorNames['DEB887'] = 'BurlyWood';
    colorNames['DF73FF'] = 'Heliotrope';
    colorNames['E0FFFF'] = 'LightCyan';
    colorNames['E32636'] = 'AlizarinCrimson';
    colorNames['E49B0F'] = 'Gamboge';
    colorNames['E6E6FA'] = 'Lavender';
    colorNames['E75480'] = 'DarkPink';
    colorNames['E97451'] = 'BurntSienna';
    colorNames['E9967A'] = 'DarkSalmon';
    colorNames['EBC2AF'] = 'Zinnwaldite';
    colorNames['ED9121'] = 'Carrot';
    colorNames['EE82EE'] = 'Violet';
    colorNames['EEDC82'] = 'Flax';
    colorNames['EEE8AA'] = 'PaleGoldenrod';
    colorNames['F08080'] = 'LightCoral';
    colorNames['F0DC82'] = 'Buff';
    colorNames['F0E68C'] = 'Khaki';
    colorNames['F0F8FF'] = 'AliceBlue';
    colorNames['F0FFF0'] = 'HoneyDew';
    colorNames['F0FFFF'] = 'Azure';
    colorNames['F4A460'] = 'SandyBrown';
    colorNames['F4C430'] = 'Saffron';
    colorNames['F5DEB3'] = 'Wheat';
    colorNames['F5F5DC'] = 'Beige';
    colorNames['F5F5F5'] = 'WhiteSmoke';
    colorNames['F5FFFA'] = 'MintCream';
    colorNames['F8F8FF'] = 'GhostWhite';
    colorNames['F984E5'] = 'PaleMagenta';
    colorNames['FA8072'] = 'Salmon';
    colorNames['FADADD'] = 'PalePink';
    colorNames['FADFAD'] = 'PeachYellow';
    colorNames['FAEBD7'] = 'AntiqueWhite';
    colorNames['FAF0E6'] = 'Linen';
    colorNames['FAFAD2'] = 'LightGoldenrodYellow';
    colorNames['FBEC5D'] = 'Corn';
    colorNames['FC0FC0'] = 'HotPink';
    colorNames['FDE910'] = 'Lemon';
    colorNames['FDF5E6'] = 'OldLace';
    colorNames['FF0000'] = 'Red';
    colorNames['FF00FF'] = 'Magenta';
    colorNames['FF1493'] = 'DeepPink';
    colorNames['FF2400'] = 'Scarlet';
    colorNames['FF4500'] = 'OrangeRed';
    colorNames['FF4D00'] = 'Vermilion';
    colorNames['FF4F00'] = 'SafetyOrange';
    colorNames['FF6347'] = 'Tomato';
    colorNames['FF69B4'] = 'HotPink';
    colorNames['FF7518'] = 'Pumpkin';
    colorNames['FF7F50'] = 'Coral';
    colorNames['FF8C00'] = 'Darkorange';
    colorNames['FF9900'] = 'BlazeOrange';
    colorNames['FF9966'] = 'PinkOrange';
    colorNames['FFA07A'] = 'LightSalmon';
    colorNames['FFA500'] = 'Orange';
    colorNames['FFA812'] = 'DarkTangerine';
    colorNames['FFB6C1'] = 'LightPink';
    colorNames['FFBA00'] = 'SelectiveYellow';
    colorNames['FFBF00'] = 'Amber';
    colorNames['FFC0CB'] = 'Pink';
    colorNames['FFCC00'] = 'Tangerine';
    colorNames['FFCC99'] = 'PeachOrange';
    colorNames['FFD1DC'] = 'PastelPink';
    colorNames['FFD700'] = 'Gold';
    colorNames['FFD800'] = 'SchoolBusYellow';
    colorNames['FFDAB9'] = 'PeachPuff';
    colorNames['FFDB58'] = 'Mustard';
    colorNames['FFDEAD'] = 'NavajoWhite';
    colorNames['FFE4B5'] = 'Moccasin';
    colorNames['FFE4C4'] = 'Bisque';
    colorNames['FFE4E1'] = 'MistyRose';
    colorNames['FFE5B4'] = 'Peach';
    colorNames['FFEBCD'] = 'BlanchedAlmond';
    colorNames['FFEFD5'] = 'PapayaWhip';
    colorNames['FFF0F5'] = 'LavenderBlush';
    colorNames['FFF5EE'] = 'SeaShell';
    colorNames['FFF8DC'] = 'Cornsilk';
    colorNames['FFFACD'] = 'LemonCream';
    colorNames['FFFAF0'] = 'FloralWhite';
    colorNames['FFFAFA'] = 'Snow';
    colorNames['FFFDD0'] = 'Cream';
    colorNames['FFFF00'] = 'Yellow';
    colorNames['FFFFE0'] = 'LightYellow';
    colorNames['FFFFF0'] = 'Ivory';
    colorNames['FFFFFF'] = 'White';

    var nearest = find_nearest(color, colorNames);
    return {rgb : nearest, name : colorNames[nearest]};
}

(function()
{
    colortagged = 0;
    var rgb_avg = 'FFFFFF';
    var rgb_med = 'FFFFFF';
    var rgb_name = 'FFFFFF';
    var node;

    var w = (unsafeWindow) ? unsafeWindow : window;
    global_photos = w.global_photos;

    for (var i in global_photos) 
    {
	var n = document.getElementById('photoImgDiv'+i);

	if (!n) 
	    continue;

	node = n;
        id = i;

	photo = global_photos[id];

	while (photo.tags_rawA && photo.tags_rawA.length > 0) 
	{
	    tag = photo.tags_rawA.pop();
	    splits = tag.split('=')
	    if (splits[0] == 'color:rgb_avg') 
	    {
		rgb_avg = splits[1];
		colortagged = 1;
	    }
	    if (splits[0] == 'color:rgb_med') 
	    {
		rgb_med = splits[1];
		colortagged = 1;
	    }
	}
    }

    if (colortagged)
    {
        name = colorName(rgb_avg);

	var f = decode_color(name.rgb);
        var fg = (f[0] < 0x80 || f[1] < 0x80 || f[2] < 0x80) ? '#FFFFFF': '#000000';

	table = document.createElement("table");
	table.width = '100%';
        table.style.color = fg;

	table.innerHTML = 
	    "<tr>"
		+ "<td valign='top' align='center' width='33%' bgcolor='#" + rgb_avg + "'>Average (" + rgb_avg + ")</td>"
		+ "<td valign='top' align='center' width='33%' bgcolor='#" + rgb_avg + "'>Median (" + rgb_med + ")</td>"
		+ "<td valign='top' align='center' width='33%' bgcolor='#" + name.rgb + "'>" + name.name + " (" + name.rgb + ")"
		    + "<br/><a style='color:"+fg+"' class='pale' href='javascript:void(0)' id='click_to_add_name_tags'>add name tags</a>"
	    + "</tr>";

	node.appendChild(table);

	var elmLink = document.getElementById('click_to_add_name_tags');

	add_name_tags = function() 
	{ 
	    unsafeWindow.tagrs_addTag(id, 'color:rgb_name='+name.rgb);

	    var tags = name.name.split(" ");
	    for (var i = 0; i < tags.length; i++)
	    {
		unsafeWindow.tagrs_addTag(id, tags[i]);
	    }
	};

	elmLink.addEventListener("click", add_name_tags, true);
    }
})();
