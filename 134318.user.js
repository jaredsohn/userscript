// ==UserScript==
// @name      MH - Iceberg Progress Info
// @author    Giuseppe Di Sciacca
// @version   1.014
// @include   http://mousehuntgame.com/*
// @include		https://mousehuntgame.com/*
// @include		http://www.mousehuntgame.com/*
// @include		https://www.mousehuntgame.com/*
// @include		http://apps.facebook.com/mousehunt/*
// @include		https://apps.facebook.com/mousehunt/*
// ==/UserScript==

if(document.getElementById('hud_location').children[0].innerHTML=='Iceberg')
{
  if (typeof jQ == 'undefined')//check if jQ is not already defined, maybe in another script of mine
    addJQueryToDocument(doIcebergPluginStuff);
  else
    doIcebergPluginStuff();
}



// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQueryToDocument(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.setAttribute("id", "jQueryScriptContainer");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.setAttribute("id", "jQueryRenameFunction");
    //I'll use jQ as an alias of jQuery since mousehunt loads jquery dinamically and conflicts with the script
    script.textContent = "var jQ=jQuery.noConflict();";
    document.body.appendChild(script);
    var script = document.createElement("script");
    script.setAttribute("id", "jQueryLoadedCallbackFunction");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function doIcebergPluginStuff() {
  jQ('div.depth').css('cursor','pointer');
  jQ('div.depth').click(function(){
    if(jQ('div.headsup').css('overflow')=='hidden')
    {
      jQ('div.headsup').css('overflow','visible');
      jQ('div.cutawayClippingMask').css('overflow','visible');
    }
    else
    {
      jQ('div.headsup').css('overflow','hidden');
      jQ('div.cutawayClippingMask').css('overflow','hidden');
    }
  });
  
  jQ(document).keyup(function(e){
      if(e.keyCode==27)
      {
        jQ('div.headsup').css('overflow','hidden');
        jQ('div.cutawayClippingMask').css('overflow','hidden');
      }
  }); 
  
  var feet=calculateIcebergPercentageProgress();
  setInterval(function(){
    if(parseInt(jQ('span.user_progress_container span.user_progress').html().replace(',',''),10)!=feet)
      feet=calculateIcebergPercentageProgress();
  },15000);//checks if there's the need to update every 15 seconds

  var huntsDone=parseInt(jQ('div.depth span.turnsTaken').html().replace(',',''),10);
  jQ('div.chest').mouseover(function(){
    jQ('div.icebergPercentageContainer').hide();
    if(jQ(this).children('div.help').html().indexOf(' hunts left)')<0 || huntsDone!=parseInt(jQ('div.depth span.turnsTaken').html().replace(',',''),10))
    {
      var stage=jQ('div.depth div.currentPhase').html();
      //if I'm updating I remove the old message in the brackets in order to add it again
      if(jQ(this).children('div.help').html().indexOf(' hunts left)')>0)
        jQ(this).children('div.help').html(jQ(this).children('div.help').html().replace(/\(\d{1,3}/,'').replace(' hunts left) ',''));
      //write the number of hunts left for the chest in the message
      var huntsForChest=parseInt(jQ(this).children('div.help').children('b').first().html().replace('Hunt #',''),10);
      huntsDone=parseInt(jQ('div.depth span.turnsTaken').html().replace(',',''),10);
      huntsForChest-=2;//huntsForChest-2=>at least 1 hunt for icewing and 1 for the last general that doesn't give you any feet
      var huntsLeft=huntsForChest-huntsDone;
      if(huntsLeft<0) huntsLeft=0;
      var avgForChest=(Math.round(180000/huntsForChest))/100;
      var feet=parseInt(jQ('span.user_progress_container span.user_progress').html().replace(',',''),10);
      if(feet<1800)
        var avgToHit=(Math.round((1800-feet)*100/huntsLeft))/100;
      else
        var avgToHit=0;
      var averageMsg='<br/>Required Average: ';
      if(getAverageFeet()>=avgForChest)
        averageMsg+='<span style="color:green">';
      else
        averageMsg+='<span style="color:red">';
      averageMsg+=avgForChest+'</span>';
      averageMsg+="<br/>Minimum average needed in the next hunts: "+avgToHit;
      jQ(this).children('div.help').html(jQ(this).children('div.help').html().replace('</b> to earn','</b> ('+huntsLeft+' hunts left) to earn')+averageMsg);
    }
  });
  jQ('div.chest').mouseout(function(){
    jQ('div.icebergPercentageContainer').show();
  });
  //div.waterline has z-index:4, div.iceberg has z-index 3, so I shouldn't be able to intercept anything on div.iceberg
  //cange z-index to 4 then
  jQ('div.icebergContainer div.iceberg').css('z-index',4);
  jQ(document).on('mouseover','div.iceberg',function(){
    jQ('div.icebergPercentageContainer').hide();
    if(jQ(this).children('div.help').length==0)
    {
      jQ(this).append('<div class="help"></div>');  
      //give same style as .icebergHud .timeline .chest .help
      jQ(this).children('div.help').attr('style','background: #EEEEEE; border: 1px solid #333333; border-radius: 10px; color: #000000; display: none; left: -65px; padding: 10px; position: absolute; top: 20px; width: 150px;');
      //adjust a bit
      jQ(this).children('div.help').css('top','34px').css('left','-55px');
    }
    var stage=jQ('div.depth div.currentPhase').html();
    var feet=parseInt(jQ('span.user_progress_container span.user_progress').html().replace(',',''),10);
    var huntsDone=parseInt(jQ('div.depth span.turnsTaken').html().replace(',',''),10);
    if(feet<1800 || (feet==1800 && stage=='General') )
      huntsForChest=247;//250-deep mouse-icewing-general
    else
      huntsForChest=248;//250-deep mouse-icewing //not 249 since the div.iceberg disappears after icewing
    var huntsLeft=huntsForChest-huntsDone;
    var avgForChest=(Math.round(200000/huntsForChest))/100;
    if(huntsLeft>0)
      var avgToHit=(Math.round((2000-feet)*100/huntsLeft))/100;
    else
      var avgToHit=0;
    //build message
    var averageMsg='<span style="font-weight:bold;">Deep Mouse</span>:';
    averageMsg+='<br/>Required Average: ';
    if(getAverageFeet()>=avgForChest)
      averageMsg+='<span style="color:green">';
    else
      averageMsg+='<span style="color:red">';
    averageMsg+=avgForChest+'</span>';
    if(avgToHit>0)
      averageMsg+='<br/>Minimum average needed in the next hunts: '+avgToHit;
    else
      averageMsg+='<br/>Hunt #'+huntsDone+', you cannot reach the Deep Mouse anymore :(';
    jQ(this).children('div.help').html(averageMsg).show();
  });
  jQ(document).on('mouseout','div.iceberg',function(){
    jQ('div.icebergPercentageContainer').show();
    jQ(this).children('div.help').hide();
  });
  function calculateIcebergPercentageProgress(){
    var feet=parseInt(jQ('span.user_progress_container span.user_progress').html().replace(',',''),10);
    var stagePerc=0;
    var stageMissing=0;
    var totalPerc=(Math.round(feet/0.18))/100;
    var totalAvg=getAverageFeet(feet);
    var totalMissing=1800-feet;
    var stage=jQ('div.depth div.currentPhase').html();
    var progressMessage = '';
    if(stage=='Hidden Depths')
    {
      stagePerc=(Math.round(feet/0.02))/100;
      stageMissing=200-feet;
      progressMessage = '<br /><b>Stage progress:</b> '+stagePerc+'% - '+stageMissing+' feet to go';      
    }
    else if(stage=="Icewing's Lair" || stage=='The Deep Lair')
    {
      progressMessage = '<br /><b>Stage progress:</b> 100%';
    }
    else
    {
      if(stage=='Treacherous Tunnels')
      {
        stagePerc=(Math.round(feet/0.03))/100;
        stageMissing=300-feet;
      }
      else if(stage=='Brutal Bulwark')
      {
        stagePerc=(Math.round((feet-300)/0.03))/100;
        stageMissing=600-feet;
      }
      else if(stage=='Bombing Run')
      {
        stagePerc=(Math.round((feet-600)/0.1))/100;
        stageMissing=1600-feet;
      }
      else if(stage=='The Mad Depths')
      {
        stagePerc=(Math.round((feet-1600)/0.02))/100;
        stageMissing=1800-feet;
      }
      if(stagePerc>0 || stageMissing>0)//if in a known stage
        progressMessage = '<b>Total progress:</b> '+totalPerc+'% - '+totalMissing+' feet to go<br /><b>Stage progress:</b> '+stagePerc+'% - '+stageMissing+' feet to go';
      else if(stage=='General')
        progressMessage = '<b>Total progress:</b> '+totalPerc+'% - '+totalMissing+' feet to go<br /><b>Stage progress:</b> 100% - <b>General</b>';
    }
    
    if(jQ('div.cutaway div.icebergPercentageContainer').length==0)//need to create the progress div?
      jQ('div.cutaway').append('<div class="icebergPercentageContainer" title="Average: '+totalAvg+' feet per hunt" style="position:absolute; z-index:25; top:4px; left:29px; color:#FFF; text-shadow:#000 0px 1px 2px">'+progressMessage+'</div>');
    else//just update it
      jQ('div.cutaway div.icebergPercentageContainer').html(progressMessage).attr('title','Average: '+totalAvg+' feet per hunt');
    
    return feet;
  }
  function getAverageFeet(feet){
    if(feet==undefined)//the only purpose of this parameter is for optimization, to avoid retrieving it everytime
      feet=parseInt(jQ('span.user_progress_container span.user_progress').html().replace(',',''),10);
    var totalHunts=parseInt(jQ('div.depth span.turnsTaken').html().replace(',',''),10);
    if(totalHunts==0)
      totalHunts=1;//for average, just to avoid division by zero
    return (Math.round((feet*100)/totalHunts))/100;
  }
}    