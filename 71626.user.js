// ==UserScript==
// @name           Calcolatore Raccolto Farmville
// @description    Calcola il tempo rimanente al raccolto
// @include        http://apps.facebook.com/onthefarm*
// @exclude        http://apps.facebook.com/onthefarm/gift*
// @exclude        http://apps.facebook.com/onthefarm/neig*
// @exclude        http://apps.facebook.com/onthefarm/help*
// @exclude        http://apps.facebook.com/onthefarm/invi*
// @exclude        http://apps.facebook.com/onthefarm/mone*
// @exclude        http://apps.facebook.com/onthefarm/fans*
// @version        1.0.2
// @author         Sisko
// @copyright      Sisko
// @require        http://sizzlemctwizzle.com/updater.php?id=71626
// ==/UserScript==

var versione = '1.0.2';

(function() {
var head = document.getElementsByTagName('head')[0], 
    style = document.createElement('style'), 
    css = '#right_column { width: 77% !important; }' +
          ' .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor' +
          ', div[id^="emu_"], .social_ad, .sponsor, .footer_ad,' +
          ' #home_sponsor, .house_sponsor, #home_sponsor_nile, ' +
          '.PYMK_Reqs_Sidebar, .LSplitPage_Right { display:' +
          ' none !important; } #wallpage { width: 700px !important; }' +
          ' .LSplitView_ContentWithNoLeftColumn, ' +
          '.FN_feedbackview { width: 100% !important; }';
if (!head || self.location != top.location) {return}
style.type = 'text/css';
try {style.innerHTML = css}
catch(x) {style.innerText = css}
head.appendChild(style);
})();
		
var logo= '<img id="hc_icon_here" src=http://img404.imageshack.us/img404/6315/logo3ar.jpg' + ' alt="HC Logo" hspace="0" vspace="0" align="left" border="0">'

Date.prototype.addTime= function(t)
{
this.setTime(this.getTime()+t);
return this;
}

function hc_time(id,time)
{
day = new Array("Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato");
var hc_hours = time.getHours();
var hc_minutes = time.getMinutes();
if (hc_minutes < 10)
{
hc_minutes = "0" + hc_minutes;
}
hc_day = day [time.getDay()];
var hc_time_out = hc_day + " ore " + hc_hours + ":" + hc_minutes;
return hc_time_out;
}

function hc_tl(time_left)
{
time_left = time_left/60000
  var  day_in_m = 1440;
var hour_in_m =  60;
d_day = Math.floor(time_left/day_in_m)
  time_left -= d_day*day_in_m;
d_hr = Math.floor(time_left/hour_in_m)
  time_left -= d_hr*hour_in_m;
result = time_left.toFixed(0);
return d_day + " giorni - " + d_hr + " ore - " + result + " min";
}


