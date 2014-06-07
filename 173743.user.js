// ==UserScript==
// @name        Plug.dj Ultimate
// @namespace   whatever
// @description Increases the user experience with Plug.dj radio
// @include     http://plug.dj/*
// @version     1.6
// ==/UserScript==

/*
  TODO:
    auto zdraveni fanousku
      - nemuzu najit seznam mych fanouskus
    docasny mute
      - hudba se nespusti po zmene pisnicky
        - onYTFrameLoaded?
          - nefunguje
      - udelat event pro zmenu volume -done
    Funkce getEvent pro presunuti eventu na moj tridu - done
      - obj.onSomethingEv = obj.onSomething; obj.onSomething = function() {...; this.onSomethingEv()}
    UI
    Databazovy dotazy na seznam uzivatelu
    API pro playlisty
    
    
*/
/*
  Uzitecny veci
    - window.Models.room.userIsPlaying  - jestli hraje
    - 
*/
/*Changelog*/
/*
  1.5
    - fixed most problems with new version of plug.dj
    - the song mute button does not work now
    - finished the preparations for settings
    - added meh/woot tooltip to the class object
  1.6
    - added simple settings UI that allows
      - can turn on/off auto DJing
      - can set automatic votes to positive, negative or disable them
*/

function DJ_BOT() {
    this.settings = {
        auto_vote: 0,                           //1 for auto woot, 0 for nothing, -1 for auto meh
        auto_dj: true,

        show_user_count: true,                  //Display user count after roon name?
        chat_flag_url: "http://u8.8u.cz/images/flags/",  //Path to chat flag directory
        chat: {
          filters: [
             //Does not work yet
             {name:null, text:/AutoWoot: http:\/\/adf\.ly\/[a-zA-Z]+.*?/i, action:false, del:true}
          ],
          //Does not work yet
          greet_fans: false,
          
          
        },
        title: {
          patterns: [
            //Number represents ammount of seconds
            [5, "$QUEUEPOS/$QUEUELENGTH | $SONGTITLE"],
            [2, "$QUEUEPOS/$QUEUELENGTH | By: $SONGARTIST"],
            //[2, "$QUEUEPOS/$QUEUELENGTH | Plug.dj"]
          ]
        
        }
    }
    
    this.info = {
      song: {
          name: "Unnamed",
          id:"-1",
          author:"Noone",
          duration: 0,
          started: 0
      },
      queue: ["?","?"],
      room_name: null,
      votes: {up:[],down:[]},
      user_count: 0
    };
    var _this = this;
    var api_ready = false;
    var me = null;
    
    var vote_tooltip = null;
    
    //Settings related variables
    var settings_div = null;
    var setings_button = null;
    var settings_open = false;
    
    this.initEvents = function() {
        /*DJ/WAIT LIST/SONG CHANGE event*/
        API.bind(API.DJ_UPDATE, onDjListUpdate);
        API.bind(API.WAIT_LIST_UPDATE, onDjListUpdate);
        API.bind(API.DJ_ADVANCE, onDjListUpdate);
        //Member count display
        API.bind(API.USER_JOIN, onUserJoin);
        API.bind(API.USER_LEAVE, onUserLeave);
        //Votes
        assignTooltip(document.getElementById("room-score-positive"),getVoteHtml, vote_tooltip, true);
        assignTooltip(document.getElementById("room-score-negative"),getVoteHtml, vote_tooltip, true);
        API.bind(API.VOTE_UPDATE, onVoteChange);
        //Chat
        API.bind(API.CHAT, onChat);
        //Non-api events
        /*this.stealEvent(window.Playback, "onYTFrameReady", "playerready");
        this.addEventListener("playerready", function() {console.log("Youtube player is ready.");});  */
        
        //Test
         /*
        this.stealEvent(window.Playback, "playbackComplete", "playbackcomplete");
        this.addEventListener("playbackcomplete", function() {console.log("The song is over.");}); */
    }
    this.init = function() {
        //Load all the data and display what is to be displayed
        function init() {
           //It the API is not initialised...
           if(typeof API != "object"||API.getUser().username == null) {
             //Poll for initialisation
             setTimeout(init, 300);
             return false;      
           }
           _this.info.user_count = API.getUsers().length;
           me = API.getUser();
           _this.createUI();
           _this.initEvents();
           onUserSwitch();
           onDjListUpdate();
           onVoteChange();
           _this.updateTitle();
           
           
        }
        setTimeout(init,200);
    }
    this.createUI = function() {
        //Mute song button

        //Vote info tooltip
        vote_tooltip = document.createElement("div");
        vote_tooltip.style.position = "absolute";
        vote_tooltip.style.backgroundColor = "rgba(0,0,0,0.8)";
        vote_tooltip.style.border = "1px solid black";
        vote_tooltip.style.minWidth = "100px";
        vote_tooltip.style.minHeight = "40px";
        vote_tooltip.style.zIndex = "9999999";
        vote_tooltip.style.display = "none";
        vote_tooltip.innerHTML = "Tooltip";
        document.body.appendChild(vote_tooltip);
        
        //Settings
        /*PRIVATE CODEX*/
        
        settings_div = document.createElement("div");
        settings_div.style.backgroundImage = "url(\"http://u8.8u.cz/images/plug.dj/blood_stains.png\")";
        settings_div.style.backgroundColor = "black";
        settings_div.style.width = "300px";
        settings_div.style.height = "400px";
        settings_div.style.position = "absolute";
        settings_div.style.zIndex = "9999999";
        settings_div.style.overflow = "auto";
        settings_div.style.display = "none";
        settings_div.style.left = "50%";                                
        settings_div.style.marginLeft = "-100px";
        settings_div.appendChild(simpleDomNode("h2", "Wickerman's script settings"));
        
        var table = document.createElement("table");
        table.appendChild(simpleTableRow(
            [
            "Vote automatically", 
            simpleSelectElm(
              [
                [-1, "Negative", null, _this.settings.auto_vote<0],
                [0, "Don't vote", null, _this.settings.auto_vote==0],
                [1, "Positive", null, _this.settings.auto_vote>0],
              ],
              null,
              {"change": function() {_this.settings.auto_vote=1*this.options[this.selectedIndex].value;}}
              )
            ]
          )
        );
        table.appendChild(simpleTableRow(
            [
            "DJ automatically", 
            simpleDomNode(
              "input",
              null,
              null,
              {"change": function() {_this.settings.auto_dj=this.checked;}},
              {type: "checkbox", checked: _this.settings.auto_dj}
              )
            ]
          )
        );
        
        settings_div.appendChild(table);
        document.body.appendChild(settings_div);
        
        settings_button = document.createElement("div");
        settings_button.style.backgroundImage = "url(\"http://u8.8u.cz/images/plug.dj/hanging_skeleton_still.png\")";
        settings_button.style.backgroundColor = "black";
        settings_button.style.backgroundSize="28px 80px";
        settings_button.style.backgroundRepeat="no-repeat";
        settings_button.style.width = "97px";
        settings_button.style.height = "281px";
        settings_button.style.position = "absolute";
        settings_button.style.zIndex = "0";
        settings_button.style.overflow = "hidden";
        settings_button.style.display = "block";
        settings_button.style.left = "0px";                                
        settings_button.style.top = "0px";
        settings_button.addEventListener("mouseover", function() {this.style.backgroundImage = "url(\"http://u8.8u.cz/images/plug.dj/hanging_skeleton.gif\")";});
        settings_button.addEventListener("mouseout",  function() {this.style.backgroundImage = "url(\"http://u8.8u.cz/images/plug.dj/hanging_skeleton_still.png\")";});
        settings_button.addEventListener("click",  function() {_this.toggleSettings();});
        document.body.appendChild(settings_button);
        
        var settings_button_tooltip = document.createElement("div");
        settings_button_tooltip.style.position = "absolute";
        settings_button_tooltip.style.backgroundColor = "rgba(0,0,0,0.8)";
        settings_button_tooltip.style.border = "1px solid black";
        settings_button_tooltip.style.width = "100px";
        settings_button_tooltip.style.minHeight = "30px";
        settings_button_tooltip.style.zIndex = "9999999";
        settings_button_tooltip.style.display = "none";
        settings_button_tooltip.style.color = "#42A5DC";
        document.body.appendChild(settings_button_tooltip);
        assignTooltip(settings_button, "Click the skeleton to open or hide settings for The Wickerman's script.",settings_button_tooltip, true);


        window.document.addEventListener("keypress", 
          function(e) {
            if(e.keyCode==27&&settings_open) {
               _this.hideSettings();
            }
            console.log(e);
          }
        );
        /*PRIVATE CODEX END*/
    }
    /*Functional methods*/
    var this_song_muted = false;  //The mute can be unmuted on song change

    this.mute = function() {
      if(!window.Playback.isMuted) {
              //$("DIV#button-sound").click();
              window.Playback.onSoundButtonClick();
              //window.Playback.isMuted = true;
              //window.Playback.setVolume(0);
      }
    }
    this.unmute = function() {
      if(window.Playback.isMuted) {
              //$("DIV#button-sound").click();
              window.Playback.onSoundButtonClick();
              //window.Playback.isMuted = false;
              //window.Playback.setVolume(window.Playback.lastVolume);
      }
    }
    this.muteSong = function() {
      this_song_muted = true;
      this.mute();
    }
    this.unmuteSong = function() {
      if(this_song_muted) {
        this_song_muted = false;
        this.unmute();
      }
    }
    /*User interface methods*/
    this.showSettings = function() {
       if(typeof window.$ =="object") 
          $(settings_div).show();
       else
          settings_div.style.display = "block";
       settings_open = true;
    }
    this.hideSettings = function() {
       if(typeof window.$ =="object") 
          $(settings_div).hide();
       else
          settings_div.style.display = "none";
       settings_open = false;
    }
    this.toggleSettings = function() {
      if(settings_open)
        this.hideSettings()
      else 
        this.showSettings();
    }
    /*Title animation*/
    var title_iterator = 0;
    var title_interval_id = null;
    this.title_update_delay = 1000;
    this.updateTitle = function() {
      if(title_interval_id==null) {
         title_interval_id = setInterval(function() {title_iterator++; _this.updateTitle();}, 1000);
      }
    
      //Set up varibles
      var variables = [
        ["SONGTITLE", "SONGARTIST", "QUEUEPOS", "QUEUELENGTH", "USERSTOTAL", "NEGATIVE", "POSITIVE", "ROOMNAME"],
        [
          this.info.song.name,
          this.info.song.author,
          this.info.queue[0],
          this.info.queue[1],
          this.info.user_count,
          this.info.votes.down.length,
          this.info.votes.up.length,
          this.info.room_name
        ]
      ];
      //Turn string to regular expressions (they allow mass replacing)
      for(var i=0; i<variables[0].length; i++) {
        variables[0][i] = new RegExp("(\\$"+variables[0][i]+")","g");
      }
      //Find out how long one cycle is
      var pattern_period = 0;
      for(var i=0; i<this.settings.title.patterns.length; i++) {
        if(this.settings.title.patterns[i][2]==true)
          continue;
        pattern_period+=this.settings.title.patterns[i][0];
      }
      //Find where in cycle we are
      var pattern_iterator = 0;
      for(var i=0; i<this.settings.title.patterns.length; i++) {
        if(this.settings.title.patterns[i][2]==true)
          continue;
        //Add time of current template/pattern
        pattern_iterator+=this.settings.title.patterns[i][0];
        //Modulo divides infinite time in our periods, then we compare period phase with time of current template
        if(pattern_iterator>title_iterator%pattern_period) {
          /*ASSIGNING TITLE HERE!*/
          //I do not exit loop to save memory
          document.title = this.settings.title.patterns[i][1].replaceArray(variables[0], variables[1]);
          //console.log("Using pattern "+i)
          break;
        }
          
      }
      //console.log([pattern_period, title_iterator, (title_iterator%pattern_period)+">"+ pattern_iterator,]);
    }
    

    /*Events*/
    var events = {
      "votechange" : [],
      "userswitch" : [],
      "songchange" : [],
      "volumechange" : []
    }
    this.addEventListener = function(event_name, callback) {
       event_name = event_name.toLowerCase();
       if(events[event_name]==null)
         throw new Error("dj ultimate knows no such event: '"+event_name+"'");
       return events[event_name].push(callback);
    }
    this.removeEventListener = function(event_name, callback) {
       event_name = event_name.toLowerCase();
       if(events[event_name]==null)
         throw new Error("dj ultimate knows no such event: '"+event_name+"'");
       for(var i=0; i<events[event_name].length; i++) {
         if(event[event_name][i]==callback) {
           events[event_name].splice(i,1);
           break;
         }
       }
    }
    this.dispatchEvent = function(event_name) {
       event_name = event_name.toLowerCase();
       if(events[event_name]==null)
         throw new Error("dj ultimate knows no such event: '"+event_name+"'");
       for(var i=0; i<events[event_name].length; i++) {
         try {
           events[event_name][i]();
         }
         catch(e) {
         
         }
       }
    }
    //Replace the event within the plug.dj scripts with our own events (with preserving the old event)
    this.stealEvent = function(object, eventName, rename) {
      if(rename==null) {
        rename = eventName.toLowerCase().replace(/^on/, "");
      
      }
      if(events[rename]==null) {
        //Create new custom event for the event function
        events[rename] = [];
      }
      //Add the event to the event list
      object[eventName+"original"] = object[eventName].bind(object);
      events[rename].push(object[eventName+"original"]);
      //Replace the original event with a new one
      function theEvent(args) {
        _this.dispatchEvent(eventName.toLowerCase());
      }
      //Assigne the atributes of old event to the new one
      for(var key in object[eventName]) {
        theEvent[key] = object[eventName][key]; 
        object[eventName+"original"][key] = object[eventName][key]; 
      }
      console.log(object[eventName+"original"].toString(), events);
      //Assign the new event istead of the old one
      object[eventName] = theEvent;
    }
                                   
    function onVoteChange()
    {
       //Clean the vote arrays
       _this.info.votes.up = [];
       _this.info.votes.down = [];
       //Get all potential voters
       var users = API.getUsers();  
       //Check for vote value of the users
       for(var i=0; i<users.length; i++) {
          if(users[i].vote==1) {
             _this.info.votes["up"].push(users[i]);
          } 
          else if(users[i].vote==-1) {
             _this.info.votes["down"].push(users[i]);
          }
       }
    }
    function onUserJoin(user) {
       _this.info.user_count = API.getUsers().length;
       onUserSwitch(user);

    }
    function onUserLeave(user) {
       _this.info.user_count = API.getUsers().length;
       onUserSwitch(user);
    }
    function onUserSwitch(user) {
       if(_this.settings.show_user_count) {
         //Retrieve the text node for the room name
         var content = getTextNode(document.getElementById("current-room-value"));
         if(content==null)
           return;// console.log(document.getElementById("current-room-value").childNodes.length);
         //save room name
         if(_this.info.room_name==null) {
              _this.info.room_name = content.data;
         } 
         //Retrieve user count
         //var count = API.getUsers().length;
         //Write the output
         content.data = _this.info.room_name + " ("+_this.info.user_count+")";
       }
       if(_this.settings.chat.greet_fans) {
       
       
       }
       return;
    }
    function onDjListUpdate() {
        //Load your profile
        //var me = API.getUser();

        //Check if song is changed
        var song_data = realSongName();
        if(song_data.title!=_this.info.song.name) {
            //Update song name
            _this.info.song.name = song_data.title;
            _this.info.song.author = song_data.author;
            _this.info.song.id = song_data.cid;
            _this.info.song.duration = song_data.duration;
            onSongChange();
        }
        onQueueChange();
    }
    function onSongChange() {
        /**RUNS ON SONG CHANGE**/      
        //End any song-temporary settings
          //setTimeout(function() {_this.unmuteSong();}, 1000);   //Moved to the YTPlayerloaded event 

        //Reset vote counter
        _this.info.votes.up = [];
        _this.info.votes.down = []; 
        
        //Auto voting
        var current_dj_score = API.getDJs()[0]; 
        current_dj_score = current_dj_score.djPoints+current_dj_score.listenerPoints+current_dj_score.curatorPoints;
        if(_this.settings.auto_vote!=0) {
          if(_this.settings.auto_vote>0) {

              $("#button-vote-positive").click(); 
          }
          else
            $("#button-vote-negative").click(); 
        }
        //User defined events
        _this.dispatchEvent("songChange");
    }
    function onQueueChange() {
        //Create, sort and filter lists
        var list = API.getWaitList();
        var djs = API.getDJs();
        var queue = [];
        for(var i=list.length-1; i>=0; i--) {
          queue.push([list[i].id, list[i].username]);
        }
        for(var i=djs.length-1; i>=0; i--) {
          queue.push([djs[i].id, djs[i].username]);
        }
        
        //cFind yourself in the queue
        var position = -1;
        for(var i=0; i<queue.length; i++) {
          if(queue[i][0]==me.id)
            position = queue.length-i;
        }
        if(position == -1) {
            if(_this.settings.auto_dj)
              API.djJoin();
            _this.info.queue = ["N","A"];
            //console.log(me);
            //console.log(position+"/"+queue.length);
        }
        else
          _this.info.queue = [position,queue.length];
        _this.updateTitle();
    }
    function onChat(arg) {
      console.log(arg);
      //Add aditional data to chat object
      arg.elements = {main: null, text: null, nick: null};
      arg.user = API.getUser(arg.fromID); 
      //Parse HTML
      var list = document.getElementById("chat-messages").children;;//Chat.chatMessages[0].children;
      for(var i=0; i<list.length; i++) {
        if(list[i].className.indexOf(arg.chatID)!=-1) {
          arg.elements.main = list[i];
          arg.elements.text = list[i].getElementsByTagName("span")[1];
          arg.elements.nick = list[i].getElementsByTagName("span")[0];
        }
       }
       //Init flag image
       var img = document.createElement("img");
       //Falback flag with question mark
       img.onerror = function() {this.src = _this.settings.chat_flag_url+"unk.png";};
       //Try to correctly convert language and show the flag
       var lang = arg.user.language;
       lang = lang.replaceArray(["en", "cs", "el", "da", "sl"], ["gb", "cz", "gr", "dk", "si"]);
       img.title = lang;
       img.src = _this.settings.chat_flag_url+lang+".png";
       //Append flag after nick
       arg.elements.nick.appendChild(img);
       
       //Chat filter:
       function check_chat_match(msg, filter) {
          if(filter instanceof RegExp&&filter.test(msg)) {
             return true;
          }
          else if(typeof filter == "string") {
             return filter==msg;
          }
          else if(filter==null)
            return true;
          else
            return false;
       
       }
       for(var i=0; i<_this.settings.chat.filters.length; i++) {
         if(check_chat_match(arg.from, _this.settings.chat.filters[i].name)&&check_chat_match(arg.message, _this.settings.chat.filters[i].text)) {
            if(_this.settings.chat.filters[i].del&&me.permission>1) {
              APImoderateDeleteChat(arg.cid);
            }
            else if(_this.settings.chat.filters[i].action!=null) {
              if(_this.settings.chat.filters[i].action==false) {
                arg.elements.main.style.display="none";
              }
            }
         }
       }
    }
    /*Helper functions*/
    function getVoteHtml(elm) {
      //Determine the type
      var type = elm.id=="room-score-positive"?"up":"down";
      //Fill the caption
      var text = "<center style=\"color:"+(type=="up"?"#80A880":"#A87670")+"; font-weight: bold\">"+(type=="up"?"Woot!":"Meh...")+"</center>";
      //List all users
      for(var i=0; i<_this.info.votes[type].length; i++) {
        text+=_this.info.votes[type][i].username;
        if(i+1<_this.info.votes[type].length)
          text+="<br />";
      }
      //Wrap data in div
      return "<div style=\"color:"+(type=="up"?"#349C00":"#C41600")+"\">"+text+"</div>";
    }
    function simpleDomNode(tagName, textContent, css, events, properties) {
      var node = document.createElement(tagName);
      if(textContent!=null)
        node.innerHTML = textContent;
      setNodeData(node, css, events, properties);
      return node;    
    }
    function simpleSelectElm(options, css, events, properties) {
      var node = document.createElement("select");
      node.type = "select";
      setNodeData(node, css, events, properties);
      for(var i=0; i<options.length; i++) {
        if(options[i].innerHTML!=null)
          node.appendChild(options[i]); 
        else if(options[i].length!=null) {
          var opt = document.createElement("option");
          opt.value = options[i][0];
          opt.innerHTML = options[i][1];
          opt.disabled = options[i][2];
          opt.selected = options[i][3];
          node.appendChild(opt);
        }
        else if(typeof options[i]=="string") 
          node.appendChild(simpleDomNode("option", options[i]));      
      }
      return node;  
    }
    function simpleTableRow(cells, css, events) {
      var node = document.createElement("tr");
      setNodeData(node, css, events);
      for(var i=0; i<cells.length; i++) {
        if(cells[i].innerHTML!=null)
          node.appendChild(cells[i]);
        else if(typeof cells[i]=="string") 
          node.appendChild(simpleDomNode("td", cells[i]));      
      }
      return node;    
    }
    function setNodeData(node, css, events, properties) {
      if(typeof css == "object") {
        for(var property in css) {
          node.style[property] = css[property];     
        }
      }    
      if(typeof events == "object") {
        for(var event_name in events) {
          if(typeof events[event_name] == "function")
            node.addEventListener(event_name, events[event_name]);     
        }
      } 
      if(typeof properties == "object") {
        for(var property in properties) {
          node[property] = properties[property];     
        }
      }
    }
}
//(SELECT|DELETE) ([a-zA-Z0-8_]+,[ ]*)+([a-zA-Z0-8_]+) FROM `?[a-z_]+`?( WHERE ([a-zA-Z_]+[><=!](\-?[0-9]+|"[^"]+")(, |$))+)?
function db_table() {
    if(db==null||db.length==null)
      db = [];
    var template_object = {};
    var table = [];
    this.insert = function(input) {
       if(typeof input!="object")
         throw new Error("Expected object, obtained '"+(typeof input)+"'.")
       if(input.length!=null&&input.push!=null&&input.splice!=null) {
         for(var i=0; i<input.length; i++) {
            this.insert(input[i]);
         }
       }
       else {
         //Check if fields match the table
         for(var name in input) {
           if(template_object[name]==null)
             throw new Error("Javascript DB: unknown field in input object");
           if(input[name]!=null&&typeof template_object[name]!=typeof input[name])
             throw new Error("Javascript DB: Invalid field value (expected "+(typeof template_object[name])+" not "+(typeof input[name])+")");
         }
         table.push(input);
       }
    }
    /*
      fields = []
         -array of column names
      rules
         [
           [
             string affected_collumn
             string operation
             mixed compared value
           ]
         
         ]
       order
         [
            [
              string column_name
              int +1 or -1 for asc or desc
            ]
         ]
    */
    this.select = function(fields, rules, order) {
      var return_table = [];
      for(var i=0; i<table.length; i++) {
        
      
      
      }
    
    
    
    }
}
 
