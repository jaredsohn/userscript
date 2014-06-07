// ==UserScript==
// @name           Show stock quotes
// @namespace      kasperfish
// @include        http://www.beursig.nl/forum/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=133108
// @version        1.5.4
// ==/UserScript==



function qs(url,key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = url.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1]);
}



var indices = ["BEL20","BELMID","BELSMALL","AEX","AMX","ASCX","FTSE100","CAC40","PSI","NEXT100","NEXT150","NASDAQ","DOW","indices","valuta","GLOBALIND"];
var scriptversion=GM_info.script.version;
var position="absolute";
var timerfish='null'; 
//images
var load_img="http://preloaders.net/preloaders/13/preview.gif";
var close_img="http://www.assembla.com/spaces/silk/documents/aBKRlWI4Cr4lg3eJe5cbCb/download?filename=decline.png";
var refresh_img="http://www.multidesk.be/images/assets/icons/silk/table_refresh.png";
//var options_img="http://gbatemp.net/images/icon_cog.png";
var star_img="http://www.gosugamers.net/bilder/silk/star.png";
var stargrey_img='http://www.cdberater.de/components/com_muscol/assets/images/star_grey.png';
var chart_img='http://icons.iconarchive.com/icons/famfamfam/silk/16/chart-curve-icon.png';
AddStarButtons();


//keep GM alive for ajax requests
var ajaxQueue = [];
var processAjaxQueue = function(){
  if (ajaxQueue.length > 0) {
    for (ajax in ajaxQueue) {
      var obj = ajaxQueue[ajax];
      GM_xmlhttpRequest(obj);
    }
    ajaxQueue = [];
  }
}
setInterval(function(){
  processAjaxQueue();
}, 100);
 
function gmAjax(obj){
  ajaxQueue.push(obj);
}


//sliding trigger div
$('<div title="click me" id="triggerfish">"STOCK QUOTES"</div>').css({cursor:'pointer',display:'none',position:'fixed',top:'0px',right:'20px',padding:'6px','z-index':'9998'}).prependTo('body#phpbb').fadeIn();

$('<div id="sliderfish">').css({display:'none',position:position,top:'0px','z-index':'9999','padding-bottom':'10px',width:'100%'}).prependTo('body#phpbb');
$('<div id="menufish">').css({width:'100%',padding:'5px','margin-bottom':'5px',position:'relative'}).appendTo('#sliderfish');
$('<div id="contentfish">').css({width:'100%','min-height':'150px'}).appendTo('#sliderfish');
$('#triggerfish,#sliderfish,#menufish').addClass('bluetheme');
//script version © Kasperfish
$('#sliderfish').append('<div style="color:grey;position:absolute;right:20px;bottom:3px">Version: '+scriptversion+' <span style="font-size:6pt">© Kasperfish</span></div>');
$('#menufish').append('<select id="indexfish">');
//loading image
$('#menufish').append('<div style="visible:none;position:absolute;left:300px;top:7px" id="loadingfish"><img  src="'+load_img+'"></div>');
//buttons
$('<div id="buttonsfish">').css({position:'absolute',left:'125px',top:'7px'}).appendTo('#menufish');
$('#buttonsfish').append('<img id="refreshfish" title="Refresh Quotes" src="'+refresh_img+'" style="float:left;margin-left: 5px;">');
//$('#buttonsfish').append('<img id="optionsfish" title="Options" src="'+options_img+'" style="cursor:pointer;float:left;margin-left: 5px;">');
$('#buttonsfish').append('<img id="starfish" title="Favourites" src="'+star_img+'" style="cursor:pointer;float:left;margin-left: 5px;">');

$('#buttonsfish').append('<img id="closefish" title="Close Quotes" src="'+close_img+'" style="cursor:pointer;float:left;margin-left: 5px;">');
$('#menufish').append('<div style="color:white;float:right;padding-right:30px;margin-left:60px;font-size:10px">Als er iets niet werkt gelieve dit dan te <a href="http://www.beursig.nl/forum/viewtopic.php?f=16&t=455">hier</a> melden. dank u!</div>');

