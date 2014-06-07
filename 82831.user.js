// ==UserScript==
// @name           SkreemR simplifier
// @namespace      skreemr
// @description    remove all of uselessity from SkreemR
// @version        0.2
// @include        http://skreemr.org/*
// ==/UserScript==
                           
      //standard utils
      
      //micro alias for document.getElementById !
      function $(id){
        return document.getElementById(id);
      }
      
      function addCssRule(selector,rule){
        var lastrule = document.styleSheets[0].cssRules.length;
        document.styleSheets[0].insertRule(selector + rule, lastrule);
      }
      
      //get specified elementS by Xpath
      function $xs(p, context) {
          if (!context) context = document;
          var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
          return arr;
      }
      //get first element by Xpath
      function $X(p, context) {
          return $xs(p, context)[0];
      }
      
function Simplifyer(){
      
      this.init = function(){
           this.removeAds();
           this.removeAmazonLinks();
           this.removeRingtones();
           this.removeFoundAt();
           
           this.maximiseTablesWidth();
           
           this.moveGroupAlbum();
           this.addLinks();
      } 
      
      this.remove = function(xpath){
          var unwanteds=$xs(xpath);
          for(var i=0;i<unwanteds.length;i++){
              var unwanted = unwanteds[i];
              unwanted.parentNode.removeChild(unwanted);
          }
      } 

      this.removeAds = function(){
           this.remove("//body/descendant::*/script/..|//embed");  //tout les descendant de <body> qui contiennent une balise <script> sont des pubs :)  ... et les "embed aussi d'ailleurs"
      }
      
      this.removeAmazonLinks = function(){
           this.remove("//p[@class='album']/../div");
      }
      this.removeRingtones = function(){
           this.remove("//a[@class='ringtone']/../..");
      }
      this.removeFoundAt = function(){
        this.remove("//div[contains(.,'Found at:')]");
      }
      
      this.maximiseTablesWidth = function(){
        var tables = $xs("//table");
        for(var i=0;i<tables.length;i++)tables[i].style.width='100%';
      }
      
      this.addLinks = function(){
        var playaz = $xs("//object[@data='audio/player.swf']"); //selects tables where there is a player
        for(var i=0;i<playaz.length;i++){
          var playa=playaz[i];
          var url=$X("./param[@name='FlashVars']/@value",playa).value.split('soundFile=')[1];
          var titleTable = playa.parentNode.parentNode.parentNode.parentNode;
          var titleLine = $X(".//h2/a/..",titleTable);
          titleLine.innerHTML+="<a href=''><img src='http://ultracopier-fr.first-world.info/images/download.png' alt='Link'/></a>";
        }
      }
      
      this.moveGroupAlbum = function(){
        var albz = $xs("//p[@class='album']"); //selects "album" infos
        for(var i=0;i<albz.length;i++){
          var album=albz[i];
          var tag=' ('+$X("./a[1]",album).innerHTML+'/'+$X("./a[2]",album).innerHTML+')';
          var titleTable = album.parentNode.parentNode.parentNode.parentNode;
          var titleLine = $X(".//h2/a/..",titleTable);
          titleLine.innerHTML+=tag;
          
          console.info(tag);
        }
        
        this.remove("//p[@class='album']");
      }
      
      this.init();
}

var simplifier = new Simplifyer();      