window.addEventListener("load", function() {
  window.DJ_ULTIMATE = new DJ_BOT();
  window.DJ_ULTIMATE.init();
});




function assignTooltip(element, callback, tooltip, cache) {
    element.addEventListener("mousemove", 
       function(event){showTooltip(event, cache?this.cachedTooltip:(typeof callback=="string"?callback:callback(element)), tooltip)}
    );
    element.addEventListener("mouseout", 
       function(event){tooltip.style.display="none";}
    );
    if(cache) {
      element.cachedTooltip=(typeof callback=="string"?callback:callback(element));
      element.addEventListener("mouseover", 
         function(event){this.cachedTooltip=(typeof callback=="string"?callback:callback(element))}
      );
    }
}
function showTooltip(event, content, tooltip) {
   var x, y;
   if (document.all!=null) { // grab the x-y pos.s if browser is IE
      x = event.clientX + document.body.scrollLeft;
      y = event.clientY + document.body.scrollTop;
   }
   else {  // grab the x-y pos.s if browser is NS
      x = event.pageX;
      y = event.pageY;
   }  
   tooltip.innerHTML = content;
   tooltip.style.top = (y*1+10)+"px";
   tooltip.style.left = (x*1+8)+"px";
   //console.log("Tooltip at ["+tooltip.style.top+", "+tooltip.style.left+"].");
   //console.log(tooltip);
   if(tooltip.style.display!="block") {
     tooltip.style.display = "block";
   }
}