//populate selectbox with indices
$.each(indices, function(key, value) { 
     $('#indexfish')
         .append($("<option></option>")
         .attr("value",value)
         .text(value)).append('body'); 
});


//action binding
//----------------

//trigger stock quotes
$('#triggerfish').click(function() {
$('#triggerfish').fadeOut();
if(GM_getValue('page')=='star'){

}

  if(GM_getValue('lastselected')){
     LoadStock(GM_getValue('lastselected'));
     $("#indexfish").val(GM_getValue('lastselected'));
  }else{LoadStock($('select#indexfish').val());}
$('#sliderfish').slideToggle(function() { 
//set refresh timer
 if ($('#sliderfish').is(':visible')){
    //timerfish=setInterval(function() { LoadStock($('select#indexfish').val());}, 240000);
     //LoadStock($('select#indexfish').val());
    }

 });
});
//Stock quote selectbox
$('#indexfish').change(function() {
  LoadStock($('select#indexfish').val());
  GM_setValue( 'lastselected', $('select#indexfish').val() );
});
 //refresh button 
$('#refreshfish').css('cursor','pointer').click(function(){
LoadStock($('select#indexfish').val());
});
 //close button 
$('#closefish').click(function() {
$('#sliderfish').slideToggle();
//clearInterval(timerfish);
$('#triggerfish').fadeIn('slow');
});
 //fav star button 
$('#starfish').click(function() {
//clearInterval(timerfish);
$('#contentfish').html('');
$('#contentfish').append('<div style="position:relative;top:5px;left:10px;width:350px;text-align:center;padding:6px;border:2px solid #11A0E7">Mijn Favouriete aandelen</div>');
$('#contentfish').append('<div id="starscontainer" style="width:94%;position:relative;top:10px;left:10px;padding:6px;"></div>');
$('#contentfish').append('<div style="position:absolute;left:400px;top:35px;width:400px;" id="starmsg">Voeg aandelen toe aan je favorieten door het sterretje van desbetreffend topic aan te vinken. Er staat een sterretje naast de naam van de aandelentopics.</div>');
ShowStars();

});



function LoadStock(selectedindex){
$('#contentfish').html('');
if(selectedindex=='AMX'||selectedindex=='ASCX'){domain='http://www.belegger.nl'}else{domain='http://www.beursduivel.be'}
$('#loadingfish').fadeIn('fast');
$('#contentfish').html('');
gmAjax({
  method: "GET",
  headers:{referer:"http://www.beursduivel.be"},
  url: domain+"/koersen-"+selectedindex+".index",
  onload: function(response) {
    $('#loadingfish').fadeOut(); 
    text=response.responseText;
    rawTable=$(text).find('table.survey.koersentabel');
    
      var $table = $(rawTable),
      $headerCells = $table.find("thead th"),
      $rows = $table.find("tbody tr");
      
  
  var headers = [], htmlrows=[],
      rows = [];
  
  $headerCells.each(function(k,v) {
     headers[headers.length] = $(this).text();
  });
  
  $rows.each(function(row,v) {
    $(this).find("td").each(function(cell,v) {
      if (typeof rows[cell] === 'undefined'){ rows[cell] = [];}
      rows[cell][row] = $(this).html();//HTML!!
      
    });
  });
  
  

 var stocknames=rows[0], last=rows[1], pctchange=rows[3],htmlname=htmlrows[0];
$('#contentfish').append('<div id="stockcontainer" style="display:inline-block"></div>');
$('<div id="chartcontainer" style="display:inline-block"></div>').appendTo('#contentfish');
  for (i=1;i<=stocknames.length-1;i++)
{
//alert(stocknames[i]); return false;//outputs HTML!!
stockname=$(stocknames[i]).text();
pct=$(pctchange[i]).text();
l=$(last[i]).text();
chartlink=domain+$(stocknames[i]).attr('href');
//alert(chartlink);return false;
//ShowChart(chartlink);


if(pct.charAt(0)=='-'){posneg='red';}else if(pct.charAt(0)=='+'){posneg='green';}

$('#stockcontainer').append('<div style="margin-right:12px;margin-left:20px;float:left;width:250px;height:15px;position:relative"><div name="'+stockname+'" style="position:absolute"><img title="Click for chart" class="chartbutton" ref="'+chartlink+'" style="cursor:pointer; height:10px;width:10px" src="'+chart_img+'"/></div><div title="'+stockname+'" style="white-space: nowrap;height:15px;font-weight:bold;position:absolute;left:12px;width:110px;overflow:hidden">'+stockname+'</div><div style="position:absolute;left:130px">'+ l+'</div><div style="color:'+posneg+';float:right">'+pct+'<div></div>');

}
$('.chartbutton').click(function (){
ShowChart($(this).attr('ref'),$(this).closest('div').attr('name'));

});

}//end onload 
});
}//end function loadStock()

