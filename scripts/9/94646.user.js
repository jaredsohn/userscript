// ==UserScript==
// @name           Caribic Islands Sum Military
// @namespace      Caribic Islands Sum Military
// @include        http://s*.caribicislands.org/s4/index.php?sid=*&p=allisle&sub=*
// ==/UserScript==


var getvars = parent.document.URL.split("?")[1]; 
var links = new Array();
    links = getvars.split("&");    
for (var i=0; i<links.length; i++) {
  var GetType = links[i].split('=')[0];
  if(GetType == "sub") var MilitaryPage = links[i].split('=')[1];
}

// Suchern und ersetzen 
function str_replace(search, replace, subject) {  
  return subject.split(search).join(replace);  
} 

// Tausender Trennpunkte einfügen
// Quelle: http://www.fobit.com/index.php?article=JavaScript%3A%20number_format
function number_format (number, decimals, dec_point, thousands_sep)
{
  var exponent = "";
  var numberstr = number.toString ();
  var eindex = numberstr.indexOf ("e");
  if (eindex > -1)
  {
    exponent = numberstr.substring (eindex);
    number = parseFloat (numberstr.substring (0, eindex));
  }
  
  if (decimals != null)
  {
    var temp = Math.pow (10, decimals);
    number = Math.round (number * temp) / temp;
  }
  var sign = number < 0 ? "-" : "";
  var integer = (number > 0 ? 
      Math.floor (number) : Math.abs (Math.ceil (number))).toString ();
  
  var fractional = number.toString ().substring (integer.length + sign.length);
  dec_point = dec_point != null ? dec_point : ".";
  fractional = decimals != null && decimals > 0 || fractional.length > 1 ? 
               (dec_point + fractional.substring (1)) : "";
  if (decimals != null && decimals > 0)
  {
    for (i = fractional.length - 1, z = decimals; i < z; ++i)
      fractional += "0";
  }
  
  thousands_sep = (thousands_sep != dec_point || fractional.length == 0) ? 
                  thousands_sep : null;
  if (thousands_sep != null && thousands_sep != "")
  {
	for (i = integer.length - 3; i > 0; i -= 3)
      integer = integer.substring (0 , i) + thousands_sep + integer.substring (i);
  }
  
  return sign + integer + fractional + exponent;
}

function Militar(Cell) {
  var counter = 0;
  var Rows = new Array();
      Rows = document.getElementsByTagName('table')[8].getElementsByTagName('tr');
  for (var i=2; i<Rows.length; i++) {
    var number = str_replace('<img src="images/r_g.gif"> ', '', Rows[i].getElementsByTagName('td')[Cell].innerHTML);
        number = str_replace('<img src="images/r_s.gif"> ', '', number);    
        number = str_replace('<img src="images/r_w.gif"> ', '', number);    
        number = str_replace('<img src="images/r_f.gif"> ', '', number);    
        number = str_replace('<font color="red">', '', number);    
        number = str_replace('</font>', '', number);    
   counter = eval(counter*1+number*1); 
  }
  return number_format(counter, 0, null, ".");
}

var Table = document.getElementsByTagName('table')[8].getElementsByTagName('tr');
if   (MilitaryPage   == "allunitswaffen")   document.getElementsByTagName('table')[8].innerHTML += '<tr><td class="sub" colspan="3" style="text-align: right;">Gesamtsumme:</td><td class="sub" id="3">'+Militar(3)+'</td><td class="sub" id="4">'+Militar(4)+'</td><td class="sub" id="5">'+Militar(5)+'</td></tr>';
else if(MilitaryPage == "allunitsmilitaer") document.getElementsByTagName('table')[8].innerHTML += '<tr><td class="sub" colspan="3" style="text-align: right;">Gesamtsumme:</td><td class="sub" id="3">'+Militar(3)+'</td><td class="sub" id="4">'+Militar(4)+'</td><td class="sub" id="5">'+Militar(5)+'</td><td class="sub" id="6">'+Militar(6)+'</td></tr>';
else if(MilitaryPage == "allunitsflotte")   document.getElementsByTagName('table')[8].innerHTML += '<tr><td class="sub" colspan="3" style="text-align: right;">Gesamtsumme:</td><td class="sub" id="3">'+Militar(3)+'</td><td class="sub" id="4">'+Militar(4)+'</td><td class="sub" id="5">'+Militar(5)+'</td><td class="sub" id="6">'+Militar(6)+'</td><td class="sub" id="7">'+Militar(7)+'</td><td class="sub" id="8">'+Militar(8)+'</td></tr>';
else if(MilitaryPage == "allisle")          document.getElementsByTagName('table')[8].innerHTML += '<tr><td class="sub" colspan="3" style="text-align: right;">Gesamtsumme:</td><td class="sub" id="3">'+Militar(3)+'</td><td class="sub" id="4">'+Militar(4)+'</td><td class="sub" id="5">'+Militar(5)+'</td><td class="sub" id="6">'+Militar(6)+'</td><td class="sub" id="7">'+Militar(7)+'</td><td class="sub" colspan="3">&nbsp;</td></tr>';
