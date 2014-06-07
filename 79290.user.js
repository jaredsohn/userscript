// ==UserScript==
// @name           8bc multiplayer
// @namespace      8bc
// @description    add a mutiple player on some 8bc pages
// @version        1.5.2
// @include        http://8bc.org/*  
// @include        https://8bc.org/*
// ==/UserScript==
var script_version="1.5.2";

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
      
      //syncronised XHR (easy way scripting, looser >_<)
      function $get_sync(url){
        var xhr_object = new XMLHttpRequest(); 
        xhr_object.open("GET", url, false); 
        xhr_object.send(null); 
        if(xhr_object.readyState == 4) return xhr_object.responseText;
        else return null;
      }
      
      //asyncronised XHR (aka. winner scripting, ^_^)
      function $get_async(url,handler,obj){
        
        var xhr_object = new XMLHttpRequest(); 
        xhr_object.open("GET", url, true);
        xhr_object.onreadystatechange = function(){$get_async_h(xhr_object,handler,obj);};
        xhr_object.send(null);
      }
      function $get_async_h(xhr_object,handler,obj){
       if (xhr_object.readyState == 4){
           if (xhr_object.status == 200){
              if(obj==null)handler(xhr_object.responseText);
              else obj[handler](xhr_object.responseText);
           }else{
              if(obj==null)handler("fail");
              else obj[handler]("fail");
           }
        }
      }
      
      //cookies stuff
      function set_cookie(name,value){
        var date=new Date();
        var days=365;
        date.setTime(date.getTime()+(days*24*60*60*1000));
        document.cookie = name+"="+escape(value)+";expires="+date.toGMTString()+";path=/;domain=";
      }
      function get_cookie(cookie_name){
        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
        if (results)return unescape(results[2]);
        else return null;
      }
      
//updater Script (FF,chrome & opera compatible homebrew)
function ScriptUpdater(prefs){

    this.script_version=script_version;
    this.updateChoices=['major','minor','fixes'];
    this.updateOn='minor';
    
    if(prefs!=null)this.updateOn=prefs.updateOn;
    

    this.checkUpdate=function(){
       $get_async('http://www.baronnies.be/dev/8bc.php','checkUpdateHandler',su);
       
       //cross-domain request (GreaseMonkey only)
       /*
console.info('GM_xmlhttpRequest?');
       GM_xmlhttpRequest({
            method: 'GET',
      	    url: 'http://www.baronnies.be/dev/8bc.php',
      	    onload: function(xpr) {su.checkUpdateHandler(xpr.responseText);}
        });
       */
    }
    this.checkUpdateHandler=function(code){ 
        code = code.split('\n');
        for(var detailNum in code){
            var detail = code[detailNum];
            if(detail.indexOf('@version')!=-1){
               var version=detail.substr(detail.indexOf('@version')+8).trim();
               this.check_version(version);
            }
        }
    }
    this.check_version=function(online_version){ 
      var local_v=this.script_version.split('.');
      var distant_v=online_version.split('.');
      if(local_v[2]==null)local_v[2]=0;
      if(distant_v[2]==null)distant_v[2]=0;
  
      if(parseInt(distant_v[0])>parseInt(local_v[0]))this.proposeUpdate(online_version);
      else if(this.updateOn=='minor' && parseInt(distant_v[1])>parseInt(local_v[1]))this.proposeUpdate(online_version);
      else if(this.updateOn=='fixes' && parseInt(distant_v[2])>parseInt(local_v[2]))this.proposeUpdate(online_version);
    }
    this.proposeUpdate=function(online_version){
      console.info('proposal:'+this.script_version+' => '+online_version);
      if(confirm("New multiplayer version available !\nWant to get it ? (new tab)")){
          form = document.createElement("form");
          form.method = "GET";
          form.action = "http://userscripts.org/scripts/show/79290";
          form.target = "_blank";
          document.body.appendChild(form);
          form.submit();
      };
    }
}

