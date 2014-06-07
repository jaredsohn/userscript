// ==UserScript==
// @name          XKCD color survey tips
// @description    Adds a button to pass on a XKCD color survey page and be given the "correct" answer for the color, which is the closest color (defined by the euclidean distance in L*A*B* color space) found in en.wikipedia.org/wiki/List_of_colors
// @include       http://aram.xkcd.com/color/
// ==/UserScript==

var colormap = {
'5D8AA8':'Air Force blue',
'F0F8FF':'Alice blue',
'E32636':'Alizarin',
'E52B50':'Amaranth',
'CD2682':'Amaranth cerise',
'9F2B68':'Amaranth deep purple',
'ED3CCA':'Amaranth magenta',
'F19CBB':'Amaranth pink',
'AB274F':'Amaranth purple',
'FFBF00':'Amber',
'FF7E00':'Amber (SAE/ECE)',
'FF033E':'American rose',
'9966CC':'Amethyst',
'A4C639':'Android Green',
'F2F3F4':'Anti-flash white',
'915C83':'Antique fuchsia',
'FAEBD7':'Antique white',
'8DB600':'Apple green',
'FBCEB1':'Apricot',
'00FFFF':'Aqua',
'7FFFD4':'Aquamarine',
'4B5320':'Army green',
'3B444B':'Arsenic',
'B2BEB5':'Ash grey',
'87A96B':'Asparagus',
'FF9966':'Atomic tangerine',
'6D351A':'Auburn',
'FDEE00':'Aureolin',
'007FFF':'Azure (color wheel)',
'F0FFFF':'Azure (web) (Azure mist)',
'89CFF0':'Baby blue',
'F4C2C2':'Baby pink',
'848482':'Battleship grey',
'F5F5DC':'Beige',
'3D2B1F':'Bistre',
'FE6F5E':'Bittersweet',
'000000':'Black',
'0000FF':'Blue',
'333399':'Blue (pigment)',
'0247FE':'Blue (RYB)',
'8A2BE2':'Blue-violet',
'79443B':'Bole',
'0095B6':'Bondi blue',
'CC0000':'Boston University Red',
'B5A642':'Brass',
'CB4154':'Brick red',
'1DACD6':'Bright cerulean',
'66FF00':'Bright green',
'BF94E4':'Bright lavender',
'C32148':'Bright maroon',
'FF007F':'Bright pink',
'08E8DE':'Bright turquoise',
'D19FE8':'Bright ube',
'F4BBFF':'Brilliant lavender',
'FF55A3':'Brilliant rose',
'FB607F':'Brink pink',
'004225':'British racing green',
'CD7F32':'Bronze',
'964B00':'Brown (traditional)',
'A52A2A':'Brown (web)',
'F0DC82':'Buff',
'480607':'Bulgarian rose',
'800020':'Burgundy',
'E97451':'Burnt sienna',
'8A3324':'Burnt umber',
'BD33A4':'Byzantine',
'702963':'Byzantium',
'5F9EA0':'Cadet blue',
'006B3C':'Cadmium Green',
'ED872D':'Cadmium Orange',
'E30022':'Cadmium Red',
'FFF600':'Cadmium Yellow',
'99CCCC':'Cambridge Blue',
'C19A6B':'Camel',
'78866B':'Camouflage green',
'FFEF00':'Canary yellow',
'FF0800':'Candy apple red',
'E4717A':'Candy pink',
'00BFFF':'Capri',
'592720':'Caput mortuum',
'C41E3A':'Cardinal',
'960018':'Carmine',
'EB4C42':'Carmine pink',
'FF0038':'Carmine red',
'FFA6C9':'Carnation pink',
'B31B1B':'Carnelian',
'99BADD':'Carolina blue',
'00CC99':'Caribbean green',
'93A2D0':'Ceil',
'ACE1AF':'Celadon',
'4997D0':'Celestial blue',
'DE3163':'Cerise',
'EC3B83':'Cerise pink',
'007BA7':'Cerulean',
'A0785A':'Chamoisee',
'F7E7CE':'Champagne',
'36454F':'Charcoal',
'DFFF00':'Chartreuse (traditional)',
'7FFF00':'Chartreuse (web)',
'FFB7C5':'Cherry blossom pink',
'CD5C5C':'Chestnut',
'7B3F00':'Chocolate',
'FFA700':'Chrome yellow',
'98817B':'Cinereous',
'E34234':'Cinnabar',
'D2691E':'Cinnamon',
'E4D00A':'Citrine',
'FBCCE7':'Classic rose',
'9BDDFF':'Columbia blue',
'002E63':'Cool black',
'8C92AC':'Cool grey',
'B87333':'Copper',
'996666':'Copper rose',
'FF3800':'Coquelicot',
'FF7F50':'Coral',
'F88379':'Coral pink',
'FF4040':'Coral red',
'893F45':'Cordovan',
'FFF8DC':'Cornsilk',
'6495ED':'Cornflower blue',
'FFF8E7':'Cosmic latte',
'FFBCD9':'Cotton candy',
'DC143C':'Crimson',
'BE0032':'Crimson glory',
'00FFFF':'Cyan',
'00B7EB':'Cyan (process)',
'00008B':'Dark blue',
'654321':'Dark brown',
'5D3954':'Dark byzantium',
'A40000':'Dark candy apple red',
'08457E':'Dark cerulean',
'C2B280':'Dark champagne',
'986960':'Dark chestnut',
'CD5B45':'Dark coral',
'008B8B':'Dark cyan',
'536878':'Dark electric blue',
'B8860B':'Dark goldenrod',
'1A2421':'Dark jungle green',
'BDB76B':'Dark khaki',
'483C32':'Dark lava',
'734F96':'Dark lavender',
'8B008B':'Dark magenta',
'003366':'Dark midnight blue',
'FF8C00':'Dark orange',
'E75480':'Dark pink',
'003399':'Dark powder blue',
'872657':'Dark raspberry',
'8B0000':'Dark red',
'E9967A':'Dark salmon',
'560319':'Dark scarlet',
'3C1414':'Dark sienna',
'2F4F4F':'Dark slate gray',
'177245':'Dark spring green',
'918151':'Dark tan',
'FFA812':'Dark tangerine',
'483C32':'Dark taupe',
'CC4E5C':'Dark terra cotta',
'00CED1':'Dark turquoise',
'9400D3':'Dark violet',
'00693E':'Dartmouth green',
'555555':'Davy\'s grey',
'00B7EB':'Deep aqua',
'A9203E':'Deep carmine',
'EF3038':'Deep carmine pink',
'E9692C':'Deep carrot orange',
'DA3287':'Deep cerise',
'FAD6A5':'Deep champagne',
'B94E48':'Deep chestnut',
'C154C1':'Deep fuchsia',
'004B49':'Deep jungle green',
'9955BB':'Deep lilac',
'CD00CC':'Deep magenta',
'FFCBA4':'Deep peach',
'FF1493':'Deep pink',
'FF9933':'Deep saffron',
'00BFFF':'Deep sky blue',
'1560BD':'Denim',
'C19A6B':'Desert',
'EDC9AF':'Desert sand',
'696969':'Dim gray',
'1E90FF':'Dodger blue',
'D71868':'Dogwood Rose',
'967117':'Drab',
'00009C':'Duke blue',
'E1A95F':'Earth yellow',
'C2B280':'Ecru',
'614051':'Eggplant',
'F0EAD6':'Eggshell',
'1034A6':'Egyptian blue',
'7DF9FF':'Electric blue',
'FF003F':'Electric crimson',
'00FFFF':'Electric cyan',
'00FF00':'Electric green',
'6F00FF':'Electric indigo',
'F4BBFF':'Electric lavender',
'CCFF00':'Electric lime',
'BF00FF':'Electric purple',
'3F00FF':'Electric ultramarine',
'8F00FF':'Electric violet',
'50C878':'Emerald',
'96C8A2':'Eton blue',
'C19A6B':'Fallow',
'801818':'Falu red',
'B53389':'Fandango',
'F400A1':'Fashion fuchsia',
'E5AA70':'Fawn',
'4D5D53':'Feldgrau',
'4F7942':'Fern green',
'FF2800':'Ferrari Red',
'6C541E':'Field drab',
'CE2029':'Fire engine red',
'E25822':'Flame',
'FC8EAC':'Flamingo pink',
'F7E98E':'Flavescent',
'EEDC82':'Flax',
'FF004F':'Folly',
'014421':'Forest green (traditional)',
'228B22':'Forest green (web)',
'A67B5B':'French Beige',
'F64A8A':'French Rose',
'FF00FF':'Fuchsia',
'FF77FF':'Fuchsia Pink',
'E48400':'Fulvous',
'E49B0F':'Gamboge',
'6082B6':'Glaucous',
'D4AF37':'Gold (metallic)',
'FFD700':'Gold (web) (Golden)',
'996515':'Golden brown',
'FCC200':'Golden poppy',
'FFDF00':'Golden yellow',
'DAA520':'Goldenrod',
'808080':'Gray',
'465945':'Gray-asparagus',
'00FF00':'Green (color wheel) (X11 green)',
'00A550':'Green (pigment)',
'66B032':'Green (RYB)',
'ADFF2F':'Green-yellow',
'A99A86':'Grullo',
'663854':'Halaya ube',
'3FFF00':'Harlequin',
'C90016':'Harvard crimson',
'DF73FF':'Heliotrope',
'F400A1':'Hollywood cerise',
'F0FFF0':'Honeydew',
'FF1DCE':'Hot magenta',
'FF69B4':'Hot pink',
'355E3B':'Hunter green',
'71A6D2':'Iceberg',
'FCF75E':'Icterine',
'138808':'India green',
'E3A857':'Indian yellow',
'00416A':'Indigo (dye)',
'4B0082':'Indigo (web)',
'002FA7':'International Klein Blue',
'FF4F00':'International orange',
'5A4FCF':'Iris',
'F4F0EC':'Isabelline',
'009000':'Islamic green',
'FFFFF0':'Ivory',
'00A86B':'Jade',
'A50B5E':'Jazzberry jam',
'FADA5E':'Jonquil',
'BDDA57':'June bud',
'29AB87':'Jungle green',
'4CBB17':'Kelly green',
'C3B091':'Khaki (HTML/CSS) (Khaki)',
'F0E68C':'Khaki (X11) (Light khaki)',
'087830':'La Salle Green',
'D6CADD':'Languid lavender',
'CF1020':'Lava',
'B57EDC':'Lavender (floral)',
'E6E6FA':'Lavender (web)',
'CCCCFF':'Lavender blue',
'FFF0F5':'Lavender blush',
'C4C3D0':'Lavender gray',
'9457EB':'Lavender indigo',
'EE82EE':'Lavender magenta',
'E6E6FA':'Lavender mist',
'FBAED2':'Lavender pink',
'967BB6':'Lavender purple',
'FBA0E3':'Lavender rose',
'7CFC00':'Lawn green',
'FFF700':'Lemon',
'FDD5B1':'Light apricot',
'ADD8E6':'Light blue',
'E66771':'Light carmine pink',
'F08080':'Light coral',
'93CCEA':'Light cornflower blue',
'E0FFFF':'Light cyan',
'F984EF':'Light fuchsia pink',
'F0E68C':'Light khaki',
'DCD0FF':'Light mauve',
'FFB6C1':'Light pink',
'20B2AA':'Light sea green',
'FFA07A':'Light salmon',
'FF9999':'Light salmon pink',
'87CEEB':'Light sky blue',
'778899':'Light slate gray',
'E68FAC':'Light Thulian pink',
'FFFFED':'Light yellow',
'C8A2C8':'Lilac',
'BFFF00':'Lime (color wheel)',
'00FF00':'Lime (web) (X11 green)',
'32CD32':'Lime green',
'534B4F':'Liver',
'E62020':'Lust',
'FF00FF':'Magenta',
'CA1F7B':'Magenta (dye)',
'FF0090':'Magenta (process)',
'AAF0D1':'Magic mint',
'F8F4FF':'Magnolia',
'C04000':'Mahogany',
'FBEC5D':'Maize',
'6050DC':'Majorelle Blue',
'0BDA51':'Malachite',
'800000':'Maroon (HTML/CSS)',
'B03060':'Maroon (X11)',
'E0B0FF':'Mauve',
'915F6D':'Mauve taupe',
'73C2FB':'Maya blue',
'66DDAA':'Medium aquamarine',
'E2062C':'Medium candy apple red',
'AF4035':'Medium carmine',
'F3E5AB':'Medium champagne',
'035096':'Medium electric blue',
'1C352D':'Medium jungle green',
'DDA0DD':'Medium lavender magenta',
'0067A5':'Medium Persian blue',
'9370DB':'Medium purple',
'BB3385':'Medium red-violet',
'3CB371':'Medium sea green',
'C9DC87':'Medium spring bud',
'00FA9A':'Medium spring green',
'674C47':'Medium taupe',
'48D1CC':'Medium turquoise',
'191970':'Midnight blue',
'004953':'Midnight green (eagle green)',
'FFC40C':'Mikado yellow',
'98FF98':'Mint green',
'FFE4E1':'Misty rose',
'FAEBD7':'Moccasin',
'967117':'Mode Beige',
'AE0C00':'Mordant red 19',
'ADDFAD':'Moss green',
'997A8D':'Mountbatten pink',
'C54B8C':'Mulberry',
'FFDB58':'Mustard',
'21421E':'Myrtle',
'006633':'MSU Green',
'F6ADC6':'Nadeshiko pink',
'2A8000':'Napier Green',
'FADA5E':'Naples Yellow',
'FFDEAD':'Navajo white',
'FE59C2':'Neon fuchsia',
'CC7722':'Ochre',
'008000':'Office green',
'CFB53B':'Old Gold',
'FDF5E6':'Old Lace',
'796878':'Old lavender',
'673147':'Old mauve',
'C08081':'Old rose',
'808000':'Olive',
'6B8E23':'Olive Drab (web) (Olive Drab #3)',
'3C341F':'Olive Drab #7',
'9AB973':'Olivine',
'0F0F0F':'Onyx',
'B784A7':'Opera mauve',
'FF7F00':'Orange (color wheel)',
'FB9902':'Orange (RYB)',
'FFA500':'Orange (web color)',
'FF9F00':'Orange peel',
'FF4500':'Orange-red',
'990000':'OU Crimson Red',
'DDBEC3':'Pale Amaranth Pink',
'987654':'Pale brown',
'9BC4E2':'Pale cerulean',
'DA8A67':'Pale copper',
'E6BE8A':'Pale gold',
'F984E5':'Pale magenta',
'FADADD':'Pale pink',
'DB7093':'Pale red-violet',
'96DED1':'Pale robin egg blue',
'C9C0BB':'Pale silver',
'ECEBBD':'Pale spring bud',
'BC987E':'Pale taupe',
'273BE2':'Palatinate blue',
'682860':'Palatinate purple',
'78184A':'Pansy purple',
'FFEFD5':'Papaya whip',
'FFD1DC':'Pastel pink',
'40404F':'Payne\'s grey',
'FFE5B4':'Peach',
'FFCC99':'Peach-orange',
'FFDAB9':'Peach puff',
'FADFAD':'Peach-yellow',
'D1E231':'Pear',
'F0EAD6':'Pearl',
'CCCCFF':'Periwinkle',
'1C39BB':'Persian blue',
'00A693':'Persian green',
'32127A':'Persian indigo',
'D99058':'Persian orange',
'CC3333':'Persian red',
'F77FBE':'Persian pink',
'FE28A2':'Persian rose',
'EC5800':'Persimmon',
'FDDDE6':'Piggy pink',
'01796F':'Pine green',
'FFC0CB':'Pink',
'FF9966':'Pink-orange',
'93C572':'Pistachio',
'E5E4E2':'Platinum',
'DDA0DD':'Plum (web)',
'FF5A36':'Portland Orange',
'B0E0E6':'Powder blue (web)',
'D74721':'Princeton Orange',
'003153':'Prussian blue',
'DD00FF':'Psychedelic purple',
'CC8899':'Puce',
'FF7518':'Pumpkin',
'7F007F':'Purple (HTML/CSS)',
'A020F0':'Purple (X11)',
'69359C':'Purple Heart',
'9678B6':'Purple mountain majesty',
'50404D':'Purple taupe',
'FF355E':'Radical Red',
'E30B5C':'Raspberry',
'915F6D':'Raspberry glace',
'E25098':'Raspberry pink',
'B3446C':'Raspberry rose',
'826644':'Raw umber',
'FF33CC':'Razzle dazzle rose',
'E3256B':'Razzmatazz',
'FF0000':'Red',
'ED1C24':'Red (pigment)',
'FE2712':'Red (RYB)',
'C71585':'Red-violet',
'AB4E52':'Redwood',
'004040':'Rich black',
'F1A7FE':'Rich brilliant lavender',
'D70040':'Rich carmine',
'0892D0':'Rich electric blue',
'A76BCF':'Rich lavender',
'B03060':'Rich maroon',
'414833':'Rifle green',
'00CCCC':'Robin egg blue',
'FF007F':'Rose',
'674846':'Rose Ebony',
'B76E79':'Rose Gold',
'E32636':'Rose Madder',
'FF66CC':'Rose pink',
'AA98A9':'Rose quartz',
'905D5D':'Rose taupe',
'AB4E52':'Rose vale',
'65000B':'Rosewood',
'D40000':'Rosso corsa',
'BC8F8F':'Rosy brown',
'0038A8':'Royal azure',
'002366':'Royal blue (traditional)',
'4169E1':'Royal blue (web)',
'CA2C92':'Royal fuchsia',
'6B3FA0':'Royal purple',
'E0115F':'Ruby',
'A81C07':'Rufous',
'80461B':'Russet',
'B7410E':'Rust',
'00563F':'Sacramento State green',
'8B4513':'Saddle brown',
'FF6700':'Safety orange (blaze orange)',
'F4C430':'Saffron',
'23297A':'St. Patrick\'s blue',
'FF8C69':'Salmon',
'FF91A4':'Salmon pink',
'C2B280':'Sand',
'967117':'Sand dune',
'967117':'Sandy taupe',
'92000A':'Sangria',
'507D2A':'Sap green',
'082567':'Sapphire',
'CBA135':'Satin sheen gold',
'FF2000':'Scarlet',
'FFD800':'School bus yellow',
'2E8B57':'Sea green',
'321414':'Seal brown',
'FFF5EE':'Seashell',
'FFBA00':'Selective yellow',
'704214':'Sepia',
'009E60':'Shamrock green',
'FC0FC0':'Shocking pink',
'882D17':'Sienna',
'C0C0C0':'Silver',
'007474':'Skobeloff',
'87CEEB':'Sky blue',
'CF71AF':'Sky magenta',
'708090':'Slate gray',
'003399':'Smalt (Dark powder blue)',
'100C08':'Smoky black',
'FFFAFA':'Snow',
'FEFDFF':'Splashed white',
'A7FC00':'Spring bud',
'00FF7F':'Spring green',
'4682B4':'Steel blue',
'FADA5E':'Stil de grain yellow',
'E4D96F':'Straw',
'FFCC33':'Sunglow',
'FAD6A5':'Sunset',
'D2B48C':'Tan',
'F94D00':'Tangelo',
'F28500':'Tangerine',
'FFCC00':'Tangerine yellow',
'483C32':'Taupe',
'8B8589':'Taupe gray',
'D0F0C0':'Tea green',
'F88379':'Tea rose (orange)',
'F4C2C2':'Tea rose (rose)',
'008080':'Teal',
'367588':'Teal blue',
'CD5700':'Tenné (Tawny)',
'E2725B':'Terra cotta',
'D8BFD8':'Thistle',
'DE6FA1':'Thulian pink',
'0ABAB5':'Tiffany Blue',
'FF6347':'Tomato',
'FD0E35':'Torch red',
'00755E':'Tropical rain forest',
'B57281':'Turkish Rose',
'30D5C8':'Turquoise',
'00FFEF':'Turquoise blue',
'8A496B':'Twilight lavender',
'66023C':'Tyrian purple',
'8878C3':'Ube',
'120A8F':'Ultramarine',
'4166F5':'Ultramarine blue',
'FF6FFF':'Ultra pink',
'635147':'Umber',
'5B92E5':'United Nations blue',
'AE2029':'Upsdell red',
'014421':'UP Forest green',
'7B1113':'UP Maroon',
'C5B358':'Vegas Gold',
'C80815':'Venetian red',
'E34234':'Vermilion',
'8F00FF':'Violet',
'7F00FF':'Violet (color wheel)',
'EE82EE':'Violet (web)',
'8601AF':'Violet (RYB)',
'40826D':'Viridian',
'922724':'Vivid auburn',
'9F1D35':'Vivid burgundy',
'DA1D81':'Vivid cerise',
'9F00FF':'Vivid violet',
'004242':'Warm black',
'645452':'Wenge',
'F5DEB3':'Wheat',
'FFFFFF':'White',
'F5F5F5':'White smoke',
'A2ADD0':'Wild blue yonder',
'C9A0DC':'Wisteria',
'738678':'Xanadu',
'0F4D92':'Yale Blue',
'FFFF00':'Yellow',
'FFEF00':'Yellow (process)',
'FEFE33':'Yellow (RYB)',
'9ACD32':'Yellow-green'
};

