// ==UserScript==
// @name          eRepublik Market Tools
// @version       1.5
// @description	  improved eRepublik Market
// @author        asylume
// @include       http://economy.erepublik.com/*/market/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

//      CHANGE LOG
// -------------------------------------------------------------------
//  v1.5
//    - added precision for ratios
//    - added real values for all products
//    - added total well&happy amount for houses
//    - rewrited some functions
//  v1.4.1
//    - added tools settings
//    - added price/point ratio
//  v1.4
//    - added fix for faders in slider
//    - added free slots in account select
//  v1.3
//    - added total price
//    - quantity color change to red when entered more than in stock
//  v1.2
//    - added real well&happy amount given by food
//  v1.1
//    - added price/happy ratio
//  v1.0
//    - main function
// -------------------------------------------------------------------

//#################################################################### prepare data

function prepareJSON(str) {
  str=str.replace(/\\'/g,'\'');
  str=str.replace(/\\"/g,'"');
  str=str.replace(/\\0/g,'\0');
  str=str.replace(/\\\\/g,'\\');
  str=str.substr(1,str.length-2);
  return str;
}

var url = document.location.href.split('/');
var userId = $('#miniprofile .avatarholder a.citizen_name').attr('href').split('/')[6];
userId = (userId == undefined ? 0 : userId);

$('body').append('<script type="application/javascript"> $j("#container").append(\'<div id="json_offers" style="display:none">\'+JSON.stringify(offersJSON)+\'</div>\'); </script>');
var offersJSONtext = prepareJSON($('#json_offers').text());
var offersJSON = JSON.parse(offersJSONtext);

var colors = {"happiness":"orangered","health":"green","moving_distance":"purple","damage":"brown","attack":"purple","defense":"darkgreen","durability":"orangered","area_of_effect":"teal"};

//#################################################################### tools settings

var def_settings = new Array();
def_settings.types = ['checkbox','checkbox','checkbox','select','checkbox'];
def_settings.values = [true,true,false,3,true];
var settings = new Array();
settings.values = [];

function loadSettings() {
  var i=0;
  var count = def_settings.types.length;
  for(i;i<count;i++){
    settings.values[i] = GM_getValue(userId+'_tools_set'+i,def_settings.values[i]);
    if (def_settings.types[i] == 'select')  $('#tools_set'+i).val(settings.values[i]);
    else if (def_settings.types[i] == 'checkbox' && settings.values[i]) $('#tools_set'+i).attr('checked','checked');
  }
}

function saveSettings() {
  var i=0;
  var count = def_settings.types.length;
  for(i;i<count;i++){
    var obj = $('#tools_set'+i).get(0);
    if (obj.tagName == 'INPUT') settings.values[i] = $('#tools_set'+i).attr('checked');
    else if (obj.tagName == 'SELECT') settings.values[i] = $('#tools_set'+i+' option:selected').attr('value');
    GM_setValue(userId+'_tools_set'+i,settings.values[i]);
  }
}

$('#tools_settings a').live('click',function(){
  saveSettings();
  $('#tools_msg').show();
});

$('th.m_buy').append('<small style="cursor:pointer"><acronym title="Click to open settings for eRepublik Market Tools">» tools settings</acronym></small>');
$('.price_sorted').parent().before('<div id="tools_settings" style="margin:10px 0;display:none;line-height:20px"><h3>eRepublik Market Tools Settings <div id="close_settings" style="float:right;color:red;padding:0 10px;cursor:pointer;background-color:antiqueWhite;">x</div></h3><div style="float:left;width:340px;"><input type="checkbox" id="tools_set0" /> Show price/well for food <br /><input type="checkbox" id="tools_set1" /> Show price/happy for food <br /><input type="checkbox" id="tools_set2" /> Show price/point (well+happy) for food <br /><input type="checkbox" id="tools_set4" /> Show total well & happy given by house </div><div style="float:left;width:340px;">Choose precision <select id="tools_set3"><option value="1">0.1</option><option value="2">0.01</option><option value="3">0.001</option><option value="4">0.0001</option><option value="5">0.00001</option></select></div><br /><a class="f_light_blue_big" style="clear:both;margin-left:300px" href="javascript:;"><span>Save</span></a><div style="clear:both;text-align:center"><strong id="tools_msg" style="color:red;cursor:pointer;display:none;">You must reload page to see changes (press F5 or <span style="color:blue" onClick="location.reload()">click here</span>)</strong></div></div>');

$('th.m_buy small, #close_settings').click(function(){ $('#tools_settings').slideToggle(); });
$('#tools_msg').live('click',function(){ $(this).fadeOut('normal'); });

loadSettings();  // load on startup

//#################################################################### real values & ratios & total amount (houses)

var realVal = new Array();
var realVal2 = new Array();
var color;

$('.price_sorted > tr').each(function(index){
  var bars = $(this).find('.bar');
  
  // get price
  var price = $(this).find('.stprice').text();
  price = Math.round(parseFloat(price)*100);
  
  // get currency
  var currency = $(this).find('.stprice > sup > strong').text();
  
  for (var j in offersJSON[index].attributes) {
    realVal[j] = offersJSON[index].attributes[j].affect.val;
    realVal2[j] = offersJSON[index].attributes[j].part.val;
    color = (colors[offersJSON[index].attributes[j].part.color] !=  null) ? colors[offersJSON[index].attributes[j].part.color] : 'black' ;
    
    $(bars[j]).after('<small style="color:'+color+';float:right;margin-left:5px">'+realVal[j]+'</small><br>');
  }

  // ratios for food
  if (url[6] == 1) {
    var showTxt = '';
    
    // well
    if (settings.values[0]) {
      if (realVal2[0] > 0) {
        var ratio1 = price / ( realVal2[0] * 10);
        ratio1 = ratio1.toFixed(settings.values[3]);
      } else var ratio1 = '-';
      showTxt += '<br><small style="color:green">'+ratio1+' '+currency+'/well</small>';
    }
    
    // happy
    if (settings.values[1]) {
      if (realVal2[1] > 0) {
        var ratio2 = price / ( realVal2[1] * 10);
        ratio2 = ratio2.toFixed(settings.values[3]);
      } else var ratio2 = '-';
      
      showTxt += '<br><small style="color:orangered">'+ratio2+' '+currency+'/happy</small>';
    }
    
    // point
    if (settings.values[2]) {
      var sum = parseInt(realVal2[0]) + parseInt(realVal2[1]);
      var ratio3 = price / (sum * 10);
      ratio3 = ratio3.toFixed(settings.values[3]);
      
      showTxt += '<br><small style="color:purple">'+ratio3+' '+currency+'/point</small>';
    }
    
    if(showTxt) $(this).find('.stprice').append(showTxt);
  }
  
  // for houses
  if (url[6] == 3) {
    if (settings.values[4]) {
      var totalWell = Math.round(realVal[0]*realVal[2]*100)/100;
      var totalHappy = Math.round(realVal[1]*realVal[2]*100)/100;
      
      $(this).find('.barholder td').append('<div><small>Total: <span style="color:green">'+totalWell+'</span> / <span style="color:orangered">'+totalHappy+'</span></small></div>');
    }
  }
});

$('.m_product').css({'width':'205px'}); // fix width

//#################################################################### total price

$('.m_quantity input').after('<br><strong></strong>').parent().css({'text-align':'center'});

$('.m_quantity input').keypress(function(){
  var inp = $(this);
  
  // get price
  var price = inp.parent().prev('.stprice').text();
  price = Math.floor(Math.round(parseFloat(price)*100));
  
  // get stock
  var stock = parseInt(inp.parent().siblings('.m_stock').text());
  
  // get amount after 0,5s (avoid bug)
  var amount = 1;
  var timer = null;
  
  timer = setTimeout(function(){
    amount = parseInt(inp.val());
    amount = (isNaN(amount) ? 0 : amount);
    
    // check if amount greater then stock
    if(amount > stock) inp.css({'color':'red'});
    else inp.css({'color':'#333'});
    
    var total = (price * amount)/100;
    inp.siblings('strong').text(total);
  }, 100);
});

//#################################################################### fix faders in slider

$('.faderleft, .faderright').css({'pointer-events':'none'});

//#################################################################### free slots in bar

var freeslots = $('#onaccount small').text();
$('#onaccount span').append('<small>'+freeslots+'</small>');