var bands = ["diablo swing orchestra", "exodus", "cradle of filth", "lamb of god", "slayer", "motörhead", "motorhead", "pennywise"];
function realSongName(media) {
    if(media==null)
        media = API.getMedia();
    media.title = cleanSongName(media.title);
    media.author = cleanSongName(media.author);
    //console.log(media.title.replace(/[^ a-zA-Zö]/g,""));
    if(bands.find(media.title.replace(/[^ a-zA-Zö]/g,"").toLowerCase())!==false) {
      var tmp = media.author;
      media.author = media.title;
      media.title = tmp;
      delete tmp;
    }
    return media;
}

function cleanSongName(name) {
    name = name.replace(/((([\s]?(with|english))*[\s]?lyrics)|([\s]?\([^\)]+\))|[\s]?\[(HD|HQ)([\s]?(720|1080)p)?\]|[\s]?(music)?[\s]?video$)/ig, "");
    //name = "\""+name+"\"";
    name = name.replace(/^"(.*?)"$/, "$1");
    name = name.replace(/^[\-\s]*(.*?)[\-\s]*$/, "$1");
    //name = name.replace(//, "$1");
    //console.log(/^"(.*?)"$/.test(name));
    return name;
}
String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  for (var i = 0; i < find.length; i++) {
    replaceString = replaceString.replace(find[i], replace[i]);
  }
  return replaceString;
};

Array.prototype.find = function(needle) {
    for(var i=0; i<this.length; i++) {
       if(this[i]==needle)
         return i;
    }
    return false;
} 
Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for( key in this ) {
        temp[key] = this[key];
    }
    return temp;
};
function getTextNode(element)
{        
    if(element==null||element.childNodes==null)
      console.error("Failed to find child of non-node object.");
    if (element.childNodes.length > 0) {
        for (var i = 0; i < element.childNodes.length; i++)  {
                if(element.childNodes[i].nodeType == Node.TEXT_NODE) 
                   return element.childNodes[i];
        }
    }
    console.log(element);
    return null;
}
//Temporary solution of memory overflow
//setTimeout(function() {window.location.href = window.location.href;}, 3600000);