function d2h(d) {return d.toString(16);}
function h2d(h) {return parseInt(h,16);}

function trihex2lab(h) {
  var r = h2d(h.substr(0,2));
  var g = h2d(h.substr(2,2));
  var b = h2d(h.substr(4,2));
  return rgbToLAB(r, g, b);
}

function rgbToLAB(redOrig,greenOrig,blueOrig) {
 
  // same values, from 0 to 1
  red = redOrig/255;
  green = greenOrig/255;
  blue = blueOrig/255;
   
  // adjusting values
  if(red>0.04045){
    red = (red+0.055)/1.055;
    red = Math.pow(red,2.4);
  }else{
    red = red/12.92;
  }
  if(green>0.04045){
    green = (green+0.055)/1.055;
    green = Math.pow(green,2.4);     
  }else{
    green = green/12.92;
  }
  if(blue>0.04045){
    blue = (blue+0.055)/1.055;
    blue = Math.pow(blue,2.4);     
  }else{
    blue = blue/12.92;
  }
   
  red = red * 100;
  green = green * 100;
  blue = blue * 100;
   
  // applying the matrix
  var x = red * 0.4124 + green * 0.3576 + blue * 0.1805;
  var y = red * 0.2126 + green * 0.7152 + blue * 0.0722;
  var z = red * 0.0193 + green * 0.1192 + blue * 0.9505;
   
  x = x/95.047;
  y = y/100;
  z = z/108.883;
   
  // adjusting the values
  if(x>0.008856){
    x = Math.pow(x,1/3);
  }
  else{
    x = 7.787*x + 16/116;
  }
  if(y>0.008856){
    y = Math.pow(y,1/3);
  }
  else{
    y = (7.787*y) + (16/116);
  }
  if(z>0.008856){
    z = Math.pow(z,1/3);
  }
  else{
    z = 7.787*z + 16/116;
  }
   
  var l= 116*y -16;
  var a= 500*(x-y);
  var b= 200*(y-z);
  return [l,a,b];
}