//classes
function  Song(){

  this.pageURL;
  this.mp3URL; 
  this.name;
  this.parent;
  
  this.setPageUrl=function(url){    
      this.pageURL=url;
      this.getTitleFromUrl();
      this.getmp3URLAsynch();
  }
  
  this.getmp3URLAsynch=function(){
    $get_async(this.pageURL,"getMp3FromSource",this);
  }
  this.getMp3FromSource=function(source){
    if(source!=null && source!="fail"){
      source=source.substr(source.indexOf('value="mp3='));
      if(source.length==1){//pas de chanson dans cette page !
        this.parent.songLoaded();
      }else{
        this.mp3URL=source.substring('value="mp3='.length,source.indexOf('&amp;'));   
        this.parent.songLoaded();
      }
    }else{
      //erreur 404 et tout le bataclan !
      this.parent.songLoaded();
    }
  }
  
  this.getTitleFromUrl=function(){
    var link=this.pageURL.substr(this.pageURL.indexOf("8bc.org/music/")+14).replace('/',' - ').replace('/','');
    while(link.indexOf('+')!=-1)link=link.replace('+',' ');//renplace les + par des espaces
    link = unescape(link);//enlève les %F3 et autre conneries
    this.name = link;                         
  }
}

function SongHandler(prefs){
                           
  this.columnSearchPattern; //pattern XPath to found the component where to create a DIV to place the player on the page
  this.linksPattern;        //pattern XPath to found all the music pages links
  this.loadingCount=0;  
  this.linksToCheck=0;//set to the number of the page OR the maximium defined
  
  this.prefz=prefs;
  this.player=new Player();
  this.songs=[];
  
  
  this.init=function(){     
console.info('init 0'); 
    //Construct GUI
    this.getPatternsForLocation(); 

console.info('init 1');     
    this.createPlayerPlace();

console.info('init 2');     
    this.prefz.insertPrefBox();

console.info('init 3');     
    this.player.prefz=this.prefz;

console.info('init 4'); 
    
    if(this.prefz.autoLoad==1){
       this.loadSongs();
    }else{
       this.setLoadingMessage('<br/><br/><br/><a id="playerLoadLink" href="#">Click Here to Load Tracks</a>'); 
       $('playerLoadLink').addEventListener("click",function(){sh.loadSongs();},false);
    }
  }
  
  this.loadSongs = function(){
    this.setLoadingMessage('Loading songs, please wait...');
    this.getSongs();
  }

  this.getPatternsForLocation=function(){
    var adress = window.location+"";
    
    //member page ?
    if(adress.match(/^https?:\/\/8bc.org\/members\/.*$/gi)){
        this.columnSearchPattern='//div[@class="col2"]';
        this.linksPattern='//td[@class="title"]/a';
    
    //search page ?
    }else if(adress.match(/^https?:\/\/8bc.org\/search\.php\?s=.*$/gi)){
        this.columnSearchPattern='//div[@id="primary"]';
        this.linksPattern='//td[@class="info"]/a';
    
    //main page or music page
    }else if(adress.match(/^https?:\/\/8bc.org(\/music)?\/?#?$/gi)){
            this.columnSearchPattern='//div[@class="col1"]';
            this.linksPattern='//td[@class="title"]/a';
    }

  }
  this.createPlayerPlace=function(){              
    var mainColumn=$X(this.columnSearchPattern);
    
    addCssRule('#multiplayer','{width:370px;'
                              +'height:220px'
                              +'}');                  
    addCssRule('#mp_header ul','{width:100%;'
                               +'height:100%;' 
                               +'margin:0 0 0 2px;' 
                               +'padding:0;'      
                               +'}');         
    addCssRule('#mp_header ul li','{display:inline-block;'
                                  +'border-color:white white #E100A7;'
                                  +'border-style:solid;' 
                                  +'border-width:1px;'   
                                  +'color:#E100A7;'   
                                  +'font-weight:bold;'  
                                  +'height:100%;'
                                  +'text-align:center;'   
                                  +'width:120px;'         
                                  +'cursor:pointer;'
                                  +'}');         
    addCssRule('#mp_header ul li:HOVER','{color:white;'  
                                        +'background-color:#E100A7'
                                        +'}');   
    addCssRule('#mp_prefs, #mp_about','{height:0}');  
    addCssRule('#mp_player, #mp_prefs, #mp_about','{overflow:hidden}');
    
    addCssRule('#mp_about div','{margin:30px;padding:5px;border:1px dotted #E200A6}');  
    
    addCssRule('#mp_player','{text-align:center}');
                                                                                              
                                  
    myDiv=mainColumn.insertBefore(document.createElement("div"),mainColumn.firstChild);
    myDiv.setAttribute("id", "multiplayer");
    
    myDiv.innerHTML="<div id='mp_header'>"+
                    "<ul id='mp_header_list' ><li>Player</li><li>Preferences</li><li>About</li></ul>"+
                    "</div>"+
                    "<div id='mp_player'>"+
                    "</div>"+
                    "<div id='mp_prefs'>prefz"+
                    "</div>"+
                    "<div id='mp_about'>"+    
                    "<div>"+
                    "scripting by <a href='http://8bc.org/members/krapock/'>Krapock</a><br/><br/>"+
                    "<ul><li><a href='http://8bc.org/forums/viewtopic.php?pid=324942#p324942'>8bc forum thread</a></li>"+
                    "<li><a href='http://userscripts.org/scripts/show/79290'>userscript page</a></li></ul>"+ 
                    "<br/>"+
                    "This script is GPLed, use an abuse at your will"+
                    "</div>"+
                    "</div>";
                    
    $('mp_header_list').childNodes[0].addEventListener("click",function(){sh.toggleToTab('mp_player');},false);
    $('mp_header_list').childNodes[1].addEventListener("click",function(){sh.toggleToTab('mp_prefs');},false);
    $('mp_header_list').childNodes[2].addEventListener("click",function(){sh.toggleToTab('mp_about');},false);
    
//console.info("pref element:"+$('mp_prefs'));                                      
    this.prefz.container=$('mp_prefs');   
//console.info("player element:"+$('mp_player')); 
    this.player.container=$('mp_player');
    
  }
  this.toggleToTab=function(tabID){
      var tabz=$xs('//div[@id="multiplayer"]/div[@id!="mp_header"]');
      for(var tabNum in tabz){
         tabz[tabNum].style.height='0';
      }
      $(tabID).style.height='100%';
  }
  this.setLoadingMessage=function(msg){
       this.player.container.innerHTML=msg;
  }
  
  this.getSongs=function(){   
//console.info('sh.getSongs !');    
    var rawlinkz=$xs(this.linksPattern);
//console.info('nombre de lien (de chansons ?) : '+rawlinkz.length);    
    for(var link in rawlinkz){
        if((""+rawlinkz[link]).indexOf("//8bc.org/music/")!=-1){//-> si c'est bien des musiques (et pas des images)
//console.info('est une chanson > '+link);         
          if(this.linksToCheck<this.prefz.lengthLimit){
            this.linksToCheck++;
//console.info('addingSong ?');            
            this.addSong(""+rawlinkz[link]);
          }
        }
    }
  }
  this.addSong=function(pageUrl){
    var s = new Song();    
    s.parent=this;
    s.setPageUrl(pageUrl);
    this.songs.push(s);
  }
  
  this.songLoaded=function(){
    if(++this.loadingCount==this.linksToCheck){
      this.setLoadingMessage('Loading songs, please wait...('+this.loadingCount+'/'+this.linksToCheck+')');
      this.createPlayer();
    }else{
      this.setLoadingMessage('Loading songs, please wait...('+this.loadingCount+'/'+this.linksToCheck+')');
    }
  }
  
  this.createPlayer=function(){
       for(songNum in this.songs){
        this.player.addSong(this.songs[songNum]);
       }
       this.player.createPlayer();
  }
  
}

function Preferences(){  

  this.autoplay=0;  //0 = no   1=true
  this.shuffle=0; //0 = no   1=true    2='intelligent' shuffle
  this.lengthLimit=100; //maximum number of links to dig      
  
  this.autoLoad=1;
  this.updateOn='minor';
                     
  this.container;   
  
  
  this.getPrefsFromCookies=function(){
    //config (getting prefs and setting the rest)
    if(get_cookie("krapock_ap"))this.autoplay=get_cookie("krapock_ap");
    else set_cookie("krapock_ap",this.autoplay);
    
    if(get_cookie("krapock_shf"))this.shuffle=get_cookie("krapock_shf");
    else set_cookie("krapock_shf",this.shuffle);
    
    if(get_cookie("krapock_ll"))this.lengthLimit=get_cookie("krapock_ll");
    else set_cookie("krapock_ll",this.lengthLimit); 
    
    if(get_cookie("krapock_al"))this.autoLoad=get_cookie("krapock_al");
    else set_cookie("krapock_al",this.autoLoad);   
    
    if(get_cookie("krapock_updater"))this.updateOn=get_cookie("krapock_updater");
    else set_cookie("krapock_updater",this.updateOn);
  }
  
  this.insertPrefBox=function(){
     if(this.container!=null){
     //console.info("prefs element:"+this.container); 
       addCssRule('#mp_prefs table','{margin:2px auto;'
                                    +'width:98%;}'); 
       addCssRule('#mp_prefs th','{background-color:black;'
                                 +'border-bottom:1px solid #FFFFFF;'
                                 +'color:white;'
                                 +'font-variant:small-caps;'
                                 +'padding:3px;'
                                 +'text-align:center;'
                                 +'font-weight:bold;}');
       addCssRule('#mp_prefs td','{padding:1px;'
                                 +'width:50%;'
                                 +'text-align:center;}');

       var prefCode="<table>"  
                   +" <tr><th colspan='2'>Player</th></tr>"
                   +" <tr><td>Auto-play</td><td><input id='prefAP' type=\"checkbox\" "+((''+this.autoplay=='1')?"checked='checked'":"")+"  /></td></tr>"
                   +" <tr><td>Shuffle</td><td><input id='prefShuffle' type=\"checkbox\" "+((''+this.shuffle=='2')?"checked='checked'":"")+"  /></td></tr>"   
                   +" <tr><td>Tunes Number</td><td><input style=\"width:30px\" id='prefLenghtLimit' type=\"text\" value='"+this.lengthLimit+"'  /></td></tr>"
                   +"</table>"   
                   +"<br />"  
                   +"<table>"       
                   +"<tr><th colspan='2'>Other</th></tr>"
                   +"<tr><td>Auto-load</td><td><input id='prefAutoLoad' type=\"checkbox\" "+((''+this.autoLoad=='1')?"checked='checked'":"")+"  /></td></tr>"
                   +"<tr><td>Pop-up for Update on</td>"
                   +"  <td><select id='prefUpdater'>"
                   +"     <option value='major' "+((this.updateOn=='major')?"selected='selected'":"")+">Major Releases</options>"
                   +"     <option value='minor' "+((this.updateOn=='minor')?"selected='selected'":"")+">Minor Releases</options>"
                   +"     <option value='fixes' "+((this.updateOn=='fixes')?"selected='selected'":"")+">Fixes Releases</options>"
                   +"  </select></td></tr>"
                   +"</table>";
                   
console.info(prefCode);                   
                        
       this.container.innerHTML=prefCode;                               
        
       $('prefAP').addEventListener("change",function(){sh.prefz.checkPrefz();},false);
       $('prefShuffle').addEventListener("change",function(){sh.prefz.checkPrefz();},false);
       $('prefLenghtLimit').addEventListener("change",function(){sh.prefz.checkPrefz();},false);
       $('prefAutoLoad').addEventListener("change",function(){sh.prefz.checkPrefz();},false);
       $('prefUpdater').addEventListener("change",function(){sh.prefz.checkPrefz();},false);
     }
  }
  this.checkPrefz=function(){
     this.change_pref('autoplay',$('prefAP').checked);
     this.change_pref('shuffle',$('prefShuffle').checked);
     this.change_pref('lengthLimit',$('prefLenghtLimit').value);  
     this.change_pref('autoload',$('prefAutoLoad').checked);
     this.change_pref('updateon',$('prefUpdater').value);
  }
  this.change_pref=function(prefName,value){
   if(prefName=='autoplay'){
     if(''+value=='true' || ''+value=='on' || ''+value=='checked' || ''+value=='1')this.autoplay=1;
        else this.autoplay=0;
        set_cookie("krapock_ap",this.autoplay);
        
     }else if(prefName=='shuffle'){
        if(''+value=='true' || ''+value=='on' || ''+value=='checked' || ''+value=='1')this.shuffle=2;
        else this.shuffle=0;
        set_cookie("krapock_shf",this.shuffle);   
        
     }else if(prefName=='lengthLimit'){   
        if(!isNaN(parseInt(value)))value=parseInt(value);
        else value=25;
        //checkz:
        if(value<1)value=25;
        if(value>256)value=25;
                            
        set_cookie("krapock_ll",value);
        
        $('prefLenghtLimit').value=value;  
    }else if(prefName=='autoload'){
        if(''+value=='true' || ''+value=='on' || ''+value=='checked' || ''+value=='1')this.autoLoad=1;
        else this.autoLoad=0;
        set_cookie("krapock_al",this.autoLoad);
    }else if(prefName=='updateon'){
        this.updateOn=value;
        set_cookie("krapock_updater",this.updateOn);
    }   
  }
  

  //constructor
  this.getPrefsFromCookies();
  
}

function Player(){
  this.urlString="";
  this.titlesString="";
  this.prefz;
  this.container;
  
  this.addSong=function(song){
    if(this.urlString!="")this.urlString+="|";
    this.urlString+=song.mp3URL;
    
    if(this.titlesString!="")this.titlesString+="|"; 
  //remplace les "<>|& par des ”〈〉ǀand pour l'intégration du lecteur.Ces ponctuations foireuses sont trouvables là -> http://fr.wikipedia.org/wiki/Ponctuation
    this.titlesString += unescape(song.name).replace(/"/g,"”").replace(/</g,"〈").replace(/>/g,"〉").replace(/\|/g,"ǀ").replace(/\&/g,"and");
  }
  
  this.createPlayer=function(){
    if(this.prefz!=null && this.container!=null && this.urlString!=null){       
//console.info("player container:"+this.container); 
        this.container.innerHTML=''
        +'<object type="application/x-shockwave-flash" data="http://flash-mp3-player.net/medias/player_mp3_multi.swf" height="200px" width="370px">'
        +'  <param name="movie" value="/player_mp3_maxi.swf">  <param name="bgcolor" value="#ffffff">'
        +'  <param name="FlashVars" value="mp3='
        +this.urlString
        +'&amp;title='
        +this.titlesString
        +'&amp;height=200&amp;width=370&amp;showinfo=1&amp;shuffle='
        +this.prefz.shuffle
        +'&amp;showlist=1&amp;loop=1'
        +'&amp;autoplay='
        +this.prefz.autoplay
        +'&amp;showvolume=1&amp;showloading=always&amp;buttonwidth=30&amp;volumeheight=10&amp;showplaylistnumbers=0'
        +'&amp;loadingcolor=f987da&amp;bgcolor1=ffffff&amp;bgcolor2=ffffff&amp;slidercolor1=e039b4&amp;slidercolor2=e039b4&amp;sliderovercolor=ff00ba&amp;buttoncolor=e039b4&amp;buttonovercolor=ff00ba&amp;textcolor=ff00ba&amp;playlistcolor=ffffff&amp;currentmp3color=ba00ff&amp;scrollbarcolor=f7a2e0&amp;scrollbarovercolor=ff00ba">'
        +'  </object>';
    }
  }
}
                                                                                                                        
/////////////////////////////////////////////////////////bootstrap////////////////////////////////////////////////////////////
                      
var prefz = new Preferences();
                       
var su=new ScriptUpdater(prefz);
su.checkUpdate();


var sh = new SongHandler(prefz);
sh.init();