function hc_calculate()
{

var p = document.getElementById('hc_percent');
percent = parseInt(p.options[p.selectedIndex].value);
var h = document.getElementById('hc_item');
type = parseInt(h.options[h.selectedIndex].value);

switch(type) { 

  case 0: 
    document.getElementById('hc_message').style.display="";
	document.getElementById('hc_animal1').style.display="None";
	document.getElementById('hc_seed1').style.display="None";
	document.getElementById('hc_tree1').style.display="None";
	document.getElementById('hc_mastery').style.display="None";
  break;

  case -1: 
	document.getElementById('hc_seed1').style.display="";
	document.getElementById('hc_mastery').style.display="";
	document.getElementById('hc_message').style.display="None";
	document.getElementById('hc_tree1').style.display="None";
	document.getElementById('hc_animal1').style.display="None";
	t = document.getElementById('hc_seed');
  break;

  case -2: 
    document.getElementById('hc_animal1').style.display="";
	document.getElementById('hc_message').style.display="None";
	document.getElementById('hc_tree1').style.display="None";
	document.getElementById('hc_seed1').style.display="None";
	document.getElementById('hc_mastery').style.display="None";
	t = document.getElementById('hc_animal');
  break;

  case -3: 
    document.getElementById('hc_tree1').style.display="";
	document.getElementById('hc_message').style.display="None";
	document.getElementById('hc_seed1').style.display="None";
	document.getElementById('hc_animal1').style.display="None";
	document.getElementById('hc_mastery').style.display="None";
	t = document.getElementById('hc_tree');
  break;

}

	document.getElementById('hc_harvest').innerHTML ='';
	document.getElementById('hc_delta').innerHTML ='';
	document.getElementById('hc_current').innerHTML ='';
	document.getElementById('hc_wither').innerHTML ='';
	document.getElementById('hc_deltawither').innerHTML ='';
	document.getElementById('hc_mastery').innerHTML ='';	

hours = parseInt(t.options[t.selectedIndex].value);
if (type==-1){
  for (var x=0; x<seed.length; x+=5 ) {
	if(t.options[t.selectedIndex].innerHTML==seed[x]){
		ma1=seed[x+2];
		ma2=seed[x+3];
		ma3=seed[x+4];
     }
  };
}
if (type!=0 && hours!=0){

	var hc_now = new Date();

	document.getElementById('hc_current').innerHTML = '<b>DATA ATTUALE</b> <span><br><cente>'+hc_time('hc_current',hc_now)+'</center></span>';

	time_left = (hours * 3600000) * (percent/100)
	  hc_now.addTime(time_left);

	if(type==-1)
		document.getElementById('hc_harvest').innerHTML = '<b>RACCOLTO PRONTO</b> <span><br>'+hc_time('hc_harvest',hc_now)+'</span>';

	if(type==-2)
		document.getElementById('hc_harvest').innerHTML = '<b>ANIMALE PRONTO</b> <span><br>'+hc_time('hc_harvest',hc_now)+'</span>';

	if(type==-3)
		document.getElementById('hc_harvest').innerHTML = '<b>ALBERO PRONTO</b> <span><br>'+hc_time('hc_harvest',hc_now)+'</span>';
		
		  hc_now.addTime(hours * 3600000);
	if(type==-1)
		document.getElementById('hc_wither').innerHTML = '<b>MARCIRA\'</b> <span><br>'+hc_time('hc_wither',hc_now)+'</span>';

	document.getElementById('hc_delta').innerHTML = '<b>PRONTO TRA</b> <span><br>'+hc_tl(time_left)+'</span>';

	time_left+=hours * 3600000;
	if(type==-1)
		document.getElementById('hc_deltawither').innerHTML = '<b>MARCITO TRA</b> <span><br>'+hc_tl(time_left)+'</span>';
	if(type==-1)
		document.getElementById('hc_mastery').innerHTML = mastery(ma1,ma2,ma3) ;

}}

seed = new Array(
  "scegli", 0, 1, 2, 3,
  "Acorn Squash", 10, "1.500", "1.500", "7.000",
  "Aloe Vera", 6, "1.000", "2.000", "7.500",
  "Artichokes", 92, "200", "50", "70",
  "Asparagus", 16, "825", "825", "4.125",
  "Bell Peppers", 46, "350", "270", "455",
  "Blackberries", 4, "2.500", "5.000", "18.750",
  "Blueberries", 4, "1.600", "3.200", "12.000",
  "Broccoli", 46, "425", "325", "550",
  "Cabbage", 46, "500", "375", "665",
  "Carrots", 12, "1.000", "1.000", "5.000",
  "Coffee", 16, "500", "1.000", "3.750",
  "Corn", 69, "425", "215", "160",
  "Cotton", 69, "300", "150", "115",
  "Cranberries", 10, "450", "650", "2.900",
  "Daffodils", 46, "250", "188", "328",
  "Eggplant", 46, "175", "135", "230",
  "Ghost Chilli", 6, "1.200", "2.400", "9.000",
  "Grapes", 23, "425", "850", "1.275",
  "Green Tea", 10, "1.400", "1.400", "7.000",
  "Lavender", 46, "450", "338", "590",
  "Lilies", 23, "500", "1.000", "1.500",
  "Morning Glory", 12, "500", "1.000", "1.500",
  "Onion", 12, "825", "1.000", "1.500",
  "Pattypan Squash", 16, "500", "1.000", "3.500",
  "Peas", 23, "600", "1.200", "1.800",
  "Peppers", 23, "425", "850", "1.275",
  "Pineapples", 46, "425", "325", "550",
  "Pink Roses", 46, "450", "338", "590",
  "Potatoes", 69, "425", "215", "160",
  "Pumpkin", 8, "500", "1.000", "3.750",
  "Raspberries", 2, "2.000", "4.000", "15.000",
  "Red Tulips", 23, "500", "1.000", "1.500",
  "Red Wheat", 69, "410", "200", "150",
  "Rice", 12, "400", "400", "2.000",
  "Soybeans", 23, "150", "300", "450",
  "Squash", 46, "200", "150", "270",
  "Strawberries", 4, "500", "1.000", "3.750",
  "Sugar Cane", 8, "1.300", "1.300", "8.400",
  "Sunflowers", 23, "575", "1.150", "1.725",
  "Tomatoes", 8, "850", "1.700", "6.450",
  "Watermelon", 92, "410", "100", "130",
  "Wheat", 69, "200", "100", "75",
  "Yellow Melon", 92, "425", "115", "130"
	);