function ShowChart(link,name){

GM_xmlhttpRequest({
  method: "GET",
  url: link,
  onload: function(response) {
    var rawpage=response.responseText;
    var charturl=$(rawpage).find('img#stockchart').attr('src');
    //var tradetime=$(rawpage).find('div[field="tradetime"]').text();
    var i=$(rawpage).find('div.twoColumns.clearfix').find('h5:first').text().split("/");
    var ii=i[1].split(': ');
    isin=ii[1];
    var lid=qs(charturl,'lid');
    var randomnumber=Math.floor(Math.random()*1001);    
    var id=randomnumber+'_'+lid;
    var chartcont=$('<div class="chart_cont" style="margin-left:10px;margin-top:20px;float:left"></div>').append('<div style="background-color:#11A0E7;padding:2px;color:black"><select id="r_'+id+'" class="periodselect"></select> <b>'+name+'</b> '+isin+'<img  name="'+name+'" class="deletechart" style="float:right;cursor:pointer;width:10px;height:10px" src="'+close_img+'"></div>');
    $(chartcont).append('<div class="pic_cont" id="'+id+'"></div>');
    $(chartcont).appendTo('#chartcontainer');
    
    $('#'+id).html('<img src="'+load_img+'"/>');
    var $img = $('<img name="'+lid+'" class="chart_pic" src="'+charturl+'" style="display:none"/>');
    $img.load(function() {
        // once the loading has completed
        $('#'+id).html($(this));
        $(this).fadeIn();
    });
    
    period = {'intraday': 'i=i&p=0&pc=n', 'maand': 'i=d&p=1&pc=n', 'jaar': 'i=w&p=12&pc=n', '5 jaar': 'i=m&p=60&pc=n', '15 jaar': 'i=w&p=180&pc=n'}
    $.each(period, function(key, value) { 
     $('#r_'+id)
         .append($("<option></option>")
         .attr("value",value)
         .text(key)).append('body'); 
});

$('.periodselect').change(function() {
 var pic=$(this).parent('div').next('div.pic_cont').find('img.chart_pic');
 var lidnr=$(pic).attr('name');
 var period=$(this).val();
 var newsrc='http://ichart.quintrics.nl/GetIChart.aspx?lid='+lidnr+'&tfn=beleggerNL.ten&w=330&h=250&'+period;
 $(pic).attr('src',newsrc);
  
});
    
$('.deletechart').click(function(){
var name=$(this).attr('name');
$(this).closest('div.chart_cont').fadeOut();
RemoveChart(name);
});
  
    SaveChart(name,lid);
  }
});


}//end GetChart function



function SaveChart(name,lid){
if(GM_getValue('charts')&&GM_getValue('charts')!=''){
var chartarray = JSON.parse(GM_getValue('charts'));
chartarray[name]=lid;
var chartjson = JSON.stringify(chartarray, null, 2);
GM_setValue('charts',chartjson);
}else{
var z={};
z[name]=lid;
var chartjson =JSON.stringify(z, null, 2);
GM_setValue('charts',chartjson);
}
}//end

