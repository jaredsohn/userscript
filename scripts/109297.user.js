    // ==UserScript==
    // @name           Wall Manager Sidekick (EA)
    // @description    Assists Wall Manager with Empires posts
    // @include        http://fb-client-0.empire.zynga.com/Reward.php?*
    // @include        http://fb-client-0.empire.zynga.com/flash.php?*
    // @include        http://www.facebook.com/*
    // @exclude        http://www.facebook.com/profile*
    // @exclude        http://www.facebook.com/editaccount*
    // @exclude        http://www.facebook.com/friends/*
    // @exclude        http://www.facebook.com/settings*
    // @exclude        http://www.facebook.com/help/*
    // @exclude        http://www.facebook.com/logout*
    // @exclude        http://www.facebook.com/login*
    // @exclude        http://www.facebook.com/ajax/*
    // @exclude        http://www.facebook.com/reqs*
    // @exclude        http://www.facebook.com/campaign/*
    // @exclude        http://www.facebook.com/notifications*
    // @exclude        http://www.facebook.com/editprofile*
    // @exclude        http://www.facebook.com/posted*
    // @exclude        http://www.facebook.com/plugins*
    // @exclude        http://www.facebook.com/home.php?sk=group_*
    // @exclude        http://www.facebook.com/*/posts/*
    // @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
    // @version        0.0.7
    // @require        http://sizzlemctwizzle.com/updater.php?id=104472&days=1
    // @copyright      Charlie Ewing & Joe Simmons
    // ==/UserScript==
    (function() {

       var version = "0.0.7";

         // Return as quickly as possible if we are not in an iframe
         //if (unsafeWindow.parent == unsafeWindow || typeof unsafeWindow.parent == 'undefined') return;

       // Get element by id shortform with parent node option
       function $(ID,root) {return (root||document).getElementById(ID);}

       Array.prototype.inArray = function(value) {
          for(var i=this.length-1; i>=0; i--) {
             if(this[i]==value) return true;
          }
          return false;
       };

       Array.prototype.inArrayWhere = function(value) {
          for(var i=0,l=this.length; i<l; i++) {
             if(this[i]==value) return i;
          }
          return false;
       };

       String.prototype.find = function(s) {
          return (this.indexOf(s) != -1);
       };

       String.prototype.startsWith = function(s) {
          return (this.substring(0, s.length) == s);
       };

       String.prototype.getUrlParam = function(s) {
          var params=this.split("?");
          if (params.length>0) return params[1].split("#")[0].split(s+"=")[0].split("&")[0];         
          return "";
       };

       String.prototype.getHashParam = function(s,param) {
          var params = this.split("#");
          if (params.length>0) return params[1].split(s+"=")[0].split("&")[0];
          return "";
       };

       // $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
       // Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
       // See script page for syntax examples: http://userscripts.org/scripts/show/51532
       function $g(que, O) {
          if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
          var obj=O||({del:false,type:6,node:document}), r, t,
             idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
          if(idclass_re.test(que)) {
             var s=que.split(' '), r=new Array(), c;
             for(var n=0; n<s.length; n++) {
                switch(s[n].substring(0,1)) {
                   case '#': r.push(document.getElementById(s[n].substring(1))); break;
                   case '.': c=document.getElementsByClassName(s[n].substring(1));
                        if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
                }
             }
             if(r.length==1) r=r[0];
          } else if(xp_re.test(que)) {
             r = (obj['doc']||document).evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
             if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
          }
          if(r && obj['del']===true) {
             if(r.nodeType==1) r.parentNode.removeChild(r);
             else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
             else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
          } return r;
       };

       
       function selectNodes(element,xPath) {
          return $g(xPath, {type:7, node:element});
       };

       function selectSingleNode(element,xPath) {
          var nodes=$g(xPath, {type:7, node:element});
          if (nodes!=null) return nodes.snapshotItem(0);
          return null;
       };


       function fireEvent(element,event){
              var evt = document.createEvent("HTMLEvents");
              evt.initEvent(event, true, true ); // event type,bubbling,cancelable
              return !element.dispatchEvent(evt);
       };

       function click(e) {
          if(!e && typeof e=='string') e=document.getElementById(e);
          if(!e) return;
          var evObj = e.ownerDocument.createEvent('MouseEvents');
          evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
          e.dispatchEvent(evObj);
       };

       // Created by avg, modified by JoeSimmons. shortcut to create an element
       function createElement(a,b,c) {
          if(a=="text") {return document.createTextNode(b);}
          var ret=document.createElement(a.toLowerCase());
          if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
          else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
          else ret[prop]=b[prop];
          if(c) c.forEach(function(e) { ret.appendChild(e); });
          return ret;
       }

       function dock(){
          //alert('trying to dock');

          //check that dock exists
          var door=$('wmDock');
          if (!door) return; //cannot find docking door

          //check that the dock does not not already have us listed
          var doorMark=$('wmDoor_app164285363593426');
          if (doorMark) return; //already posted to door

          var attachment={
             appID:'164285363593426',
             alias:'EA',
             hrefKey:'sendKey',
             name:'Empires&Allies',
             thumbsSource:'assets.empire.zynga.com',
             flags:{httpsTrouble:false},

             accText: {
                EAcoins10:'10 Coins',EAcoins25:'25 Coins',EAcoins50:'50 Coins',EAenergy:'1 Energy',EAsendxk1:'Liberty Bond',
                EAwood10:'10 Wood',EAoil10:'10 Oil',EAau1:'Gold',EAal1:'1 Aluminum',EAcu1:'1 Copper',EAfe1:'1 Iron',
                EAu1:'1 Uranium',EAal5:'5 Aluminum',EAcoins200:'200 coins',EAoil100:'100 Oil',EAwood25:'25 Wood',
                EAcoins100:'100 Coins',EAxk1:'Liberty Bond',EAau5:'5 Gold',EAoil50:'50 Oil',EAoil25:'25 Oil',
                EAwood100:'100 Wood',EAu5:'5 Uranium',EAcu5:'5 Copper',EAwood50:'50 Wood',EAfe5:'5 Iron',
                EAsendparts:"Parts",EAsend:"Unknown",
             },

             tests: [
                {link:"go play",ret:"exclude"},
                {link:"send thank you gift",ret:"exclude"},

                {url:'crew_tend_reminder',ret:'exclude'},
                {url:'neighbor_crew_apply',ret:'exclude'},
                {url:'crew_completion_reminder',ret:'exclude'},
                {url:'energy_request',ret:'exclude'},
                {url:'battle_lost_request_gift',ret:'exclude'},
                {url:'neighbor_request_',ret:'exclude'},
       
                {url:"ask_for_parts",ret:"EAsendparts"},
                {url:'battle_won_allies',ret:'EAsend'},

                {url:'level_up',ret:'EAcoins25'},
                {url:'help_research',ret:'EAcoins25'},
                {url:'market_built',ret:'EAcoins25'},
                {url:'market_built',ret:'EAcoins25'},
                {url:'market_buy_complete',ret:'EAcoins25'},
                {url:'research_building',ret:'EAcoins25'},
                {url:'upgrade_complete_',ret:'EAcoins25'},
                {url:'out_of_coins',ret:'EAcoins25'},
                {url:'daily_bonus',ret:'EAcoins25'},
                {url:'pvp_immunity_crew_invite',ret:'EAcoins25'},
                {url:'quest_complete',ret:'EAcoins25'},
                {url:'defeated_villain',ret:'EAcoins25'},

                {url:'out_of_oil',ret:'EAoil10'},            
                {url:'Q0300',ret:'EAoil10'},
                {url:'pvp_defeat_attacker_via_crew',ret:'EAoil10'},
                {url:'pvp_repel_wins',ret:'EAoil10'},
                {url:'pve_repel_wins',ret:'EAoil10'},
                {url:'pvp_defender_wins',ret:'EAoil10'},
                {url:'pvp_defender_loses',ret:'EAoil10'},

                {url:'camp_battle_won_19',ret:'EAoil50'},
                {url:'camp_battle_won_18',ret:'EAcoins100'},
                {url:'camp_battle_won_17',ret:'EAenergy1'},
                {url:'camp_battle_won_16',ret:'EAau5'},
                {url:'camp_battle_won_15',ret:'EAxk1'},
                {url:'camp_battle_won_14',ret:'EAcoins100'},
                {url:'camp_battle_won_13',ret:'EAwood25'},
                {url:'camp_battle_won_12',ret:'EAoil100'},
                {url:'camp_battle_won_11',ret:'EAcoins200'},
                {url:'camp_battle_won_10',ret:'EAal5'},
                {url:'camp_battle_won_9',ret:'EAoil50'},
                {url:'camp_battle_won_8',ret:'EAfe5'},
                {url:'camp_battle_won_7',ret:'EAwood50'},
                {url:'camp_battle_won_6',ret:'EAcu5'},
                {url:'camp_battle_won_5',ret:'EAenergy1'},
                {url:'camp_battle_won_4',ret:'EAcoins100'},
                {url:'camp_battle_won_3',ret:'EAu5'},
                {url:'camp_battle_won_2',ret:'EAwood100'},
                {url:'camp_battle_won_1',ret:'EAcoins100'},
                {url:'camp_battle_won_0',ret:'EAoil25'},

                {url:'out_of_wood',ret:'EAwood10'},
                {url:'Q0299',ret:'wood10'},

                {url:'out_of_aluminum',ret:'EAal1'},
                {url:'request_aluminum',ret:'EAal1'},
                {url:'out_of_copper',ret:'EAcu1'},
                {url:'request_copper',ret:'EAcu1'},
                {url:'out_of_gold',ret:'EAau1'},
                {url:'request_gold',ret:'EAau1'},
                {url:'out_of_iron',ret:'EAfe1'},
                {url:'request_iron',ret:'EAfe1'},
                {url:'out_of_uranium',ret:'EAu1'},
                {url:'request_uranium',ret:'EAu1'},
       
                {url:'ask_for_xk01',ret:'EAsendxk1'},

                {url:'energy_reques',ret:'EAenergy1'},
                {url:'out_of_energy',ret:'EAenergy1'},
                {url:'friend_visit',ret:'EAenergy1'},
                {url:'friend_helped',ret:'EAenergy1'},
                               
                {url:'help_contract',ret:'EAcoins10'},
                {url:'help_repel_invasion',ret:'EAcoins10'},
       
                {url:'new_nation',ret:'EAcoins50'},
                {url:'pvp_repel_crew_invite',ret:'EAcoins50'},
                {url:'pvp_attacker_wins',ret:'EAcoins50'},
                {url:'pvp_attacker_loses',ret:'EAcoins50'},
                {url:'pvp_repel_loses',ret:'EAcoins50'},
                {url:'pve_repel_loses',ret:'EAcoins50'},
                {url:'pvp_thank_defender',ret:'EAcoins50'},

                {url:'battle_won',ret:'EAcoins25'},
                {url:'frType=Q',ret:'EAcoins25'},
             ],

             menu: {
                EAsep:{type:'separator',label:'Basics',section:['Empires & Allies Manager Options'],kids:{
                   EAupdateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/104472.user.js'},
                   EAMCA:{type:'link',label:'Install Message Center Assistant',href:'http://userscripts.org/scripts/source/107344.user.js'}
                }},
                EAcoins50:{type:'checkbox',label:'Coins 50',kids:{
                   EAcoins25:{type:'checkbox',label:'25'},
                   EAcoins10:{type:'checkbox',label:'10'},
                }},
                EAwood100:{type:'checkbox',label:'Wood 100',kids:{
                   EAwood50:{type:'checkbox',label:'50'},
                   EAwood25:{type:'checkbox',label:'25'},
                   EAwood10:{type:'checkbox',label:'10'},
                }},
                EAoil100:{type:'checkbox',label:'oil 100',kids:{
                   EAoil50:{type:'checkbox',label:'50'},
                   EAoil25:{type:'checkbox',label:'25'},
                   EAoil10:{type:'checkbox',label:'10'},
                }},
                EAcoins200:{type:'checkbox',label:'Coins 200',kids:{
                   EAcoins100:{type:'checkbox',label:'100'},
                   EAcoins50:{type:'checkbox',label:'50'},
                   EAcoins25:{type:'checkbox',label:'25'},
                }},
                EAal5:{type:'checkbox',label:'Aluminum 5',kids:{
                   EAal1:{type:'checkbox',label:'1'},
                }},
                EAfe5:{type:'checkbox',label:'Iron 5',kids:{
                   EAfe1:{type:'checkbox',label:'1'},
                }},
                EAau5:{type:'checkbox',label:'Gold 5',kids:{
                   EAau1:{type:'checkbox',label:'1'},
                }},
                EAcu5:{type:'checkbox',label:'Copper 5',kids:{
                   EAcu1:{type:'checkbox',label:'1'},
                }},
                EAu5:{type:'checkbox',label:'Uranium 5',kids:{
                   EAu1:{type:'checkbox',label:'1'},
                }},
                EAenergy1:{type:'checkbox',label:'Energy 1'},            
                EAxk1:{type:'checkbox',label:'Get Liberty Bond'},
                EAsendxk1:{type:'checkbox',label:'Send Liberty Bond'},
                EAsendparts:{type:'checkbox',label:'Send Research Parts'},
                EAsend:{type:"checkbox",label:"Send Other"},
             }
          };

          attString=JSON.stringify(attachment);
       
          //put note on the door
          door.appendChild(createElement('div',{id:'wmDoor_app164285363593426','data-ft':attString}));

          //knock on the door
          window.setTimeout(function(){click(door);},1000);
       };
       

       var main = {

          sendMessage : function (s){
             unsafeWindow.top.location.hash = s;
          },

          run : function (){
             // check that we are in the overlay window
             //try{if (!unsafeWindow.location.href.find('overlayed=true')) return;}
             //catch(e){window.setTimeout(main.run,500);return;}

             try{
                var statusCode=0;
                var doc=document.documentElement;
                var text=doc.textContent;
                var html=doc.innerHTML;
                var gameLoaded=unsafeWindow.location.href.startsWith('http://fb-client-0.empire.zynga.com/flash.php?') && html.contains('object id="flashapp"');
             } catch(e){window.setTimeout(main.run,500);return;}

             //check page for various texts
             if (html.find("You've already claimed this reward"))statusCode=-6; //already claimed
             else if (html.find('reached your reward limit'))statusCode=-3; //over limit
             else if (html.find('Your inventory cannot hold any more of this item!'))statusCode=-3;  //over limit
             else if (html.find('You have exceeded your daily limit of gifts'))statusCode=-3; //all daily limit reached
             else if (html.find('Here is one as a reward'))statusCode=1;  //success send one get one
             else if (html.find("Here's a reward of"))statusCode=1;  //success send
             else if (html.find('You just got'))statusCode=1;  //success get
             else if (html.find('You gave '))statusCode=1;  //success give/get one
             else if (html.find('all the rewards have been claimed'))statusCode=-2;  //out of rewards
             else if (html.find('Sorry! These feed rewards have all been collected'))statusCode=-2; //out of rewards

             else if (html.find('you need to reach a higher level before using this reward'))statusCode=-1;  //level too low to claim
             else if (html.find('You cannot accept this reward'))statusCode=-1;  //data missing error
             else if (html.find('Sorry, there was an error with your gift'))statusCode=-1;  //generic error
             else if (html.find('This kind of gift is no longer available'))statusCode=-1;  //expired seasonal type
             else if (html.find("You can't send yourself a gift!"))statusCode=-1;  //send self error         
             else if (html.find('This gift is no longer available.'))statusCode=-1;  //generic expired
             else if (html.find('there was an error with your gift'))statusCode=-1;  //generic error
             else if (html.find('this reward has expired.'))statusCode=-1; //generic expired
             else if (html.find('You can only collect feed rewards from your allies'))statusCode=-12;

             else if (doc.textContent=="")statusCode=-5;  //no document body

             //multi-lingual checking, but status codes are very limited
             //else if (html.find('giftConfirm_img'))statusCode=1
             else if (html.find('notAccepted'))statusCode=-1;

             //else if (gameLoaded)statusCode=1;
             
             if (statusCode!=0)main.sendMessage("status="+statusCode);                  
             else window.setTimeout(function(e){main.run();},500);
          },

       };

       
       var href=window.location.href;
       if (href.startsWith('http://www.facebook.com/')) {
          dock();
          return;
       }
       main.run();

    })(); // anonymous function wrapper end