tree = new Array(
  "scegli", 0,
  "Acai Tree", 46,
  "Almond Tree", 69,
  "Apple Tree", 69,
  "Apricot Tree", 92,
  "Avocado Tree", 69,
  "Banana Tree", 69,
  "Breadfruit Tree", 69,
  "Carnival Tree", 69,
  "Cashew Tree", 69,
  "Cherry Tree", 46,
  "Date Tree", 69,
  "Durian Tree", 92,
  "Fig Tree", 69,
  "Grapefruit Tree", 69,
  "Guava Tree", 69,
  "Gulmohar Tree", 69,
  "Lemon Tree", 69,
  "Lime Tree", 115,
  "Mandarin Tree", 92,
  "Maple Tree", 46,
  "Olive Tree", 92,
  "Orange Tree", 92,
  "Ornament Tree I", 46,
  "Ornament Tree II", 46,
  "Passion Fruit Tree", 115,
  "Peach Tree", 92,
  "Plum Tree", 69,
  "Pomegranate Tree", 115,
  "Red Maple Tree", 46,
  "Starfruit Tree", 92,
  "Walnut Tree", 69,
  "Yellow Maple Tree", 46
	);

animal = new Array(
  "scegli", 0,
  "Alpaca", 46,
  "BOVINE-09", 23,
  "Baby Elephant", 92,
  "Baby Tiger", 46,
  "Baby Turkey", 69,
  "Bear Cub", 46,
  "Black Cat", 69,
  "Black Chicken", 23,
  "Black Sheep", 69,
  "Brown Calf", 23,
  "Brown Chicken", 23,
  "Brown Cow", 23,
  "Brown Goose", 46,
  "Brown Pony", 69,
  "Buck", 46,
  "Buffalo", 69,
  "Bull", 23,
  "Calf", 23,
  "Chicken", 23,
  "Chicken Coop", 23,
  "Chicken Cheer", 23,
  "Chicken Joi", 23,
  "Clumsy Reindeer", 46,
  "Clydesdale", 69,
  "Cow", 23,
  "Dairy Farm", 23,
  "Doe", 69,
  "Donkey", 23,
  "Duck", 46,
  "Elk", 46,
  "Foal", 23,
  "Giant Panda", 46,
  "Goat", 46,
  "Golden Chicken", 23,
  "Grey Horse", 69,
  "Green Calf", 23,
  "Green Mallard", 46,
  "Grey Goose", 46,
  "Grey Tabby", 69,
  "High Kick Horse", 69,
  "Horse", 69,
  "Hot Pink Pig", 46,
  "Jackalope", 46,
  "Kelly Green Calf", 23,
  "Kelly Green Cow", 23,
  "Lamb", 69,
  "Line Quacker 1", 46,
  "Line Quacker 2", 46,
  "Lop-Eared Bunny", 46,
  "Luv Ewe", 69,
  "Moose", 69,
  "Orange Tabby", 69,
  "Ossabaw Pig", 46,
  "Ox", 69,
  "Peacock", 46,
  "Penguin", 69,
  "Pig", 46,
  "Pink Calf", 23,
  "Pink Cow", 23,
  "Pink Patch Calf", 23,
  "Pink Patch Cow", 23,
  "Pink-Hair Pony", 69,
  "Pinto Horse", 69,
  "Porcupine", 46,
  "Rabbit", 92,
  "Referee Cow", 23,
  "Reindeer", 46,
  "Saanens Goat", 46,
  "Shamrock Sheep", 69,
  "Sheep", 69,
  "Sheep Spectator", 69,
  "Swan", 46,
  "Turkey", 46,
  "Turtle", 69,
  "Ugly Duckling", 69,
  "Valley Quail", 46,
  "White Kitty", 69,
  "White Stallion", 69,
  "Wild Turkey", 46
	);

item = new Array(
  "scegli", 0,
  "===> SEMI", -1,
  "===> ANIMALI", -2,
  "===> ALBERI", -3
	);

function iList() { // Builds the item slider
  var ilist = "<b>Categoria</b><select id=\"hc_item\">";
  for (var x=0; x<item.length; x+=2 ) {
    ilist = ilist + "<option value=\"" + item [x+1] + "\">" + item [x] + "</option>";
  };
  iList = iList + "</select>";
  return ilist;
}