function dist(ah,bh) {
  var ad = trihex2lab(ah);
  var bd = trihex2lab(bh);
  return Math.pow(ad[0] - bd[0], 2) +
         Math.pow(ad[1] - bd[1], 2) +
         Math.pow(ad[2] - bd[2], 2);
}

function click() {
  document.bgColor='#'+minHex;
  document.getElementById('input').value = colormap[minHex];
  document.getElementById('input').disabled = true;
  submitButton.disabled = true;
  return false;
}

function reload() {
  window.location.reload();
  document.getElementById('input').value = "";
  document.getElementById('input').disabled = false;
  submitButton.disabled = false;
  return false;
}

var color;
var inputs = document.getElementsByTagName('INPUT');
for (var i=0; i<inputs.length; i++) {
  if (inputs[i].getAttribute('name') == 'color') {
    color = inputs[i].getAttribute('value').substr(1);
  }
  if (inputs[i].value == 'Submit') {
    var submitButton = inputs[i];
  }
}

if (color) {
  var minDistance = Number.MAX_VALUE;
  var minHex = 'FFFFFF';
  for (var c in colormap) {
    var d = dist(color,c);
    if (d < minDistance) {
      minDistance = d;
      minHex = c;
    }
  }
  var a = document.createElement("input");
  a.type = 'button';
  a.value = 'I\'m Feeling Lucky';
  a.addEventListener("click", click, true);
  document.getElementById('color').appendChild(a);

  var b = document.createElement("input");
  b.type = 'button';
  b.value = 'Next Color';
  b.addEventListener("click", reload, true);
  document.getElementById('color').appendChild(b);
}
