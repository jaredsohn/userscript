
// ==UserScript==
// @name         Add message background colors to Campfire Chat
// @namespace    https://weebuild.campfirenow.com
// @include      *.campfirenow.com/room/*
// @author       Kevin Pei
// @description  Add message background colors to Campfire Chat! Now, you're messages can go from that plain white background to anything you want! Has 4 predefined basic colors in a dropdown menu, and you can insert more with hex codes. I would like to thank http://24ways.org/2010/calculating-color-contrast and http://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes for their color management codes.
// @require      http://code.jquery.com/jquery-latest.min.js
// @version      1.3
// ==/UserScript==
function escaperegex(regexescapestring){
    return regexescapestring.replace(/[-[\]{}()*+?.,;&\\^$|#\s]/g, "\\$&")
}
function getColor(hexcolor){
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? '#333' : 'white';
}
function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo ":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};
     return colours[colour.toLowerCase()];
}
var numoftimes = 1;
function addColorsScript(){
    var newregex = new RegExp('{cmessage mcolor="(.*?)"}(.*?){/cmessage}',"i");
    var endregex = new RegExp('{/cmessage}',"i"); 
	$('.text_message').each(function(){
		var link = false;
		var linkstuff = "";
		if($(this).find('.body').find('.body').find('a').length !== 0 && $(this).find('.body').find('.body').find('a').attr('href').indexOf('</cmessage>')!==-1){
			var newhref = $(this).find('.body').find('.body').find('a').attr('href');
			var newtexta = $(this).find('.body').find('.body').find('a').text();
            newhref = newhref.replace('{/cmessage}','');
            newtexta = newtexta.replace('{/cmessage}','');
			linkstuff = newtexta;
			link = newhref;
			$(this).find('.body').find('.body').find('a').attr('href',newhref);
			$(this).find('.body').find('.body').find('a').text(newtexta);
			$(this).find('.body').find('.body').text($(this).find('.body').find('.body').text().substr(0,$(this).find('.body').find('.body').text().length-1));
			$(this).find('.body').find('.body').append('&lt;/cmessage&gt;');
		}
		var newtext = $(this).find('.body').text();
			
		if(newtext.match(newregex)){
			if(newtext.match(/(\r\n|\n|\r)/gm)){
				newtext = newtext.replace(/(\r\n|\n|\r)/gm,"");
			}
			if(newtext.match(newregex)){
				newtext = newtext.replace(newregex,'');	
			}
			if(newtext.match(newregex)){
				var color=$.trim(newtext.replace(newregex,'$1'));
			}
			var tcolor = "#000000";
			if(typeof color!=='undefined'){
				if(color.indexOf('#')==-1){
					color = colourNameToHex(color);
					tcolor = color.replace('#','');
				}else{
					tcolor = color.replace('#','');
				}
				tcolor = getColor(tcolor);
				$(this).find('td').css({'background-color':color,'color':tcolor});
				$(this).find('.body').find('.body').text(newtext.replace(newregex,'$2'));
				if(link!==false){
					var linktext = $(this).find('.body').find('.body').html();
					if(linktext!==null){
					linktext = linktext.replace(linkstuff, '<a href="'+link+'" target="_blank">'+linkstuff+'</a>');
					console.log(linktext);
					$(this).find('.body').find('.body').html(linktext);
					}
				}	
			}
		}
	});
	setTimeout(function(){numoftimes++;addColorsScript();},300);
}

var shiftdown = false;
$(function(){
	$('#input').keydown(function(e){
		if(e.keyCode == 16){
			shiftdown = true;
		}
	}).keyup(function(e){
		if(e.keyCode == 16){
			shiftdown = false;
		}
	});
	addColorsScript();
	$('.participants').after('<div id="campfire_color"><h3>Post Color</h3><div><label for="color_input"><span style="font-size:11px;">Color:  </span></label><input value="Default" type="text" id="color_input" name="color_input"></input><br/><span style="font-size:11px;">Color options:  </span><select id="color_select"><option value="Default">Default</option><option value="#D9E7FB">Blue</option><option value="#FFFFCC">Yellow</option><option value="#FF9696">Red</option><option value="#FFAD77">Orange</option><option value="#BCFFA0">Green</option><option value="#E3A8FF">Purple</option></select></div></div>');
	$('#color_select').change(function(){
		$('#color_input').val($('#color_select option:selected').attr('value'));
	});
	$('#send').mousedown(function(){
		if($.trim($('#color_input').val())!=="Default"&&$.trim($('#color_input').val())!=="Default"&&$.trim($('#input').val())!==""&&$('#input').val().indexOf('\n')==-1){
            $('#input').val('{cmessage mcolor="'+$.trim($('#color_input').val())+'"}'+$('#input').val()+'{/cmessage}');
		}
	});
	$('#input').keydown(function(e){
		if(e.keyCode==13){
		if(!$.trim($('#color_input').val()).match(/default/i)&&$.trim($('#input').val())!==""&&$('#input').val().indexOf('\n')==-1&&shiftdown==false){
            $('#input').val('{cmessage mcolor="'+$.trim($('#color_input').val())+'"}'+$('#input').val()+'{/cmessage}');
		}
		}
	});
});