function anList() { // Builds the animal slider
  var anlist = "<center id=\"hc_animal1\" style=\"display:None\"><b><font color =\"red\"><br>SCEGLI UN ANIMALE</font></b><select id=\"hc_animal\">";
  for (var x=0; x<animal.length; x+=2 ) {
    anlist +=  "<option value=\"" + animal [x+1] + "\">" + animal [x] + "</option>";
  };
  anlist += "</select></center>";
  return anlist;
}

function trList() { // Builds the tree slider
  var trlist = "<center id=\"hc_tree1\" style=\"display:None\"><b><font color =\"red\"><br>SCEGLI UN ALBERO</font></b><select id=\"hc_tree\">";
  for (var x=0; x<tree.length; x+=2 ) {
    trlist +=  "<option value=\"" + tree [x+1] + "\">" + tree [x] + "</option>";
  };
  trlist += "</select></center>";
  return trlist;
}

function seList() { // Builds the seed slider
  var selist = "<center id=\"hc_seed1\" style=\"display:None\"><b><font color =\"red\"><br>SCEGLI UN SEME</font></b><select id=\"hc_seed\">";
  for (var x=0; x<seed.length; x+=5 ) {
    selist +=  "<option value=\"" + seed [x+1] + "\">" + seed [x] + "</option>";
  };
  selist += "</select></center>";

  return selist;
}

function pList() {  // Builds the percentage Slider
  var pList = "<b>Percentuale</b> &nbsp&nbsp <select id=\"hc_percent\">";
  for (var x=0; x<100; x++) {
    pList = pList + "<option value=\"" + (100-x) + "\">" + x + "%</option>";
  };
  pList = pList + "</select>";
  return pList;
}

function mastery(m1,m2,m3) {  
  var table = "<center><b>Mastery</b><br>";
  table += "<table border=1>";
  table += "<tr><td><img src=\"http://img80.imageshack.us/img80/1691/schermata20100317a14535.png\"></td><td id=\"hc_m1\">&nbsp&nbsp "+m1+"&nbsp&nbsp </td></tr>";
  table += "<tr><td><img src=\"http://img297.imageshack.us/img297/9794/schermata20100317a14540.png\"></td><td id=\"hc_m2\">&nbsp&nbsp "+m2+"&nbsp&nbsp </td></tr>";
  table += "<tr><td><img src=\"http://img684.imageshack.us/img684/9794/schermata20100317a14540.png\"></td><td id=\"hc_m3\">&nbsp&nbsp "+m3+"&nbsp&nbsp </td></tr>";
  table += "</table></center>"
  return table;
}

var outFrame = '<table border="0" cellspacing="0" cellpadding="2"><tr><td id="data" width="47">' + logo + '</td><td><h2><b>Calcolatore<br>di Raccolto<br>&nbsp&nbsp&nbsp v. '+versione+'<br><img id="hc_my" src=http://img104.imageshack.us/img104/3499/imgjy.png></b></h2></td></tr><tr><td colspan="2">' + iList() + '</td></tr><tr><td colspan="2">' + pList() + '</td></tr><tr><td id="hc_message" colspan="2"><center><b><font color=red><br>SCEGLI UNA CATEGORIA</font></b></center></td></tr><tr><td colspan="2">'+ seList() +'</td></tr><tr><td colspan="2">'+ trList() +'</td></tr><tr><td colspan="2">'+ anList() +'</td></tr><tr><td id="hc_current" colspan="2"></td></tr><tr><td id="hc_harvest" colspan="2"></td></tr><tr><td id="hc_wither" colspan="2"></td></tr><tr><td id="hc_delta" colspan="2"></td></tr><tr><td id="hc_deltawither" colspan="2"></td></tr><tr><td colspan=2 id="hc_mastery" style="display:None">'+ mastery("","","") +'</td></tr></table>';

var outData=document.createElement("div");
	outData.setAttribute("style", "border: 3px solid rgb(59, 89, 152); padding: 5px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; position: fixed; right: 150px; top: 70px; width: 150px;");

	outData.innerHTML=outFrame;

document.body.appendChild(outData);
document.getElementById('hc_percent').addEventListener('change',hc_calculate,false);
document.getElementById('hc_item').addEventListener('change',hc_calculate,false);
document.getElementById('hc_seed').addEventListener('change',hc_calculate,false);
document.getElementById('hc_animal').addEventListener('change',hc_calculate,false);
document.getElementById('hc_tree').addEventListener('change',hc_calculate,false);