function RemoveChart(name){
var chartarray = JSON.parse(GM_getValue('charts'));
delete chartarray[name];
var chartjson =JSON.stringify(chartarray, null, 2);
GM_setValue('charts',chartjson);
}//end


function AddStarButtons(){

var enabledfora= ['f=2','f=4','f=12','f=5','f=6'];
var path = $(location).attr('href');

for (i=0;i<=enabledfora.length+1;i++){

  if(path.indexOf('http://www.beursig.nl/forum/viewforum.php?'+enabledfora[i])!=-1){
      //$('a.topictitle').after('<img id="'+$(this).attr('href')+'" title="Star" src="http://www.gosugamers.net/bilder/silk/star.png" style="cursor:pointer;float:right;margin-right: 5px;">');
      $('a.topictitle').each(function(index) {
       img_id=$(this).attr('href').split('?');
       
       var stockname=$(this).text();
       if(GM_getValue('mystars')){
       var starsarray = JSON.parse(GM_getValue('mystars'));
       if(starsarray.hasOwnProperty(stockname)){
       var imgsrc=star_img;
       }else{var imgsrc=stargrey_img;}
       }else{starsarray={};imgsrc=stargrey_img}
       //var buttonid= img_id[1]
       $(this).before('<img class="star" name="'+stockname+'" id="'+img_id[1]+'" title="Star" src="'+imgsrc+'" style="cursor:pointer;float:right;margin-right: 5px;width:12px;height:12px">');
       
      });
      
$('.star').click(function(){
var idbuttonclicked = $(this).attr('id');
if($(this).attr('src')==star_img){$(this).attr("src", stargrey_img);RemoveStar($(this).attr('name'),idbuttonclicked)}
else if($(this).attr('src')==stargrey_img){$(this).attr("src", star_img);AddStar($(this).attr('name'),idbuttonclicked)}

}); 

break;
  }
}
}

function AddStar(name,parm){
if(GM_getValue('mystars')&&GM_getValue('mystars')!=''){
var starsarray = JSON.parse(GM_getValue('mystars'));
starsarray[name]=parm;
var starjson = JSON.stringify(starsarray, null, 2);
GM_setValue('mystars',starjson);
}else{
var z={};
z[name]=parm;
var starjson =JSON.stringify(z, null, 2);
GM_setValue('mystars',starjson);
}
}

function RemoveStar(name){
var starsarray = JSON.parse(GM_getValue('mystars'));
delete starsarray[name];
var starjson =JSON.stringify(starsarray, null, 2);
GM_setValue('mystars',starjson);

}

function ShowStars(){
$('#starscontainer').html('');
var starsarray = JSON.parse(GM_getValue('mystars'));
for(var name in starsarray) {
var href='http://www.beursig.nl/forum/viewtopic.php?'+starsarray[name]+'&view=unread#unread';
$('#starscontainer').append('<div style="white-space: nowrap;overflow:hidden;position:relative;text-align:center;border:1px solid #11A0E7;width:120px;margin:1px;float:left"><img name="'+name+'" class="staritem" title="Remove '+name+' from favourites"  style="cursor:pointer;width:10px;height:10px;position:absolute;left:2px;top:2px" src="'+close_img+'"><a href="'+href+'"><div style="padding-left:15px">'+name+'<div></a></div>');

}
$('.staritem').click(function(){
$(this).closest('div').fadeOut();
RemoveStar($(this).attr('name'));


})

}

function SetLastPage(page){
GM_setValue('page',page);
}

//theming
GM_addStyle((<><![CDATA[
   #sliderfish { border-bottom:1px solid #FE9A2E;background-color:#F7D358 }
   #triggerfish{font-weight:bold;color:white;text-align:center;background-color:black;}

   #menufish{background-color:#FF8000;}
   
   #sliderfish.bluetheme { border-bottom:2px solid #11A0E7;background-color:#CADCEB }
   #triggerfish.bluetheme{font-weight:bold;color:white;text-align:center;background-color:#11A0E7;}
   #menufish.bluetheme{background-color:#11A0E7;}
   

]]></>).toString());





