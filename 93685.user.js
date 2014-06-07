// ==UserScript==
// @name          eRepublik Market English
// @version       0.2
// @creator       TEObest1 (Translation: Tpex)
// @include       http://economy.erepublik.com/*/market/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==



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

$('th.m_buy').append('<small style="cursor:pointer"><acronym title="Click to open settings eRepublik Market">» Settings</acronym></small>');
$('.price_sorted').parent().before('<div id="tools_settings" style="margin:10px 0;display:none;line-height:20px"><h3>Settings eRepublik Market <div id="close_settings" style="float:right;color:red;padding:0 10px;cursor:pointer;background-color:antiqueWhite;">x</div></h3><div style="float:left;width:340px;"><input type="checkbox" id="tools_set0" /> To show the correlation price / Life in Food <br /><input type="checkbox" id="tools_set1" /> To show the correlation value / happiness in food <br /><input type="checkbox" id="tools_set2" /> To show the correlation price / unit (life + happiness) in food <br /><input type="checkbox" id="tools_set4" /> Do what seems a whole life and what gives happiness to every home in the days that would have</div><div style="float:left;width:340px;"> Select measurement accuracy <select id="tools_set3"><option value="1">0.1</option><option value="2">0.01</option><option value="3">0.001</option><option value="4">0.0001</option><option value="5">0.00001</option></select></div><br /><a class="f_light_blue_big" style="clear:both;margin-left:300px" href="javascript:;"><span>Save</span></a><div style="clear:both;text-align:center"><strong id="tools_msg" style="color:red;cursor:pointer;display:none;">Η page must be reloaded (press F5 or click <span style="color:blue" onClick="location.reload()">εδώ</span>)</strong></div></div>');

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
      showTxt += '<br><small style="color:green">'+ratio1+' '+currency+'/1 Wellness</small>';
    }
    
    // happy
    if (settings.values[1]) {
      if (realVal2[1] > 0) {
        var ratio2 = price / ( realVal2[1] * 10);
        ratio2 = ratio2.toFixed(settings.values[3]);
      } else var ratio2 = '-';
      
      showTxt += '<br><small style="color:orangered">'+ratio2+' '+currency+'/ευτυχία</small>';
    }
    
    // point
    if (settings.values[2]) {
      var sum = parseInt(realVal2[0]) + parseInt(realVal2[1]);
      var ratio3 = price / (sum * 10);
      ratio3 = ratio3.toFixed(settings.values[3]);
      
      showTxt += '<br><small style="color:purple">'+ratio3+' '+currency+'/μονάδα</small>';
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