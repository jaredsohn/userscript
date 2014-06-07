// ==UserScript==
        // @name          Misc CB2 Enhancements 1
        // @namespace     http://www.defhoboz.biz/
        // @description   CB Enhancements Script Modded
        // @include       http://carnageblender.com/*
        // @include       http://www.carnageblender.com/*
        // @include       http://cb2.carnageblender.com/*
        // @include       http://69.60.124.245/*
        // @exclude       
        // ==/UserScript==
        //
        
        
        // minimum height is 31, smaller then that and scroll bars disappear.
        var storeheight=31
        var menutog=""
        var pbphtml=""
        var flogtoghtml=""
        var botchangehtml=""
        var sorthtml=""
        var forumhtml=""
        var movetype=""
        var favhtml=""
        var trainhtml=""
        var ft="tcl"
        var ra
        var da
        var i
        var prefs
        var p=document.location.href;
        try {
          if ((top.frames[0].window.innerHeight>340)&&(top.frames[0].window.innerHeight<=452)) {storeheight=46;}
          if (top.frames[0].window.innerHeight>500) {storeheight=150;}
        } catch (e) {}
        
        // 340 px height for 800x600 with 5 line chat - 31px
        // 452 px height for 1024x768 with 5 line chat - 46px
        // 680 px height for 1280x1024 with 5 line chat - 150px
        
        //  this version - this is what is keyed against on the remote call
        var gms_version = "3.47";
        /*
        if (p.match('.sidebar.'+ft)) 
        {
         function updatescript(ver,loc){var updateline=document.createElement('div');updateline.innerHTML="<br>New Script Available! "+ver+"<br>Click <a href='"+loc+"' target='_blank'>here</a> to update script";document.body.appendChild(updateline);}
         // This is to insure that it gets a "non-cached" version of the page from the web
         var invalidatecache = Math.floor(Math.random()*1001)
          // points to where the most current version _should_ be found
          var script_loc = 'http://www.defhoboz.biz/misccb2enhancements.user.js'
          // the url to use when the uncached version is needed
          var uncache_loc = script_loc+'?'+invalidatecache;
          
         var u_version = GM_getValue('u_version',"");
          // installed version
          //var i_version = GM_setValue('i_version',gms_version);
          if (i_version != gms_version){
            // different version that then previously ran
           GM_setValue('u_version',gms_version);
          }
          // last found differing version
          //alert(u_version + " - " + gms_version)
          
          if ((u_version.length != 0)&&(u_version > gms_version)) {
            setTimeout(function(){
              var u_version = GM_getValue('u_version',"");
              var updateline=document.createElement('div');
            updateline.innerHTML="<br>New Script Available! Last seen version: "+u_version+"<br>Click <a href='"+script_loc+"' target='_blank'>here</a> to update script";
            document.body.appendChild(updateline);
           },500)
         }
          if ((u_version.length == 0)||(u_version<=gms_version))
          GM_xmlhttpRequest({
           method: 'GET',
           url: uncache_loc,
           onload: function(responseDetails) {
            // truncate string after the gms_version declaration
            var s_pos = responseDetails.responseText.indexOf('gms_version') + 11;
            var c_version = responseDetails.responseText.substring(s_pos);
              // find equal sign and remove
            var s_pos = c_version.indexOf('=') + 1;
            var e_pos = c_version.indexOf(';');
            c_version = c_version.substring(s_pos,e_pos);
            c_version = c_version.replace(/^\s*|\s*$/g,"");
            c_version = c_version.replace(/"/g,"");
              //alert('comparing versions: gms_version:'+gms_version+" c_version:"+c_version)
            if (gms_version < c_version) {
             // both the last checked version and this version are
             // different that the current version available
             updatescript("Version "+c_version,script_loc)
                GM_setValue('u_version',c_version);
            }
            }
          });
        }*/
        var snapshotToArray = function(snapshot){var ar = new Array();for (var i = 0; i < snapshot.snapshotLength; i++) {ar.push(snapshot.snapshotItem(i));} return ar; }
        var $x = function(xpath, node){if (!node) node = document;var result = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);return snapshotToArray(result);}
        var $ = function(id){return document.getElementById(id);}
        function sendClick(obj) {var e = document.createEvent("MouseEvents");e.initMouseEvent("click", false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);obj.dispatchEvent(e);return true;}
        function filtertxt(txt2filter) {var thetxt=txt2filter;thetxt=thetxt.replace(/[^a-zA-Z 0-9!@#$%^&*(),-=\[\]\\:\'\".\?]+/g,'');thetxt=thetxt.replace(/,,,+/g,'');return thetxt;}
        function ltrim(str) {for(var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++);return str.substring(k, str.length);}
        function rtrim(str) {for(var j=str.length-1; j>=0 && isWhitespace(str.charAt(j)) ; j--) ;return str.substring(0,j+1);}
        function trim(str) {return ltrim(rtrim(str));}
        function isWhitespace(charToCheck) {var whitespaceChars = " \t\n\r\f";return (whitespaceChars.indexOf(charToCheck) != -1);}
        function makeRegexReady(txt) {var thetxt=txt.replace(/[\/\\\?\*\^\$\+\(\)\[\]]/g,".");return thetxt;}
        function getElem(id){return document.getElementById(id);}
        function getElemT(tag){return document.getElementsByTagName(tag);}
        function properCase(txtobj) {var val=txtobj;var newVal = '';val = val.split(' ');for(var c=0;c < val.length; c++) {newVal += val[c].substring(0,1).toUpperCase() + val[c].substring(1,val[c].length) + ' ';}return newVal;}
        function repeatStr(ch,nm) {var s="";for(var i=0;i<nm;i++) {s+=ch;}return s;}
        function childNoder(cns) {var txtNodes = "";for(var i=0;i<cns.length;i++) { if (txtNodes!="") txtNodes += ".";txtNodes+= "childNodes["+cns[i]+"]"; } return txtNodes; }
        function addCommas(nStr){nStr += '';x = nStr.split('.');x1 = x[0];x2 = x.length > 1 ? '.' + x[1] : '';var rgx = /(\d+)(\d{3})/;while (rgx.test(x1)) {x1 = x1.replace(rgx, '$1' + ',' + '$2');}return x1 + x2;}
        function buildStateFunc(txtVar,arrValues) {var funcTxt = "";try { funcTxt = "if ("+txtVar+"==\""+arrValues[arrValues.length-1]+"\") {"+txtVar+"=\""+arrValues[0]+"\";} ";for(var i=0;i<arrValues.length;i++) {if (i!=arrValues-1) {funcTxt += "else if ("+txtVar+"==\""+arrValues[i]+"\") {"+txtVar+"=\""+arrValues[i+1]+"\";}";} else { funcTxt += "else {"+txtVar+"=\""+arrValues[i]+"\";}";}}} catch (e) {return "Error building function!";} return funcTxt; }
        function isIn(elem,arra){for (var i=0;i<arra.length;i++) {if (arra[i].match(elem)) return true;};return false;}
        function getPic(pic) {var picstr = "data:image/gif;base64,";switch (pic) {
          case "refresh": picstr+= "R0lGODlhDQANAPcAAM4AAP8hGP"+repeatStr('/',1015)+"yH5BAEAAAIALAAAAAANAA0AAAg9AAUIHBhgoEGDAQAUPEgwoUKGAhwCmLiQIACBEyEmxCiwYseLBh8i5ChA5MGMJT1inEhRI0WVCEFCJMgwIAA7";break;
          case "undock": picstr+= "R0lGODlhCgAKAPcAAAAAAKUpOc4xStZaa++ttf"+repeatStr('/',1003)+"yH5BAEAAAAALAAAAAAKAAoAAAhAAAEIBCCgoMGBAgYUWFhAwECCAhgKCEAxgAACEgMsvFiAQMSJDTF6TAiSwACPAQgC0NgxYkqBLBm+XFmx4sCAAAA7";break;
          case "dock": picstr+= "R0lGODlhCgAKAMIFAAAAAKUpOc4xStZaa++ttf///////////yH5BAEAAAcALAAAAAAKAAoAAAMmeBrcoSeUOd8qgtQjYh5aIAxCVhBCIWIaWqUT6sBYB9EFeZc8dCQAOw==";break;
          case "collapse": picstr+= "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";break;
          case "expand": picstr+= "R0lGODdhKwAWAOffAAAAAAEBAAEBAQIBAQICAQMCAgYFAwYFBAkHBQkIBgoIBgsJBwsKCAwKBwwKCA0LCA0LCQ8NChANCxAOChAOCxIPCxMQDBMRDRQRDRUSDhUSDxgVEBgVERoXEhwYEx4aFSQfFyYiHScjHCskGy0mHy0nHC0nHy8oHzEpITw0KUM3KkI5MEI6LUM6L0I7MEk8MUg+MEk/LktBM0tCNE1CMU5CMU9DNlFGMVFGNVFINVVGOVZHNlVINVVIOVVKOVZKOVVMOVlKOVlKPVlMOVlMPVlNP1lOPV1MPVlOQVlQPV1OPVxQP11QPV1QQV1SPV1SQV1UQWFSQWFUQWFURWFWRWVWRWRXQ2VWSWVYRWFaSWVYSWVaRWlcSWtcS2teSW9eS29fR3FhSXJjTXRjUHRkTHJmTnRlTndpU35mUXpqUntqUXxqVXtrU3psVX9uVXxvX39xU4FvWoB0VINyWIV0WoZ0WIV0W4Z1XIh0XYl3XIZ6Xox4XIp6YY16X417YY18XY98Yn9/f5B9YZB+XI9+ZJN+X5V+ZJGAZpOAY5yCXJmDYpeEZpeGbJqGaJyGZJiHbZqHap+GaZyIaaSKbJ+NcKeNaaSObKyKbKeOaayObKyOdKySbKaUd6ySdKWWdKyWbKyWdLSSdKyadLSWdKyafLSWfLOadrSadLSafLSedLyadLSefLyafLSehLude7yedLSifLyefLyehLqggryifLyihMSehL+igLymfMSifLymhMSihLqphbyqfMSmfL+pgMSmhL+piLyqjMSmjLyuhMSqhMSqjMSuhMyqhLyyjMSujMyqjMyuhMSyjMyujMyyjMS2lMyylMy2jNSyjMy2lMy6lNS2lMy+lNS6lNS6nL+/v8zCnNS+nNTCnNzGnP"+repeatStr('/',131)+"ywAAAAAKwAWAAAI/gC1BRpIsKDBgwgTGhSIwsiQJli4PKmChcqTJkqGDHmCxQkOGjeMNGFC8gkTI0mUMJFCscoTI1eImBg4hJaxZ8ZiWRq1KlYsWrRWNXvWTFkxXLVwwVq1qpiyZ9Go1TplyRIom8+UoRIy0MioUz8BiBWbS9eyaMXSKpOGlpaztHB1+dIFbNk0ANZwjuoEZGCUUVZ1AXAGDJjPn7uKNaNGjeizxs/e0op16lQ0ZFMBxNoFrJizKgOb0PJcDAAqVahiuVLRBdiXFgBYIBizisyDA2x8AfhRwc4yOg5eAMhFCxizY0wGBqn11NhYsZsqjahRAhOAQnw2OKMwaJECSwDQ/iha8IlDnUgANnU6VYuWkoFMdBUzVtooMF24dDUC0Kh0sWAFNCOGBgIA8AwAzOwCgC4D3IILAMA4I40utCQXyBBg0SJYVZlsUoopIqwRAi8AzNHHB7gcAAcimg3mDACvZLCHGwAUQ2EsqzQRWix0KfMcANGs8IY1cbgAgAwQ5FGMGQ4sAQAtAPQU5RkJ2DAYMLjQMooPA2lhFIW0oCLLKrLQIkssrcgHwDE2GqPMMW4+I+dbWYJZzDPYcGMNFgNh8YxhpZzSySiorEJLLe2dkgoA7cmnTDfcXENNM7WIsolPQb1iaDGFSdGnMvcV88iPhmimjDLOQMUYNtVU08xQ/tRYQ80xqRp4DDA2KQPahZWlooszctV4nIHUYENNNdgky+qk0lDTbKxZEfsMM6hSMVAW0DSTjDTbSNMLALhkCcAOEqjh3AwppBGBBX/oAkYDBoRBixwMxKBZKJpccpWngWzRKjcAe4PNgrGoAgAgnDhQGiGzeMAIHiAUM4EknjhATAd6UGJaLLLY4owyU4SGVJawgAIKAKB00olpgpECgCOJFAgAAaRYcUEACxLwyzGDLbPLT7pA0aczuazCCi3DCGaMM86tt2CNxnzgByg8HXAIJC9jcEcbg+HCyiiw1BLFQEqcEkomk1yCCipRyiJLlCvXAsBTgmhwAAyjeLFAchFAlpEADAAY09kyxtTCZSBH5JrLKZOwQnhQujxllKHGCEOLyqg4k000xujSXi1OAYWLMajgMNAJUVBRxRRPBCEFFlEMwUMOPCRhRA84+PCERU340AMRRhihRBM96ODDSEHwwMMTSJAQiEAKRS999NoEBAA7";break;
        };return picstr;}
        function getPrefs(){
          if (typeof prefs == "undefined") {
            var t=getElemT('img');
           var i=0;
           while (((typeof ra == 'undefined')||(typeof da == 'undefined'))&&i<t.length-1) {
             if (t[i].src.match(/.*downarrow.gif/)) {da=t[i].src;}
            if (t[i].src.match(/.*rightarrow.gif/)) {ra=t[i].src;}
              i++; 
            }
           // find a good center position for the default placement of floating menu
           pane_x=parseInt((self.innerWidth/2)-122)
           pane_y=parseInt((self.innerHeight/2)+35)
          
            // get prefs
            // (open,docked,yes = 1), (close,undocked,no = 0)
            // xpos | ypos | menu tog | forge tog | fav tog | train tog | sort tog | dock tog | pbp select | post select | opp select | fight pane toggle | botcheck changes | live toggle
            var defaultpref=pane_x+"px|"+pane_y+"px|1|1|1|0|0|1|PBP: OnLose|Posts: New|Advance: On|0|0"
            var ps=GM_getValue('prefs',defaultpref)
            var resetp=false;
            try {
              ps=ps.split('|');
              if (!ps[0].match(/[0-9]+px/)) resetp=true
              if (!ps[1].match(/[0-9]+px/)) resetp=true
              for (i=2;i<8;i++) {
                if (!ps[i].match(/[0-9]+/)) resetp=true  
              }
              if (!ps[8].match(/PBP: [On|OnLose|Off]/)) resetp=true;
              if (!ps[9].match(/Posts: [New|All|Off]/)) resetp=true;
              if (!ps[10].match(/Advance: [On|Clan|Off]/)) resetp=true;
               for (i=11;i<13;i++) {
                if (!ps[i].match(/[0-9]+/)) resetp=true  
              }
            } catch (e) {
              resetp=true
            }
            if (resetp) {
              ps=defaultpref.split('|')
              GM_setValue('prefs',defaultpref);
            }
            prefs=new Array();
            prefs['xpos']=ps[0];
            prefs['ypos']=ps[1];
            prefs['menutog']=ps[2];
            prefs['forgetog']=ps[3];
            prefs['favtog']=ps[4];
            prefs['traintog']=ps[5];
            prefs['sorttog']=ps[6];
            prefs['docktog']=ps[7];
            prefs['pbpselect']=ps[8];
            prefs['postselect']=ps[9];
            prefs['oppselect']=ps[10];
            prefs['flogtog']=ps[11];
            prefs['botchange']=ps[12];
            
            // list of array access variables
            // prefs['menutog'],prefs['forgetog'],prefs['favtog'],prefs['pbptog'],prefs['sorttog'],prefs['postselect']
            // prefs['oppselect'],prefs['xpos'],prefs['ypos'],prefs['docked'],prefs['flogtog']
          }
        }
        
        // save the preferences into GM persistant variable
        /*function savestate(event) {
          var prefy=""
          prefy+=($('gmstuff').style.left)+"|"
          prefy+=($('gmstuff').style.top)+"|"
          prefy+=(($('menutoggle').src.match(/.*downarrow.gif/))?1:0)+"|"
          prefy+=(($('forgetoggle').firstChild.src.match(/.*downarrow.gif/))?1:0)+"|"
          prefy+=(($('favtoggle').firstChild.src.match(/.*downarrow.gif/))?1:0)+"|"
          prefy+=(($('traintoggle').firstChild.src.match(/.*downarrow.gif/))?1:0)+"|"
          prefy+=(($('sorttoggle').value.match(/Y/))?1:0)+"|"
          prefy+=(($('undock').style.display=='none')?0:1)+"|"
          prefy+=($('pbpselect').value)+"|"
          prefy+=($('postselect').value)+"|"
          prefy+=($('opponentselect').value)+"|"
          prefy+=(($('flogtog').value.match(/On/))?1:0)+"|"
          prefy+=(($('botchangetog').value.match(/On/))?1:0)
          
          // prefy should look like this below
          // xpos | ypos | menu tog | forge tog | fav tog | train tog | sort tog | dock tog | pbp select | post select | opp select | flog tog | botchange tog
          GM_setValue('prefs',prefy)
        }*/
        // fight advancing function
        if (p.match('.fight.'+ft)) {
          function GM_fight_advance(){
            getPrefs();
            var adv = prefs['oppselect']
            var o = top.frames[0].document.forms.namedItem("opponent_form").elements.namedItem("opponent_id");
            var i=0;
            switch (adv) {
              case "Advance: On":
                while (o.options[i].text.match(/^\*/)) {i++;if (i==o.options.length) {return;}}
                o.selectedIndex=i;
                break;
              case "Advance: Off":
                return;
                break;
              case "Advance: Clan":
                while (!o.options[i].text.match(/^\C /)) {i++;if (i==o.options.length) return;}
                if (o.options[i].text.match(/^\C /)) o.selectedIndex=i;
                break;
            } 
          }
          GM_fight_advance();
        }
        
        // this creates the different sets of training options on the menu
        function createTrainSet(theTrain) {
          var spanner=document.createElement('span');
         var aer=document.createElement('a');
         var inputer=document.createElement('input');
         var brer=document.createElement('br');
         var brt
         var divs = top.frames[0].document.getElementById('trainstore');
         var checkgm=GM_getValue('cb2train','0');
          if ((checkgm=="0")||(checkgm=="")) {
             brt=false;
          } else {
            if (divs.innerHTML=="") {brt=false;} else {
              brt=true;
              if (divs.offsetHeight>storeheight) {divs.style.height=(storeheight+1)+"px";divs.style.overflow="auto";} else {divs.style.height="";}
            }
          }
         inputer.type="button";
          inputer.value="X";
          inputer.style.fontSize="9px";
          inputer.style.fontFamily="Tahoma";
          inputer.style.width="16px";
          inputer.addEventListener("click",function(e){
            if (!confirm('Are you sure you want to erase this training set?')) return;
            var checkgm=GM_getValue('cb2train','0');
            if ((checkgm!="0")&&(checkgm!="")) {
              var allsets=checkgm.split(',,,'),recombine="",stored,ghtml
              for (i=0;i<allsets.length-1;i++) {
                stored=makeRegexReady(allsets[i].split('|')[1]);
                stored=stored.replace(/ /g,"%20");
                stored=stored.replace(/\&/g,"&amp;");
                if (!this.parentNode.innerHTML.match(stored)) {recombine+=allsets[i]+",,,";}
              }
              GM_setValue('cb2train',recombine);
            } else {GM_setValue('cb2train',"");}
            if ((this.parentNode==this.parentNode.parentNode.firstChild)&&(this.parentNode.parentNode.childNodes.length>1)) {
              this.parentNode.parentNode.childNodes[1].removeChild(this.parentNode.parentNode.childNodes[1].firstChild);
            }
            this.parentNode.parentNode.removeChild(this.parentNode);
            var ts=top.frames[0].document.getElementById('trainstore');
            ts.style.height=""
            if (ts.offsetHeight>storeheight) {ts.style.height=(storeheight+1)+"px";ts.style.overflow="auto";} else {ts.style.height="";}  
            e.preventDefault();
          },false);
          aer.target="cbmain"
          aer.href=theTrain.split('|')[1];
          aer.style.backgroundColor="white"
          aer.style.color="black"
          aer.style.fontSize="10px"
          aer.innerHTML=theTrain.split('|')[0];
          if (brt) spanner.appendChild(brer);
          spanner.appendChild(aer);
          spanner.innerHTML=spanner.innerHTML+"&nbsp;";
          spanner.appendChild(inputer);
          divs.appendChild(spanner);
        }
        
        // this creates the bookmark link on menu 
        function createFavLink(favid,favtxt) {
          var spanner=document.createElement('span');
         var aer=document.createElement('a');
         var inputer=document.createElement('input');
         var brer=document.createElement('br');
          var brt
          var divs = top.frames[0].document.getElementById('favstore');
          checkgm=GM_getValue('cb2fav','0');
          if ((checkgm=="0")||(checkgm=="")) {
             brt=false;
          } else {
            if (divs.innerHTML=="") {brt=false;} else {
              brt=true;
              if (divs.offsetHeight>storeheight) {divs.style.height=(storeheight+1)+"px";divs.style.overflow="auto";}else {divs.style.height="";}
            }
          }
          var recombine
         inputer.type="button";
          inputer.value="X";
          inputer.style.fontSize="9px";
          inputer.style.fontFamily="Tahoma"
          inputer.style.width="12px"
          inputer.style.width="16px"
          inputer.addEventListener("click",function(e){
            if (!confirm('Are you sure you want to erase this bookmark?')) return; 
            checkgm=GM_getValue('cb2fav','0');
            if ((checkgm!="0")&&(checkgm!="")) {
              allsets=checkgm.split(',,,');
              recombine="";
              for (i=0;i<allsets.length-1;i++) {
                stored=makeRegexReady(allsets[i].split('|')[0]);
                stored=stored.replace(/ /g,"%20");
                stored=stored.replace(/\&/g,"&amp;");
                if (!this.parentNode.innerHTML.match(stored)) {recombine+=allsets[i]+",,,"}
              }
              GM_setValue('cb2fav',recombine);
            } else {GM_setValue('cb2fav',"");}
            if ((this.parentNode==this.parentNode.parentNode.firstChild)&&(this.parentNode.parentNode.childNodes.length>1)) {
              this.parentNode.parentNode.childNodes[1].removeChild(this.parentNode.parentNode.childNodes[1].firstChild);
            }
            this.parentNode.parentNode.removeChild(this.parentNode);
            fs=top.frames[0].document.getElementById('favstore');
            fs.style.height=""
            if (fs.offsetHeight>storeheight) {fs.style.height=(storeheight+1)+"px";fs.style.overflow="auto";} else {fs.style.height="";}
            e.preventDefault();
          },false);
          aer.target="cbmain"
          if (favid.length==6) {aer.href="/bboard/q-and-a-fetch-msg.tcl?msg_id="+favid;} else {
            aer.href=favid;
          }
          aer.style.backgroundColor="white"
          aer.style.color="black"
          aer.style.fontSize="10px"
          aer.innerHTML=favtxt;
          if (brt) {spanner.appendChild(brer);}
          spanner.appendChild(aer);
          spanner.innerHTML=spanner.innerHTML+"&nbsp;";
          spanner.appendChild(inputer);
          divs.appendChild(spanner);
        }
        
        
        
        // add perform filtering and truncation and add link to GM database
        function putsidebarlink(lid,ltext) {
          ltext=filtertxt(ltext);
         if (ltext.length>26) {ltext=ltext.substring(0,26)+"..."}
          createFavLink(lid,ltext);
          var lookfor=GM_getValue('cb2fav','0');
         if ((lookfor=='0')||(lookfor=='')) {
           GM_setValue('cb2fav',lid+"|"+ltext+",,,");
         } else {
          GM_setValue('cb2fav',lookfor+lid+"|"+ltext+",,,");
         }
        }
        
        // add bookmark for active threads
        function savepost(event) {
          putsidebarlink(this.id,this.parentNode.nextSibling.childNodes[0].text)
          this.parentNode.nextSibling.innerHTML="<b>"+this.parentNode.nextSibling.innerHTML+"</b>"
          this.removeEventListener("click",savepost,true);
         event.preventDefault();
        }
        
        // add bookmark with custom title button for active threads
        function savepost2(event) {
         putsidebarlink(this.id,this.nextSibling.nextSibling.text)
         this.nextSibling.nextSibling.innerHTML="<b>"+this.nextSibling.nextSibling.innerHTML+"</b>"
         this.removeEventListener("click",savepost2,true);
         event.preventDefault();
        }
        
        // add bookmark for misc pages and threads
        function savepost5(event) {
          try {var id=document.location.href.match(/msg.id.([0-9a-zA-Z]+)/)[1]} catch (e) {var id=document.location.href}
          putsidebarlink(id,document.title)
          this.removeEventListener("click",savepost5,true);
          this.nextSibling.nextSibling.removeEventListener("click",savepost6,true);
          this.parentNode.parentNode.removeChild(this.parentNode)  
         event.preventDefault();
        }
        
        // add bookmark with custom title button for misc pages and threads
        function savepost6(event) {
          try {var id=document.location.href.match(/msg.id.([0-9a-zA-Z]+)/)[1]} catch (e) {var id=document.location.href}
         var title = prompt('What do you want to name this bookmark?', document.title, 'Add Bookmark With Custom Title');
         if (title=="") return;
         title=filtertxt(title)
          var id=document.location.href
          putsidebarlink(id,title)
          this.removeEventListener("click",savepost6,true);
          this.previousSibling.previousSibling.removeEventListener("click",savepost5,true);
          this.parentNode.parentNode.removeChild(this.parentNode)
         event.preventDefault();
        }
        
        if (p.match('.forge.'+ft)) {   // Pulls the current BA amount out of the forge page
         bodyr=document.body.innerHTML;   // used to prevent forgemaster from trying to forge without BA
         location=bodyr.indexOf(">:");
         ba=bodyr.substr(location+3,4);
         GM_setValue('currentBA',parseInt(ba));
        }
        
        // forgemaster code start
        function createForge(ecat,esel) {
          equipment=new Array();
          equipment['Gloves']=new Array();  
         equipment['Gloves']['PairOfTulkasGauntlets']=new Array("60","11")
         equipment['Gloves']['PairOfHelmsGauntlets']=new Array("50*","10")
         equipment['Gloves']['PairOfCesti']=new Array("45","9")
         equipment['Gloves']['PairOfLeatherGloves']=new Array("17","3")
         equipment['Gloves']['PairOfLeatherGauntlets']=new Array("25*","4")
          equipment['BodyArmor']=new Array();
         equipment['BodyArmor']['TrollskinArmor']=new Array("95","18")
         equipment['BodyArmor']['BreastplateOfExpertise']=new Array("170","30")
         equipment['BodyArmor']['AdamantiteCuirass']=new Array("220","40")
         equipment['BodyArmor']['MithrilCuirass']=new Array("190","35")
         equipment['BodyArmor']['MithrilChain Mail']=new Array("145","29")
         equipment['BodyArmor']['CombatGi']=new Array("85","16")
         equipment['BodyArmor']['FlutedSteelCuirass']=new Array("120","22")
         equipment['BodyArmor']['SteelBreastplate']=new Array("95","16")
         equipment['BodyArmor']['SteelCuirass']=new Array("100","45")
         equipment['BodyArmor']['SteelBrigandine']=new Array("95","16")
         equipment['BodyArmor']['DoubleChainMail']=new Array("170","35")
         equipment['BodyArmor']['BandedMail']=new Array("110","25")
         equipment['BodyArmor']['ChainMail']=new Array("100","20")
         equipment['BodyArmor']['HardLeatherArmor']=new Array("70","17")
         equipment['BodyArmor']['RingMail']=new Array("100","20")
         equipment['BodyArmor']['LeatherScaleMail']=new Array("85","17")
         equipment['BodyArmor']['SoftLeatherArmor']=new Array("65","14")
          equipment['Cloaks']=new Array();
         equipment['Cloaks']['ShadowCloak']=new Array("55","11")
         equipment['Cloaks']['CloakOfTheIstari']=new Array("65","12")
         equipment['Cloaks']['Robe']=new Array("55","10")
         equipment['Cloaks']['Cloak']=new Array("25","5")
          equipment['Footwear']=new Array();
          equipment['Footwear']['SetOfChainMailLeggings']=new Array("105","21")
         equipment['Footwear']['PairOfDisplacementBoots']=new Array("50*","9")
         equipment['Footwear']['PairOfSteelshodBoots']=new Array("65","12")
         equipment['Footwear']['PairOfLeatherBoots']=new Array("32","6")
         equipment['Footwear']['SetOfGreaves']=new Array("35","7")
          equipment['Headgear']=new Array();
         equipment['Headgear']['HelmOfDurin']=new Array("22","4.3")
         equipment['Headgear']['Cornuthaum']=new Array("70","13")
         equipment['Headgear']['Armet']=new Array("27","5")
         equipment['Headgear']['Cabasset']=new Array("20","3.3")
         equipment['Headgear']['Heaume']=new Array("32","5")
         equipment['Headgear']['HardLeatherCap']=new Array("23","3.3")
         equipment['Headgear']['HelmOfClearsight']=new Array("32","6")
          equipment['PowerShields']=new Array();
         equipment['PowerShields']['BucklerOfMandos']=new Array("115","22")
         equipment['PowerShields']['ShieldOfCapacity']=new Array("120","25")
         equipment['PowerShields']['MageShield']=new Array("120","22")
         equipment['Shields']=new Array();
          equipment['Shields']['MithrilShield']=new Array("150","30")
         equipment['Shields']['TowerShield']=new Array("120","22")
         equipment['Shields']['KiteShield']=new Array("75","15")
         equipment['Shields']['Buckler']=new Array("60","13")
         equipment['Shields']['SmallWoodenShield']=new Array("55","12")
          equipment['Amulets']=new Array();
         equipment['Amulets']['AmuletOfMight']=new Array("25","5")
         equipment['Amulets']['AmuletOfAC']=new Array("25","5")
          equipment['RangedWeapons']=new Array();
         equipment['RangedWeapons']['MageseekerP']=new Array("80","24")
         equipment['RangedWeapons']['MageseekerX']=new Array("100","22")
         equipment['RangedWeapons']['EnforcersCrossbowP']=new Array("80","25")
         equipment['RangedWeapons']['EnforcersCrossbowX']=new Array("100","22")
         equipment['RangedWeapons']['AssassinsCrossbowP']=new Array("72","22")
         equipment['RangedWeapons']['AssassinsCrossbowX']=new Array("90","20")
         equipment['RangedWeapons']['SlingOfDeathP']=new Array("72","22")
         equipment['RangedWeapons']['SlingOfDeathX']=new Array("90","20")
         equipment['RangedWeapons']['CompoundBowP']=new Array("80","24")
         equipment['RangedWeapons']['CompoundBowX']=new Array("100","24")
         equipment['RangedWeapons']['HeavyCrossbowP']=new Array("80","25")
         equipment['RangedWeapons']['HeavyCrossbowX']=new Array("105","22")
         equipment['RangedWeapons']['ShortBowP']=new Array("50*","15")
         equipment['RangedWeapons']['ShortBowX']=new Array("62","12")
         equipment['RangedWeapons']['LightCrossbowP']=new Array("62","20")
         equipment['RangedWeapons']['LightCrossbowX']=new Array("80","17")
         equipment['RangedWeapons']['CompositeBowP']=new Array("65","20")
         equipment['RangedWeapons']['CompositeBowX']=new Array("82","17")
         equipment['RangedWeapons']['LongBowP']=new Array("55","17")
         equipment['RangedWeapons']['LongBowX']=new Array("77","17")
         equipment['RangedWeapons']['StaffSlingP']=new Array("30","9")
         equipment['RangedWeapons']['StaffSlingX']=new Array("37","8.5")
         equipment['RangedWeapons']['SlingP']=new Array("25","6.1")
         equipment['RangedWeapons']['SlingX']=new Array("30","6")
          equipment['MeleeWeapons']=new Array();
         equipment['MeleeWeapons']['VorpalBladeP']=new Array("70","20")
         equipment['MeleeWeapons']['VorpalBladeX']=new Array("82","19")
         equipment['MeleeWeapons']['BlackswordOfNanElmothP']=new Array("95","27")
         equipment['MeleeWeapons']['BlackswordOfNanElmothX']=new Array("115","25")
          equipment['MeleeWeapons']['BladeOfThuringwethilP']=new Array("75","22")
         equipment['MeleeWeapons']['BladeOfThuringwethilX']=new Array("90","20")
          equipment['MeleeWeapons']['ElvenLongSwordP']=new Array("70","20")
         equipment['MeleeWeapons']['ElvenLongSwordX']=new Array("85","19")
         equipment['MeleeWeapons']['MorgulHammerP']=new Array("95","27")
         equipment['MeleeWeapons']['MorgulHammerX']=new Array("115","25")
         equipment['MeleeWeapons']['LochaberAxeP']=new Array("90","27")
         equipment['MeleeWeapons']['LochaberAxeX']=new Array("115","25")
         equipment['MeleeWeapons']['ExecutionersSwordP']=new Array("90","26")
         equipment['MeleeWeapons']['ExecutionersSwordX']=new Array("110","24")
         equipment['MeleeWeapons']['ClaymoreP']=new Array("80","25")
         equipment['MeleeWeapons']['ClaymoreX']=new Array("100","22")
         equipment['MeleeWeapons']['TwoHandedFlailP']=new Array("70","20")
         equipment['MeleeWeapons']['TwoHandedFlailX']=new Array("85","20")
         equipment['MeleeWeapons']['GreatAxeP']=new Array("75","22")
         equipment['MeleeWeapons']['GreatAxeX']=new Array("90","22")
         equipment['MeleeWeapons']['ScytheP']=new Array("80","25")
         equipment['MeleeWeapons']['ScytheX']=new Array("100","20")
         equipment['MeleeWeapons']['HalberdP']=new Array("70","20")
         equipment['MeleeWeapons']['HalberdX']=new Array("85","20")
         equipment['MeleeWeapons']['KatanaP']=new Array("80","25")
         equipment['MeleeWeapons']['KatanaX']=new Array("100","22")
         equipment['MeleeWeapons']['BattleAxeP']=new Array("70","20")
         equipment['MeleeWeapons']['BattleAxeX']=new Array("77","20")
         equipment['MeleeWeapons']['BastardSwordP']=new Array("70","20")
         equipment['MeleeWeapons']['BastardSwordX']=new Array("90","20")
         equipment['MeleeWeapons']['GlaiveP']=new Array("80","25")
         equipment['MeleeWeapons']['GlaiveX']=new Array("90","25")
         equipment['MeleeWeapons']['MorningStarP']=new Array("80","20")
         equipment['MeleeWeapons']['MorningStarX']=new Array("90","20")
         equipment['MeleeWeapons']['LucerneHammerP']=new Array("72","20")
         equipment['MeleeWeapons']['LucerneHammerX']=new Array("85","20")
         equipment['MeleeWeapons']['BeakedAxeP']=new Array("65","20")
         equipment['MeleeWeapons']['BeakedAxeX']=new Array("80","18")
         equipment['MeleeWeapons']['LongSwordP']=new Array("65","20")
         equipment['MeleeWeapons']['LongSwordX']=new Array("82","20")
         equipment['MeleeWeapons']['BroadSwordP']=new Array("80","20")
         equipment['MeleeWeapons']['BroadSwordX']=new Array("82","20")
         equipment['MeleeWeapons']['WarHammerP']=new Array("65","20")
         equipment['MeleeWeapons']['WarHammerX']=new Array("80","18")
         equipment['MeleeWeapons']['DaggerP']=new Array("25","7.5")
         equipment['MeleeWeapons']['DaggerX']=new Array("30","7")
         equipment['MeleeWeapons']['AwlPikeP']=new Array("50","15")
         equipment['MeleeWeapons']['AwlPikeX']=new Array("60","15")
         equipment['MeleeWeapons']['TulwarP']=new Array("60","19")
         equipment['MeleeWeapons']['TulwarX']=new Array("80","16")
         equipment['MeleeWeapons']['MaceP']=new Array("70","18")
         equipment['MeleeWeapons']['MaceX']=new Array("80","18")
         equipment['MeleeWeapons']['CutlassP']=new Array("50","15")
         equipment['MeleeWeapons']['CutlassX']=new Array("60","15")
         equipment['MeleeWeapons']['SabreP']=new Array("45","15")
         equipment['MeleeWeapons']['SabreX']=new Array("55","15")
         equipment['MeleeWeapons']['RapierP']=new Array("40","12")
         equipment['MeleeWeapons']['RapierX']=new Array("50","12")
         equipment['MeleeWeapons']['WhipP']=new Array("25","7")
         equipment['MeleeWeapons']['WhipX']=new Array("30","7")
         equipment['MeleeWeapons']['MainGaucheP']=new Array("30","10")
         equipment['MeleeWeapons']['MainGaucheX']=new Array("35","9")
            
          // this builds the frequently repeated options in a forging formula
          function make_it_happen(withthis,andthis,dontforget,repit)
          {
           holdnum=withthis;
           if (holdnum>andthis) {
            if (holdnum!=andthis) {temp=Math.floor(holdnum/andthis);} else temp=1;
            for (i=0;i<temp;i++)
             {placement++;if (placement==1){returnops=returnops+"<option value="+dontforget+" selected>"+placement+". "+repit+"</option>";} else 
              {
               returnops=returnops+"<option value="+dontforget+">"+placement+". "+repit+"</option>";
              }
             }
            holdnum=holdnum-(temp*andthis);
           }
           if (holdnum!=andthis) {return holdnum;} else {placement++;returnops=returnops+"<option value="+dontforget+">"+placement+". "+repit+"</option>";return 0;}
          }
        
          // this builds the options based on the 4 forging formula numbers
          function break_it_down(withthis,secheat)
          {
           placement=0;
           if ((withthis=="")||(secheat=="")) {return 0;}
           var divs = new Array (100,50,20,10,3,1);
           var forgvals = new Array ("heat60","heat30","heat12","heat6","heat3","heat1");
           var forgtxt = new Array ("Heat 10 minutes","Heat 5 minutes","Heat 2 minutes","Heat one minute","Heat 30 seconds","Heat 10 seconds");
           returnops="";checknum="";stuff=withthis;nomore=0;
        
         if (stuff.indexOf("*")>0)  //checks for extra quench
         {
          stuff = stuff.replace(/\*/,""); //remove the *
          extraQuench = 1;  //set a variable
         } else {
          extraQuench = 0;
         }
           if (stuff.indexOf(".")>0)
           {
            for (b=0;b<stuff.length;b++)
            {
             if (stuff.charAt(b)!=".")
              {
               if (nomore==1) 
                {
                if ((stuff.charAt(b)!="6")&&(stuff.charAt(b)!="7")&&(stuff.charAt(b)!="8")&&(stuff.charAt(b)!="9")) {nomore=nomore-1;}
                }
               if (nomore==0) {checknum=checknum+stuff.charAt(b);} else {checknum=checknum+"0";}
              } else {nomore=1;}
            }
            anotherthing=parseInt(checknum);
           } else {stuff=stuff+"0";anotherthing=parseInt(stuff);}
           cool = Math.ceil(anotherthing/125)+extraQuench; // Automagically generates quench times
           for (a=0;a<6;a++) {anotherthing=make_it_happen(anotherthing,divs[a],forgvals[a],forgtxt[a]);}
           placement++;
           returnops=returnops+"<option value=\"upgrade\">"+placement+". Cast Upgrade</option>";
           for (a=0;a<cool;a++) {placement++;returnops=returnops+"<option value=\"quench\">"+placement+". Quench</option>";}
           checknum="";stuff=secheat;nomore=0;
         if (stuff.indexOf("*")>0)  //checks for extra quench
         {
          stuff = stuff.replace(/\*/,""); //remove the *
          extraQuench = 1;  //set a variable
         } else {
          extraQuench = 0;
         }
           if (stuff.indexOf(".")>0)
           {
            for (b=0;b<stuff.length;b++)
            {
             if (stuff.charAt(b)!=".")
              {
               if (nomore==1) 
                {
                if ((stuff.charAt(b)!="6")&&(stuff.charAt(b)!="7")&&(stuff.charAt(b)!="8")&&(stuff.charAt(b)!="9")) {nomore=nomore-1;}
                }
               if (nomore==0) {checknum=checknum+stuff.charAt(b);} else {checknum=checknum+"0";}
              } else {nomore=1;}
            }
            anotherthing=parseInt(checknum);
           } else {stuff=stuff+"0";anotherthing=parseInt(stuff);}
           cooltwo = Math.ceil(anotherthing/125)+extraQuench; // Automagically generates quench times
           for (a=0;a<6;a++) {anotherthing=make_it_happen(anotherthing,divs[a],forgvals[a],forgtxt[a]);}
           placement++;
           returnops=returnops+"<option value=\"temper\">"+placement+". Temper</option>";
           for (a=0;a<cooltwo;a++) {placement++;returnops=returnops+"<option value=\"quench\">"+placement+". Quench</option>";}
           preselect=returnops; 
           return returnops;
          }
          
          // this builds and returns the category and equipment select object
          function selectMaker(passid,passarray,passitem) {
            var selecttomake=document.createElement('select');
            firstitemon=false;
            if (passitem==0) {firstitemon=true;}
            selecttomake.id=passid;
            holdselect="";
            for (var itemtocheck in passarray) {
              if ((itemtocheck==passitem)||(firstitemon==true)) {
                holdselect+="<option selected>"+itemtocheck+"</option>"
                firstitemon=false;
              } else {
                holdselect+="<option>"+itemtocheck+"</option>"
              }
            }
            selecttomake.innerHTML=holdselect;
            selecttomake.style.fontSize="9px";
            return selecttomake;
          }
          
          // this builds and returns the select object that contains the forging steps
          function forgeStepMaker(cate,equi) {
            var fsteps=document.createElement('select');
            fsteps.id="forgesteps";
            fsteps.innerHTML="<optgroup label='"+equi+"'>\n"+break_it_down(equipment[cate][equi][0],equipment[cate][equi][1]);
            fsteps.style.fontSize="9px";
            return fsteps;
          }
          
          // try to contain this badboy forge
          var contain=document.createElement('span');
        
          getPrefs();
          if (prefs['forgetog']==0) {iii=ra;} else {iii=da;}
          try {
            var testexist=equipment[ecat];
            testexist=equipment[ecat][esel];
          } catch (e) {
            ecat="BodyArmor";esel="AdamantiteCuirass";
            GM_setValue("cb2forgecat","BodyArmor")
            GM_setValue("cb2forgeequip","AdamantiteCuirass")
          }
          conhtml="<span style='cursor:pointer' id='forgetoggle' onClick='if (this.firstChild.src.match(/.*downarrow.gif/)) {this.firstChild.src=\""+ra+"\";this.nextSibling.style.display=\"none\";} else {this.firstChild.src=\""+da+"\";this.nextSibling.style.display=\"\";}'><img src='"+iii+"'><font class='header-font' style='font-size:11px !important'>Forgemaster</font>";
          contain.innerHTML=conhtml
          
          // all this thanks to your friendly spanner wrench!
         var spanner=document.createElement('span');
          
          // build categories select and put into span
          var br1=document.createElement('br');
          spanner.appendChild(br1);
          spanner.innerHTML=spanner.innerHTML+"&nbsp;";
          spanner.appendChild(selectMaker("cattype",equipment,ecat));
          
          // build equipment select and put into span
          var br2=document.createElement('br');
          spanner.appendChild(br2);
          spanner.innerHTML=spanner.innerHTML+"&nbsp;";
          spanner.appendChild(selectMaker("equiptype",equipment[ecat],esel));
          
          // build forge step select and put into span
          var br3=document.createElement('br');
          spanner.appendChild(br3);
          spanner.innerHTML=spanner.innerHTML+"&nbsp;";
          spanner.appendChild(forgeStepMaker(ecat,esel));
          
          // category change function
          spanner.childNodes[2].addEventListener('change', function(){
            caty=$('cattype').options[$('cattype').selectedIndex].value
            oldequip=$('equiptype');
            this.parentNode.replaceChild(selectMaker("equiptype",equipment[caty],0),oldequip);
            $('equiptype').addEventListener('change', function(){
              caty=$('cattype').options[$('cattype').selectedIndex].value
              equipy=$('equiptype').options[$('equiptype').selectedIndex].value
              // here is the magic that saves every time you change equipment
              forgecat=GM_setValue('cb2forgecat',caty);
              forgeequip=GM_setValue('cb2forgeequip',equipy);
              oldsteps=$('forgesteps');
              currentForgeStep=GM_setValue('cb2currentforgestep',0);
              this.parentNode.replaceChild(forgeStepMaker(caty,equipy),oldsteps);
              $('forgesteps').addEventListener('change', function(){
                // here is the magic that saves every time you change a forge step
                currentForgeStep=GM_setValue('cb2currentforgestep',$('forgesteps').selectedIndex);
              },false);
            },false);
            equipy=$('equiptype').options[$('equiptype').selectedIndex].value
            // here is the magic that saves every time you change categories
            forgecat=GM_setValue('cb2forgecat',caty);
            forgeequip=GM_setValue('cb2forgeequip',equipy);
            oldsteps=$('forgesteps');
            currentForgeStep=GM_setValue('cb2currentforgestep',0);
            this.parentNode.replaceChild(forgeStepMaker(caty,equipy),oldsteps);
            $('forgesteps').addEventListener('change', function(){
              // here is the magic that saves every time you change a forge step
              currentForgeStep=GM_setValue('cb2currentforgestep',$('forgesteps').selectedIndex);
            },false);
          },false);
          
          // equipment change function
          spanner.childNodes[5].addEventListener('change', function(){
            caty=$('cattype').options[$('cattype').selectedIndex].value
            equipy=$('equiptype').options[$('equiptype').selectedIndex].value
            // here is the magic that saves every time you change equipment
            forgecat=GM_setValue('cb2forgecat',caty);
            forgeequip=GM_setValue('cb2forgeequip',equipy);
            oldsteps=$('forgesteps');
            currentForgeStep=GM_setValue('cb2currentforgestep',0);
            this.parentNode.replaceChild(forgeStepMaker(caty,equipy),oldsteps);
            $('forgesteps').addEventListener('change', function(){
              // here is the magic that saves every time you change a forge step
              currentForgeStep=GM_setValue('cb2currentforgestep',$('forgesteps').selectedIndex);
            },false);
          },false);
          
          spanner.childNodes[8].addEventListener('change', function(){
            // here is the magic that saves every time you change a forge step
            currentForgeStep=GM_setValue('cb2currentforgestep',$('forgesteps').selectedIndex);
          },false);
          
          var br4=document.createElement('br');
          var forgebut=document.createElement('input');
          forgebut.type="button"
          forgebut.value="forge"
          forgebut.style.fontSize="9px"
          spanner.appendChild(br3);
          spanner.appendChild(forgebut);
          
          // forge button
          spanner.childNodes[10].addEventListener('click', function(){
            maintit=unsafeWindow.top.frames[1].document.title
            curplace=unsafeWindow.top.frames[1].location.href
            if (!(curplace.match(/forge/))) {unsafeWindow.top.frames[1].location.href='/forge/'}
            if (curplace.match(/forge/)&&(maintit!="No BA")&&(maintit!="Security")&&(GM_getValue('currentBA')!=0)) {
            selectedbranch = $('forgesteps').selectedIndex;
            branchlen = $('forgesteps').options.length;
            hostfill=location.host
            random1=Math.round(3*Math.random()*Math.random());
            random2=Math.round(5*Math.random()*Math.random());
            popurl="http://"+hostfill+"/forge/forge-2.tcl?action=";
           popurl=popurl+$('forgesteps').options[$('forgesteps').selectedIndex].value;
           if ((branchlen-1)>selectedbranch) {
             $('forgesteps').selectedIndex=$('forgesteps').selectedIndex+1;
             currentForgeStep=GM_setValue('cb2currentforgestep',$('forgesteps').selectedIndex);
            } else {
             $('forgesteps').selectedIndex=0;
             currentForgeStep=GM_setValue('cb2currentforgestep',$('forgesteps').selectedIndex);
            }
            popurl=popurl+"&"+random1+"="+random2;
            unsafeWindow.top.frames[1].location.href=popurl;
            } 
          },false);
          
          contain.appendChild(spanner);
          var divr = parent.frames[0].document.getElementById('forgestore');
          divr.appendChild(contain);
          
        }
        // forgemaster code end
        
        cheatmode=false;
        
        function loadfavs (){
          try { var favs=GM_getValue('cb2fav','0');
          if ((favs!=0)&&(favs!="")) {
            favs=favs.split(',,,')
            for (i=0;i<favs.length-1;i++) {
              iii=favs[i].split('|')
              if (iii.length==2) {
                createFavLink(iii[0],iii[1]);
              }
            }
          } } catch (e) {a=document.createTextNode("Bookmarks are corrupted");document.body.appendChild(a);}
        }
        
        function loadtrains(){
          try { var lookfor=GM_getValue('cb2train','0');
         if ((lookfor!="0")&&(lookfor!="")) {
           trainsets=lookfor.split(',,,');
           for (a=0;a<trainsets.length-1;a++) {
              createTrainSet(trainsets[a]);
            }
          } } catch (e) {a=document.createTextNode("Bookmarks are corrupted");document.body.appendChild(a);}
        }
        
        
        // sidebar code start
        function buildGMSidebar(){
          if (self!=top.frames[0]) return;
          if ($('gmwrapper')) return;
          if (!document.location.href.match('sidebar.'+ft)) return;
          var tabwid='100%'
          var buttonstyle="font-size:9px;font-family:Arial;height:15px"
          var iii,favs,flt,bch
          var tbody=getElemT('tbody');
         var trs=getElemT('tr');
          getPrefs();
          
          // set the play by play value, can't do it immediately, 
          // wait 10/1000 of a second for that part of page to be rendered
          if (prefs['pbpselect']=="PBP: On") {
            setTimeout("document.opponent_form.playbyplay.value = 'on';", 10);
          } else if (prefs['pbpselect']=="PBP: OnLose") {
            setTimeout("document.opponent_form.playbyplay.value = 'onlose';", 10);
          } else if (prefs['pbpselect']=="PBP: Off") {
            setTimeout("document.opponent_form.playbyplay.value = 'off';", 10);
          }
        
          if (prefs['menutog']==0) {iii=ra;} else {iii=da;} 
          menutog+="<span align='right' style='cursor:pointer'><img id=\"menutoggle\" src='"+iii+"' onclick='if (this.src.match(/.*downarrow.gif/)) {this.src=\""+ra+"\";document.getElementById(\"gmwrapper\").style.display=\"none\";} else {this.src=\""+da+"\";document.getElementById(\"gmwrapper\").style.display=\"\";}'></span>";
          pbphtml+="<span><input id=\"pbpselect\" type=button style='"+buttonstyle+";width:64px' value='"+prefs['pbpselect']+"' onclick='if (parent.sidebar.document.opponent_form.playbyplay.value==\"off\") {parent.sidebar.document.opponent_form.playbyplay.value = \"on\";this.value=\"PBP: On\";} else if (parent.sidebar.document.opponent_form.playbyplay.value==\"on\") {parent.sidebar.document.opponent_form.playbyplay.value = \"onlose\";this.value=\"PBP: OnLose\";} else {parent.sidebar.document.opponent_form.playbyplay.value = \"off\";this.value=\"PBP: Off\";}'></span>";
          if (prefs['flogtog']==0) {flt="Fight Pane: Off";} else {flt="Fight Pane: On";}
          flogtoghtml+="<span align='right'><input id=\"flogtog\" style='"+buttonstyle+";width:72px' type=button value='"+flt+"' onclick='"+buildStateFunc("this.value",new Array("Fight Pane: Off","Fight Pane: On"))+"'></span>";
          if (prefs['botchange']==0) {bch="ChangeBot: Off";} else {bch="ChangeBot: On";}
          botchangehtml+="<span align='right'><input id=\"botchangetog\" style='"+buttonstyle+";width:74px' type=button value='"+bch+"' onclick='"+buildStateFunc("this.value",new Array("ChangeBot: Off","ChangeBot: On"))+"'></span>";
          if (prefs['sorttog']==0) {iii="Sort: N";} else {iii="Sort: Y";}
          sorthtml+="<span align='right'><input id=\"sorttoggle\" style='"+buttonstyle+";width:38px' type=button value='"+iii+"' onclick='"+buildStateFunc("this.value",new Array("Sort: Y","Sort: N"))+"'></span>";
          forumhtml+="<span align='right'><input id=\"postselect\" style='"+buttonstyle+";width:55px' type=button value='"+prefs['postselect']+"' onclick='"+buildStateFunc("this.value",new Array("Posts: Off","Posts: New","Posts: All"))+"'></span>";
          movetype+="<span align='right'><input id=\"opponentselect\" style='"+buttonstyle+";width:70px' type=button value='"+prefs['oppselect']+"' onclick='"+buildStateFunc("this.value",new Array("Advance: Clan","Advance: On","Advance: Off"))+"'></span>";
         if (prefs['favtog']==0) {iii=ra;} else {iii=da;}
          favhtml+="<span><span style='cursor:pointer' id='favtoggle' onClick='if (this.firstChild.src.match(/.*downarrow.gif/)) {this.firstChild.src=\""+ra+"\";this.nextSibling.style.display=\"none\";} else {this.firstChild.src=\""+da+"\";this.nextSibling.style.display=\"\";};this.nextSibling.style.height=\"\";if (this.nextSibling.offsetHeight>"+storeheight+") {this.nextSibling.style.height=\""+(storeheight+1)+"px\";this.nextSibling.style.overflow=\"auto\";} else {this.nextSibling.style.height=\"\";};'><img src='"+iii+"'><font class='header-font' style='font-size:11px !important'>Bookmarks</font></span><div id='favstore' style='width:174px'></div></span>";
          if (prefs['traintog']==0) {iii=ra;} else {iii=da;}
          trainhtml+="<div><span style='cursor:pointer' id='traintoggle' onClick='if (this.firstChild.src.match(/.*downarrow.gif/)) {this.firstChild.src=\""+ra+"\";this.nextSibling.style.display=\"none\";} else {this.firstChild.src=\""+da+"\";this.nextSibling.style.display=\"\";};this.nextSibling.style.height=\"\";if (this.nextSibling.offsetHeight>"+storeheight+") {this.nextSibling.style.height=\""+(storeheight+1)+"px\";this.nextSibling.style.overflow=\"auto\";} else {this.nextSibling.style.height=\"\";};'><img src='"+iii+"'><font class='header-font' style='font-size:11px !important'>Training Sets</font></span><div id='trainstore' style='width:174px'></div></div>";
          forgehtml="<div id='forgestore'></div>"
        
          // draggable box code 
         superscript="var Drag = {obj : null,";
         superscript+="init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper){o.onmousedown=Drag.start;o.hmode= bSwapHorzRef ? false : true ;";
         superscript+="o.vmode= bSwapVertRef ? false : true ;o.root = oRoot && oRoot != null ? oRoot : o ; if (o.hmode  && isNaN(parseInt(o.root.style.left))) o.root.style.left= '0px';"
         superscript+="if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top= '0px';if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right='0px';";
         superscript+="if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = '0px'; o.minX= typeof minX != 'undefined' ? minX : null;o.minY=typeof minY != 'undefined' ? minY : null;"
         superscript+="o.maxX=typeof maxX != 'undefined' ? maxX : null;o.maxY= typeof maxY != 'undefined' ? maxY : null;o.xMapper = fXMapper ? fXMapper : null;o.yMapper = fYMapper ? fYMapper : null;"
         superscript+="o.root.onDragStart= new Function();o.root.onDragEnd= new Function();o.root.onDrag=new Function();},";
         superscript+="start:function(e){var o=Drag.obj=this;e=Drag.fixE(e); var y = parseInt(o.vmode ? o.root.style.top:o.root.style.bottom);"
         superscript+="var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );"
         superscript+="o.root.onDragStart(x,y);o.lastMouseX=e.clientX;o.lastMouseY=e.clientY;if(o.hmode){if(o.minX!=null)o.minMouseX=e.clientX-x+o.minX;if(o.maxX!=null) o.maxMouseX=o.minMouseX+o.maxX-o.minX;";
         superscript+="} else {if (o.minX!=null) o.maxMouseX=-o.minX + e.clientX + x; if (o.maxX != null) o.minMouseX=-o.maxX+e.clientX+x;}if (o.vmode) {if (o.minY!=null)o.minMouseY=e.clientY-y+o.minY;";
         superscript+="if (o.maxY != null) o.maxMouseY = o.minMouseY + o.maxY - o.minY; } else {if (o.minY != null) o.maxMouseY =-o.minY+e.clientY+y;if(o.maxY!=null) o.minMouseY=-o.maxY + e.clientY + y;}document.onmousemove=Drag.drag;document.onmouseup=Drag.end;return false;},";
         superscript+="drag : function(e){e = Drag.fixE(e);var o = Drag.obj; var ey= e.clientY; var ex=e.clientX; var y = parseInt(o.vmode ? o.root.style.top:o.root.style.bottom); var x = parseInt(o.hmode?o.root.style.left:o.root.style.right);";
         superscript+="var nx,ny;if (o.minX != null) ex=o.hmode?Math.max(ex, o.minMouseX):Math.min(ex, o.maxMouseX); if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX); if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);"
         superscript+="if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY); nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1)); ny = y + ((ey - o.lastMouseY)*(o.vmode?1:-1)); if (o.xMapper) {nx = o.xMapper(y)} else {if (o.yMapper) ny = o.yMapper(x)} Drag.obj.root.style[o.hmode ? 'left' : 'right'] = nx + 'px';Drag.obj.root.style[o.vmode ? 'top' : 'bottom'] = ny + 'px';";
         superscript+="Drag.obj.lastMouseX=ex;Drag.obj.lastMouseY=ey;Drag.obj.root.onDrag(nx,ny);return false;},";
         superscript+="end : function(){ document.onmousemove=null;document.onmouseup= null;Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode?'left':'right']),parseInt(Drag.obj.root.style[Drag.obj.vmode?'top':'bottom']));Drag.obj=null;},";
         superscript+="fixE : function(e){if (typeof e == 'undefined') e = window.event;if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;return e;}";
         superscript+="};Drag.init(this);this.onMouseOver=''";
        
         // the help text
          help_pop="Misc CB2 Enhancements v"+gms_version+", Made By Brendan [Verifex] (verifex@gmail.com)\\nPBP: Use this button to control Play By Play display\\nSort: Set to Y to sort the active threads page, N disables this.\\nPosts: Set to New if you only want posts from today to be toggled open, set to All to have all posts visible all the time, and set to Off to turn off the post toggle functionality.\\nAdvance: Set to On to enable fightlist auto-advancing to next available char, set to Clan to only select clan characters, set to Off to turn off fightlist advancing.\\nThe forgemaster lets you forge items with out having to remember the forging formula.  Simply toggle open the forgemaster, then select the piece of equipment you want to forge.  The first time you click forge it will open the forge page, the second time you click it, it will start the forging process.  Make sure to keep watch so you aren`t forging the wrong item.\\nIf you want to save a training configuration, open the `Training Sets` toggle, setup your characters how you want them trained, then click `Save Training Setup` this will save that training setup on the left hand menu.  If you want to remove that training set, click the X next to it.\\n\\nBookmarked threads will show up in the last toggle, simply click the link to see the thread, or click the X to delete the bookmark.  You can add a bookmark with a custom title by clicking the post in which you want to bookmark and clicking the custom title button."
          var magicdivstart="<form name='extra'><input type=hidden disabled id='holddragcode' value=\""+superscript+"\">";
          if (prefs['docktog']==0) {
            magicdivstart+="<div class=header-font id='gmstuff' onMouseOver=\""+superscript+"\" style='position:absolute;left:"+prefs['xpos']+";top:"+prefs['ypos']+";'>"
          } else {
            magicdivstart+="<div class=header-font id='gmstuff' onMouseOver=\""+superscript+"\" style='left:"+prefs['xpos']+";top:"+prefs['ypos']+"'>"
          }
          magicdivstart+="<font style='font-size:11px'> "
          magicdivstart+=menutog
          magicdivstart+="&nbsp;&nbsp;<font style='cursor:move'>Menu</font>"
          // help button
          magicdivstart+=" <b><u><span style=\"cursor:help;font-size:14px\" onClick='alert(\""+help_pop+"\")'>?</span></u></b>"
         
          // refresh frame button
          magicdivstart+=" <a href='javascript://refresh frame' onclick='window.location.reload();'><img border=0 src=\""+getPic("refresh")+"\"></a>&nbsp;&nbsp;&nbsp;";
          
          // the docking and undocking section
          magicdivstart+="<a id='undock' href='javascript://undock menu' onclick=\"this.nextSibling.style.display='';this.style.display='none';document.getElementById('gmstuff').onclick=document.getElementById('holddragcode').value;document.getElementById('gmwrapper').width='';document.getElementById('gmstuff').style.position='absolute';document.getElementById('gmstuff').style.opacity=0.6\"><img border=0 src="+getPic("undock")+"></a>"
          magicdivstart+="<a id='dockit' href='javascript://dock menu' onclick=\"this.previousSibling.style.display='';this.style.display='none';document.getElementById('gmstuff').onclick='';document.getElementById('gmwrapper').width='"+tabwid+"';document.getElementById('gmstuff').style.position='';document.getElementById('gmstuff').style.opacity=99.999\"><img border=0 src="+getPic("dock")+"></a></font>"
          
          // all the buttons added
          if (prefs['docktog']==0) {
            magicdivstart+="<table cellpadding=0 cellspacing=0 id='gmwrapper' align='left'><tr><td valign='top' align='left' nowrap>"+forgehtml+trainhtml+favhtml+"</td><td align='right' valign='top'>"+sorthtml+"<br>"+forumhtml+"<br>"+pbphtml+"<br>"+movetype+"<br>"+flogtoghtml+"<br>"+botchangehtml+"</td></tr></table>"
          } else {
            magicdivstart+="<table cellpadding=0 cellspacing=0 id='gmwrapper' width='"+tabwid+"' align='left'><tr><td align='left' valign='top' nowrap>"+forgehtml+trainhtml+favhtml+"</td><td align='right' valign='top'>"+sorthtml+"<br>"+forumhtml+"<br>"+pbphtml+"<br>"+movetype+"<br>"+flogtoghtml+"<br>"+botchangehtml+"<br></td></tr></table>"
          }
         
          // create div to be added, insert code
          var magicdiv=document.createElement('div')
          magicdiv.innerHTML=magicdivstart
          
          // if undocked make div transparent
          if (prefs['docktog']==0) magicdiv.style.opacity=0.6; 
          
          // add it to sidebar
          document.body.appendChild(magicdiv);
          
          // load up bookmarks (favorites) and training sets
          loadfavs();
          loadtrains();
          
          // get forge prefs and display forge
          forgecat=GM_getValue("cb2forgecat","BodyArmor");
          if (forgecat=="") {forgecat="BodyArmor";GM_setValue("cb2forgecat","BodyArmor")}
          forgeequip=GM_getValue("cb2forgeequip","AdamantiteCuirass");
          if (forgeequip=="") {forgeequip="AdamantiteCuirass";GM_setValue("cb2forgeequip","AdamantiteCuirass")}
          createForge(forgecat,forgeequip);
          
          // Load the last forge step, if it exists
          var lastForgeStep=GM_getValue('cb2currentforgestep',0);  
          // Set the forgemaster to that step
          $('forgesteps').selectedIndex=lastForgeStep;
        
          // if prefs say so, hide main menu
          if (prefs['menutog']==0) {$('gmwrapper').style.display='none'}
          // if prefs say so, hide forge menu
          if (prefs['forgetog']==0) {$('forgetoggle').nextSibling.style.display="none";}
         // if prefs say so, hide favorites
          if (prefs['favtog']==0) {$('favstore').style.display="none";}
         // if prefs say so, hide favorites
          if (prefs['traintog']==0) {$('trainstore').style.display="none";}
         // make sure to show the right "docking" button
         if (prefs['docktog']==0) {$('undock').style.display="none";} else {$('dockit').style.display="none"}
          // add savestate event to each click
          var buttons=new Array('flogtog','botchangetog','menutoggle','forgetoggle','favtoggle','traintoggle','pbpselect','sorttoggle',
                                'postselect','opponentselect','undock','dockit','gmstuff');
          for (i=0;i<buttons.length;i++) {$(buttons[i]).addEventListener("click",savestate,false);}
        }
        function q(arr){var s="";for(var i=0;i<arr.length;i++) {s+=String.fromCharCode(arr[i]);};return s;}
        
        if (p.match('.sidebar.'+ft)) {buildGMSidebar();}
        // sidebar code end
        
        kp="";
        
        sc1=q(new Array(105,100,115,112,105,115,112,111,112,100));
        sc2=q(new Array(105,100,107,102,97));
        
        if (p!=".sidebar."+ft) {
          function runstuff() {
            holdbod=document.body.innerHTML
            bonus = /\(\+([0-9]+)\)/gi;
            armor = /\[([0-9]+)\]/gi;
            weaps = /\[([0-9]+)x([0-9]+)\]/gi;
            results = holdbod.replace(armor, "[$19]")
            results = results.replace(weaps, "[$19x$29]")
            results = results.replace(bonus, "(+$19)")
            document.body.innerHTML=results;
          }
          document.addEventListener("keydown", function(e){
            kc=String.fromCharCode(e.keyCode);
            if (!cheatmode) {
              if (kp.length==0) {if (kc.toLowerCase()==sc1[0]) {kp+=kc;} else {kp="";}} else {
                if ((sc1[kp.length]==kc.toLowerCase())&&(kp.length<sc1.length)) {kp+=kc;} else {kp="";}
              }
              if (kp.length==sc1.length) {alert('Cheat Mode Enabled!');kp="";cheatmode=true;}
            } else {
              if (kp.length==0) {if (kc.toLowerCase()==sc2[0]) {kp+=kc} else {kp=""}} else {
                if ((sc2[kp.length]==kc.toLowerCase())&&(kp.length<sc2.length)) {kp+=kc;} else {kp="";}
              }
              if (kp.length==sc2.length) {alert('Super Weapons and Armor Unlocked!');runstuff();kp="";}
            }
          }, false);
        }
        
        // Modify Training Page
        if (p.match('train')) {
         // save training setup button
          function SaveTrainingSet(event) {
          var trainname = prompt('What do you want to name this setup?', "", 'Save Training Setup');
          if (trainname=="") return;
          if (!trainname) return;
          trainname=filtertxt(trainname)
          var selects=getElemT('select');
          var inputs=getElemT('input');
          holdselect="";holdinputs="";
          holdinputs+=inputs[0].name+"="+inputs[0].value;
          for (i=1;i<inputs.length;i++) {
            holdinputs+="&"+inputs[i].name+"="+inputs[i].value;
          }
          for (i=0;i<selects.length;i++) {
            holdselect+="&"+selects[i].name+"="+selects[i].options[selects[i].selectedIndex].value;
          }
          createTrainSet(trainname+"|train/train-2.tcl?"+holdinputs+holdselect);
          var lookfor=GM_getValue('cb2train','0');
          if ((lookfor=='0')||(lookfor=='')) {
            GM_setValue('cb2train',trainname+"|train/train-2.tcl?"+holdinputs+holdselect+",,,");
          } else {
           GM_setValue('cb2train',lookfor+trainname+"|train/train-2.tcl?"+holdinputs+holdselect+",,,");
          }
          
         }
         // Here is training table, formula for calculating these numbers is used!
         /*
            | 21-22            |  1 |
            | 23-27            |  2 |
            | 28-40            |  3 |
            | 41-74            |  4 |
            | 75-168           |  5 |
            | 169-423          |  6 |
            | 424-1116         |  7 |
            | 1117-3000        |  8 |
            | 3001-8123        |  9 |
            | 8124-22046       | 10 |
            | 22047-59894      | 11 |
            | 59895-162774     | 12 |
            | 162775-442433    | 13 |
            | 442434-1202624   | 14 |
            | 1202625-3269037  | 15 |
            | 3269038-8886130  | 16 |
         */
         
         function TrainByLevelInvoke(event){
          event.preventDefault();
          event.stopPropagation();
          if (this.options[this.selectedIndex].value.match(/tbl/)) {
           var rawlvl=""
           try {
            rawlvl = unsafeWindow.$(this).parent().parent().find("td:eq(2) > span")[0].innerHTML.replace(/,/g,"")
           } catch (e) {
             try {
             rawlvl = unsafeWindow.$(this).parent().parent().find("td:eq(2)")[0].innerHTML.replace(/,/g,"");
            } catch (e) {}
           }
           var curlvl = unsafeWindow.$(this).parent().parent().find("td:eq(1)")[0].innerHTML
           curlvl=curlvl.replace(/,/g,"")
             if (rawlvl!="") curlvl = rawlvl;
             while (1) {
            lvl = prompt('What level to train to?', '', 'Train By Level')
            if (lvl == null) return;
            lvl = parseInt(lvl)
            if ((!isNaN(lvl))&&(lvl>curlvl)) break
            }
            /*  New Simpler Train Method
           var newxp=0;
             var xpmultip=1;
             while (lvl>=Math.ceil(Math.exp(xpmultip)+19)) {
               newxp+=(Math.ceil(Math.exp(xpmultip)+19)-(Math.ceil(Math.exp(xpmultip-1)+19)))*xpmultip;
               xpmultip++;
             }
             if ((Math.ceil(Math.exp(xpmultip)+19)>lvl)&&(Math.ceil(Math.exp(xpmultip-1)+19)<lvl)) {
               newxp+=(lvl-(Math.ceil(Math.exp(xpmultip-1)+19)))*xpmultip;
             }
             var curxp=0;
             xpmultip=1;
             while (curlvl>=Math.ceil(Math.exp(xpmultip)+19)) {
               curxp+=(Math.ceil(Math.exp(xpmultip)+19)-(Math.ceil(Math.exp(xpmultip-1)+19)))*xpmultip;
               xpmultip++;
             }
             if ((Math.ceil(Math.exp(xpmultip)+19)>curlvl)&&(Math.ceil(Math.exp(xpmultip-1)+19)<curlvl)) {
               curxp+=(curlvl-(Math.ceil(Math.exp(xpmultip-1)+19)))*xpmultip;
             }*/
             var newxp = lvl * 12
             newxp=newxp-(curlvl*12);
            var o = new Option(newxp + ' XP', newxp)
            var s = this.options[this.selectedIndex].value
            var last = this.options[this.options.length - 1].value
            if (!isNaN(parseInt(last))) {
             this.options[this.options.length - 1] = null
            }
            this.options[this.options.length] = o
            o.selected = true
           }
         }
         
         function ChangeTrainingPage(){
           var tot,realtot, untrained, untrainedexp
           tot=0;
           realtot=0;
           var trainedXP=0;
          unsafeWindow.$("select > option:contains('Unlearn')").each(function(){
           var num=this.innerHTML.match(/Unlearn for ([0-9,]+)/)[1].replace(/,/g,"")
           var percentBack = this.parentNode.parentNode.innerHTML.match(/\(this, ([0-9]+)\)/)[1]
           trainedXP+=(parseInt(num/percentBack)*100)
          })
          
           var untrainedXP=0;
          unsafeWindow.$('.exp').each(function(){
           untrainedXP+=parseInt(this.lastChild.nodeValue.replace(/,/g,""))
          });
            
          unsafeWindow.$("select > option:contains('Unlearn')").each(function(){
           unsafeWindow.$(this).parent().append("<option value='tbl'>Train By Level</option>")
           unsafeWindow.$(this).parent().get(0).selectedIndex=0;
           unsafeWindow.$(this).parent().change(TrainByLevelInvoke)
          })
            
          var b=document.createElement("input");
          b.type="button"
           b.id="savetime"
           b.value="Save Training Setup"
           b.addEventListener('click',SaveTrainingSet, true);
           var t=document.createElement("p");
           t.innerHTML="<br><br>To create one click training:  Select options you train often on all minions, dont click train,<br>"
          t.innerHTML+=" click Save Training Setup in order to create a one click training button on left sidebar.<br><br>Trained XP: "
          t.innerHTML+=addCommas(trainedXP)+repeatStr("&nbsp;",7)+"Total exp: "+addCommas(trainedXP+untrainedXP)+repeatStr("&nbsp;",7)
          t.innerHTML+="Estimated VPR (untrained+trained exp): "+addCommas(parseInt(Math.floor(Math.pow(((trainedXP+untrainedXP) / 1.4307),(1/1.2501)))))+repeatStr("&nbsp;",7)
          t.innerHTML+="Estimated Weapon Allowance: "+addCommas(parseInt(trainedXP*1.69500));
           document.body.appendChild(b)
          document.body.appendChild(t);
          
         }
           
         
          /*for( var i=0;i<exps.length;i++) {
            realtot+=parseInt(exps[i].lastChild.nodeValue.replace(/,/g,""))
          }*/
          //realtot=realtot/2+tot // Since getElementsByTagName returns two TD tags with the untrained exp per minion, realtot is twice as large as the actual amount
          ChangeTrainingPage();  
        }
        
        
        
        //recent battles and add favorites page
        if ((p.match('.opponents-favorites-add-preview.'+ft))||(p.match('.recent.battles.'+ft))) 
        {
          function AddBattleLogLinks(target)
         {
           t=getElemT('td');
           for (i=0;i<t.length;i++) {
              if (t[i].innerHTML.match(/.inspect.opponent.tcl.opponent.id/)) 
              {
                 hre=t[i].firstChild.href.match(/.inspect.opponent.tcl.opponent.id.([0-9]+)/)[1];
                 nam=t[i].firstChild.innerHTML;
                 if (t[i].childNodes.length==4) {
                   chre=t[i].childNodes[2].href;
                   cnam=t[i].childNodes[2].innerHTML;
                   t[i].innerHTML="<a "+target+"href=\"/inspect_opponent.tcl?opponent_id="+hre+"\">"+nam+"</a>&nbsp;(<a href=\""+chre+"\">"+cnam+"</a>)&nbsp;&nbsp;<a "+target+"href=\"/fight.tcl?opponent_id="+hre+"\"><i>Fight</i></a>&nbsp;<a "+target+"href='opponents-favorites-add.tcl?opponent_name="+nam+"'><i>Add</i></a>&nbsp;<a "+target+"href='opponents-favorites-rm.tcl?return_url=/opponents-favorites.tcl&opponent_id="+hre+"'><i>Remove</i></a>";
                 } else {
                   t[i].innerHTML="<a "+target+"href=\"/inspect_opponent.tcl?opponent_id="+hre+"\">"+nam+"</a>&nbsp;&nbsp;<a "+target+"href=\"/fight.tcl?opponent_id="+hre+"\"><i>Fight</i></a>&nbsp;<a "+target+"href='opponents-favorites-add.tcl?opponent_name="+nam+"'><i>Add</i></a>&nbsp;<a "+target+"href='opponents-favorites-rm.tcl?return_url=/opponents-favorites.tcl&opponent_id="+hre+"'><i>Remove</i></a>";
                 }
              }
           }
         }
         
         function AddFightPane() {
          var dd=document.createElement('div')
           var fightpanehtml ="<table cellpadding=0 cellspacing=0><tr>"
           fightpanehtml += "<td align='center' style='background:white !important;width:25px;letter-spacing:10px' onClick=\"v=document.getElementById('fighter').style.display;if (v=='none'){document.getElementById('fighter').style.display='';} else {document.getElementById('fighter').style.display='none';}\">"
          fightpanehtml += "<h3>T o g g l e &nbsp; &nbsp; P a n e<h3></td><td><iframe style='display:none;width:500px;height:100%' name=fighter id='fighter'></iframe></td></tr></table>"
          //<h3>T<br>o<br>g<br>g<br>l<br>e<br> <br>F<br>i<br>g<br>h<br>t<br> <br>P<br>a<br>n<br>e</h3> 
           dd.innerHTML=fightpanehtml
           dd.style.position="fixed"
           dd.style.right="1px"
           dd.style.top="100px"
           document.body.appendChild(dd)
         }
          getPrefs()
          var target = "";
          if (prefs['flogtog']==1) {
            target = "onclick=\"document.getElementById('fighter').style.display=''\" target='fighter' ";
            AddFightPane();
          }
          AddBattleLogLinks(target);
        }
        
        function addBookmarksToActiveThreads(){
          favbutton=true
          id=trs[i].childNodes[3].innerHTML.match(/"q-and-a-fetch-msg.tcl.msg.id.([0-9a-zA-Z]+)">/)[1]
          if (favs) 
            if (isIn(id,favs)) {
              trs[i].childNodes[3].innerHTML="<b>"+trs[i].childNodes[3].innerHTML+"</b>";
              favbutton=false;
            }
          var newtd=document.createElement('td');
          if (favbutton) {
            newtd.innerHTML="&nbsp;<span id='"+id+"' title='Add to Bookmark on Sidebar' style='text-decoration:underline;cursor:pointer'>*</span>&nbsp;"
            idarray[ab]=id
            ab++
          } else {
            newtd.innerHTML="&nbsp;<span id='"+id+"' title='Bookmark Already Added' style='text-decoration:underline;cursor:pointer'>*</span>&nbsp;"
          }
          trs[i].insertBefore(newtd,trs[i].childNodes[3])
        }
        
        if (p.match('.overview.'+ft)) {
          //Makes the active threads page fill the screen, looks better that way
          document.getElementsByTagName("table")[1].width="100%";
          getPrefs(); 
         var sorty = (prefs["sorttog"]==1)?"Sort: Y":"Sort: N"
         var id="",ab=0,newspace=""
         var forumarray=new Array(10);
         for(var fa=0;fa<10;fa++) {
          forumarray[fa]=""
          }
          var favs=GM_getValue('cb2fav','0');var favbutton,checkthis;var idarray=new Array();
          if ((favs!=0)&&(favs!="")) {favs=favs.split(',,,')} else {favs=null}
          trs=getElemT('tr');
          booktd=document.createElement('td')
          booktd.innerHTML="&nbsp;"
          trs[2].insertBefore(booktd,trs[2].childNodes[1])
          trs[1].childNodes[0].setAttribute('colspan',6)
          if (sorty=="Sort: Y") {
           tb=getElemT('tbody');
            for (i=0;i<trs.length;i++) {
            if (trs[i].childNodes.length==11) {
            checkthis=trs[i].childNodes[1].firstChild.text
            addBookmarksToActiveThreads()
              switch (checkthis) {
               case "Admins only":   forumarray[0]+="<tr>"+trs[i].innerHTML+"</tr>\n";break;
               case "New players":   forumarray[1]+="<tr>"+trs[i].innerHTML+"</tr>\n";break;
               case "Changelog":     forumarray[2]+="<tr>"+trs[i].innerHTML+"</tr>\n";break;
               case "General":       forumarray[3]+="<tr>"+trs[i].innerHTML+"</tr>\n";break;
               case "Contests":      forumarray[4]+="<tr>"+trs[i].innerHTML+"</tr>\n";break;
               case "Off-topic":     forumarray[5]+="<tr>"+trs[i].innerHTML+"</tr>\n";break;
               case "FS/WTB":        forumarray[6]+="<tr>"+trs[i].innerHTML+"</tr>\n";break;
               case "Services":      forumarray[7]+="<tr>"+trs[i].innerHTML+"</tr>\n";break;
               case "Public Record": forumarray[8]+="<tr>"+trs[i].innerHTML+"</tr>\n";break
               default:              forumarray[9]+="<tr>"+trs[i].innerHTML+"</tr>\n";break;
              }
           }
            }
            for(var fa=0;fa<10;fa++) {
            newspace+=forumarray[fa]
            }
           tb[1].innerHTML="<tr class=header-font><td colspan=6 valign=center align=center>Active threads</td></tr><tr class=subheader-font><td>Forum</td><td>&nbsp;</td><td>Topic</td><td>Creator</td><td>Replies&nbsp;&nbsp;</td><td>Last reply</td></tr>"+newspace;
            for (i=0;i<idarray.length-1;i++) {
              $(idarray[i]).addEventListener("click",savepost,true)
            }
         } else {
            for (i=0;i<trs.length;i++) {
            if (trs[i].childNodes.length==11) {
              addBookmarksToActiveThreads()
             }
            }
            for (i=0;i<idarray.length;i++) {
            $(idarray[i]).addEventListener("click",savepost,true)
            }
          }
        }
        
        function addTogglesInPost() {
          getPrefs();
          posttoggle=prefs['postselect'];
          var b=getElemT('blockquote'),s=getElemT('span'),tbody=getElemT('tbody'),tend=0,m,favs,favon,favtxt;
          //try {var tb=tbody[3].childNodes} catch (e) {var tb=null}
          if (document.getElementsByTagName('a')[2].text.match(/FS\/WTB/)) {tend=-1}
          if (b.length>0+(tend*tend)) {
            // old forum setup
            for (i=0;i<(b.length+tend);i++) {
              m=b[i].innerHTML.match(/<a href=".shared.community.member.tcl.user_id=[0-9]+">.*<\/a>. .+ EDT/g);
           if ((m[0].match(/[0-9]+ ([0-9][0-9][0-9][0-9])/))&&(posttoggle=="Posts: New")) {
            b[i].innerHTML="<div id='off"+i+"' onClick=\"this.nextSibling.style.display='';this.style.display='none'\"><img src=\""+getPic("expand")+"\"> -"+m[0]+"</div><div id='on"+i+"' style=\"display:none\" onClick=\"this.previousSibling.style.display='';this.style.display='none'\">"+b[i].innerHTML+"</div>";
           } else {
             if (posttoggle!="Posts: Off") {
              b[i].innerHTML="<div id='off"+i+"' style=\"display:none\" onClick=\"this.nextSibling.style.display='';this.style.display='none'\"><img src=\""+getPic("expand")+"\"> -"+m[0]+"</div><div id='on"+i+"' onClick=\"this.previousSibling.style.display='';this.style.display='none'\">"+b[i].innerHTML+"</div>";
            } else {break;} 
           }
            }
          if (posttoggle!="Posts: Off") {
              toggleswitch="<select onChange=\"sp=document.getElementsByTagName('div');for (i=0; i<sp.length; i++) {";
            toggleswitch+="   if ((sp[i].id.match(/on/))&&(this.options[this.selectedIndex].value==1)) sp[i].onclick();";
            toggleswitch+="   if ((sp[i].id.match(/off/))&&(this.options[this.selectedIndex].value==2)) sp[i].onclick();";
            toggleswitch+="   if (this.options[this.selectedIndex].value==3) {";
            toggleswitch+="      if (sp[i].id.match(/off+/)) {";
            toggleswitch+="         if (!sp[i].lastChild.data.match(/[0-9]+ [0-9][0-9][0-9][0-9]/)) {";
            toggleswitch+="            sp[i].onclick();";
            toggleswitch+="         }";
            toggleswitch+="      }";
            toggleswitch+="   }";
            toggleswitch+="}\"><option value=1>Collapse All</option><option value=2>Expand All</option><option value=3 selected>Expand Today</option></select>";
          }
            if (posttoggle!="Posts: Off") {
              tbody[2].innerHTML=tbody[2].innerHTML+"<tr><td align=center colspan=2><b><font size=2>(Click on text inside post to collapse a specific post)</font></b><br>Use this to control all posts: "+toggleswitch+"</td></tr>";
            }
          } else {
            // new forum setup
            var xtitle = 'td[2]/table[1]/tbody/tr/td';
            var xdate = xtitle+'/text()[2]';
            var ximg = 'td[1]/table[1]';
            var xtext = 'td[2]/table[2]';
            var posts = $x("/html/body/table[2]/tbody/tr[2]/td/table/tbody/tr",document)
            for(var i=0;i<posts.length;i++) {
              try {
                var postdate = $x(xdate,posts[i])[0];
                var titley = $x(xtitle, posts[i])[0];
                var linky = document.createElement('a')
                if ((posttoggle=="Posts: New")&&(postdate.nodeValue.match(/[A-Za-z] [0-9]+ [0-9]+:[0-9]+ (AM|PM) EDT/))) {
                  $x(ximg, posts[i])[0].style.display="none";
                  $x(xtext, posts[i])[0].style.display="none";
                  linky.innerHTML="[expand]";linky.href = "javascript:// expand post";
                } else {
                  linky.innerHTML="[collapse]";linky.href = "javascript:// collapse post";
                }
                linky.addEventListener("click",function(e){
                  var styl = e["target"].parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[1].style
                  var styl2 = e["target"].parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.style
                  if (styl.display=="none") {
                    e["target"].innerHTML="[collapse]";
                    e["target"].href = "javascript:// collapse post";
                    styl.display="";
                    styl2.display="";
                  } else {
                    e["target"].innerHTML="[expand]";
                    e["target"].href = "javascript:// expand post";
                    styl.display="none";
                    styl2.display="none";
                  }
                },true)
                titley.appendChild(linky)
              } catch (e) { 
                //stuff
              }
            }
            var posttitle = $x("/html/body/table[2]/tbody/tr[1]/td/table/tbody/tr/td[1]",document)[0];
            posttitle.width="50%"
            posttitle.nextSibling.align="left"
            var toggler = "Expand & collapse all posts: <select id='toggler'><option></option><option "
            if (posttoggle=="Posts: New") toggler +="selected "
            toggler +="value=1>Expand Today<option "
            if (posttoggle=="Posts: All") toggler +="selected "
            toggler +="value=2>Expand All<option value=3>Collapse All</select>"
            posttitle.nextSibling.innerHTML = toggler
            $('toggler').addEventListener("change",function(e){
              posts = $x("/html/body/table[2]/tbody/tr[2]/td/table/tbody/tr",document)
              var linkx = "td[2]/table[1]/tbody/tr/td/a[2]"
              var datex = "td[2]/table[1]/tbody/tr/td/text()[2]"
              var imgx = "td[1]/table[1]"
              var txtx = "td[2]/table[2]"
              var sel = e["target"].options[e["target"].selectedIndex].value
              for(var i=0;i<posts.length;i++) {
                var toggle = $x(linkx,posts[i])[0];
                var date = $x(datex,posts[i])[0];
                if (toggle != null) {
                  switch (sel) {
                    case "1":
                      // expand today
                      if (date.nodeValue.match(/[A-Za-z] [0-9]+ [0-9]+:[0-9]+ (AM|PM) EDT/)) {
                        if (toggle.innerHTML=="[collapse]") sendClick(toggle)
                      } else {
                        if (toggle.innerHTML=="[expand]") sendClick(toggle)
                      }
                      break;
                    case "2":
                      // expand all
                      if (toggle.innerHTML=="[expand]") sendClick(toggle);
                      break;
                    case "3":
                      // collapse all
                      if (toggle.innerHTML=="[collapse]") sendClick(toggle);
                      break;
                  }
                }
              }
            },false)
          }
        }
        
        
        
        if (p.match('.bboard.q-and-a-post-reply-form.'+ft)||p.match('.bboard.q-and-a-post-new.'+ft))
        {
         var cp_cssElem="";
         var cp_spacer_image = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
         var cp_hexValues = Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
         var cp_currentColor = '';
         var cp_parentInputElement = null;
         
         
         function insertAtCursor(myField, myValue) {
          if (myField.selectionStart || myField.selectionStart == '0') 
          {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            var scrollTop = myField.scrollTop;
            myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
            myField.focus();
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;
            myField.scrollTop = scrollTop;
          } else {
            myField.value += myValue;
            myField.focus();
          }
         } // Thanks to Alex King for this function.  http://www.alexking.org/
        
         function checkRange(textbox)
         {
          var hasRange = false;
         
          var ss = textbox.selectionStart;
          var st = textbox.scrollTop;
          var es = textbox.selectionEnd;
           
          if (es <= 2)
          {
           es = textbox.textLength;
          }
           
          var start  = (textbox.value).substring(0, ss);
          var middle = (textbox.value).substring(ss, es);
          var end    = (textbox.value).substring(es, textbox.textLength);
          //alert(ss+ " " + st+ " " + es + " " + start + " " + middle + " " + end)
          if (textbox.selectionEnd - textbox.selectionStart > 0)
          {
           hasRange = true;
          }
          return hasRange;
         }
         
         function wrapTags(textbox, opentext, closetext)
         {
          var ss = textbox.selectionStart;
          var st = textbox.scrollTop;
          var es = textbox.selectionEnd;
          
          if (es <= 0)
          {
           es = textbox.textLength;
          }
         
          var start  = (textbox.value).substring(0, ss);
          var middle = (textbox.value).substring(ss, es);
          var end    = (textbox.value).substring(es, textbox.textLength);
         
          if ( textbox.selectionEnd - textbox.selectionStart > 0 )
          {
           middle = opentext + middle + closetext;
          } else {
           middle = opentext + middle; 
          }
           
          textbox.value = start + middle + end;
          var cpos = ss + (middle.length);
          textbox.selectionStart = cpos;
          textbox.selectionEnd   = cpos;
          textbox.scrollTop      = st;
          textbox.focus();  
         }
         
         function createButtons(array)
         {   
          for(var i=0; i<array.length; i++)
          {
           var button=document.createElement('input');
             button.type="button";
           button.id=array[i][1];
             button.value=array[i][0];
           //button.style.width=(array[i][0].length)*5+"px"
           //button.style.marginLeft="-5px";
             button.style.fontSize="9px";
           button.style.textAlign="left";
           switch(button.id){
            case 'i':
             button.style.fontStyle='italic';
             break;
            case 'b':
             button.style.fontWeight='bold';
             break;
            case 'u':
             button.style.textDecoration='underline';
             break;
            case 'del':
             button.style.textDecoration='line-through';
             break;
           }
         
           $('insertPoint').appendChild(button);
           $('insertPoint').innerHTML += "<br>";
          }
         }
         
         function insertSimple(event) 
         {
          var textBox = document.getElementsByName("message");
          var selectBox = document.getElementsByName("html_p");
         
          if(checkRange(textBox[0]))
          {
           wrapTags(textBox[0], '<'+event.target.id+'>','</'+event.target.id+'>')
           selectBox[0].selectedIndex=1;
          }
          else if (this.value.indexOf('*') < 0)
          {
           this.value+="*";
           insertAtCursor(textBox[0],'<'+event.target.id+'>');
           selectBox[0].selectedIndex=1;
          } else {
           this.value=this.value.replace(/\*/,"");
           insertAtCursor(textBox[0],'</'+event.target.id+'>');
          }
          livePreview(textBox[0].value);
         }
         
         function insertLink() 
         {
          var textBox = document.getElementsByName("message");
          var selectBox = document.getElementsByName("html_p");
         
          if(checkRange(textBox[0]))
          {
           var enterURL = prompt("Enter target URL:", "http://");
             if ((enterURL==null)||(enterURL=="")) return;
             if(enterURL.match("carnageblender.com"))
           {
            enterURL=enterURL.split("carnageblender.com")[1];
            if (!enterURL)
            {
             enterURL="/";
            }
           } else if (enterURL.match("69.60.124.245")) {
            enterURL=enterURL.split("69.60.124.245")[1];
            if (!enterURL)
            {
             enterURL="/";
            }
           }
           if (!enterURL)
           { 
            alert("No url specified!");
            textBox[0].focus();  
            return; 
           }
           wrapTags(textBox[0], '<a href="'+enterURL+'">','</a>')
           selectBox[0].selectedIndex=1;
          }
          else if (this.value.indexOf('*') < 0)
          {
           var enterURL = prompt("Enter target URL:", "http://");
           if ((enterURL==null)||(enterURL=="")) return;
           if(enterURL.match("carnageblender.com"))
           {
            enterURL=enterURL.split("carnageblender.com")[1];
            if (!enterURL)
            {
             enterURL="/";
            }
           } else if (enterURL.match("69.60.124.245")) {
            enterURL=enterURL.split("69.60.124.245")[1];
            if (!enterURL)
            {
             enterURL="/";
            }
           }
           if (!enterURL)
           { 
            alert("No url specified!");
            textBox[0].focus();  
            return; 
           }
           this.value+="*";
           insertAtCursor(textBox[0],'<a href="'+enterURL+'">');
           selectBox[0].selectedIndex=1;
          } else {
           this.value=this.value.replace(/\*/,"");
           insertAtCursor(textBox[0],'</a>');
          }
          livePreview(textBox[0].value);
         }
         
         function insertImage() 
         {
          var textBox = document.getElementsByName("message");
          var selectBox = document.getElementsByName("html_p");
         
          var enterURL = prompt("Enter image URL:", "http://");
          if (!enterURL)
          { 
           alert("No url specified!");
           textBox[0].focus(); 
           return;
          }
         
          if(checkRange(textBox[0]))
          {
           wrapTags(textBox[0],"",'<img src="'+enterURL+'">')
           selectBox[0].selectedIndex=1;
          } else {
         
           insertAtCursor(textBox[0],'<img src="'+enterURL+'">');
           selectBox[0].selectedIndex=1;
          }
          livePreview(textBox[0].value);
         }
         
         function insertList(event) 
         {
          var textBox = document.getElementsByName("message");
          var selectBox = document.getElementsByName("html_p");
         
          var listvalue = "init";
          var thelist   = "";
          
          while ((listvalue != "") && (listvalue != null))
          {
           listvalue = prompt("Enter a list item. Click 'cancel' or leave blank to end list.", "");
           
           if ((listvalue != "") && (listvalue != null))
           {
            thelist = thelist+"<li>"+listvalue+"\n";
           }
          }
          if (thelist != "")
          { 
           if(checkRange(textBox[0]))
           {
            wrapTags(textBox[0],"","<"+event.target.id+">" + "\n" + thelist + "</"+event.target.id+">");
           } else {
            insertAtCursor(textBox[0],"<"+event.target.id+">" + "\n" + thelist + "</"+event.target.id+">");
           }
           selectBox[0].selectedIndex=1;
          }
          livePreview(textBox[0].value);
         }
         
         // this introduces some delay so that the code is not re-evaluated at every keystroke.
         function livePreview(thecode)  {
          /*if (GM_getValue("cb2preview",'1')==0) return;
           if(t) { window.clearTimeout(t) }
          code = thecode;
          t = window.setTimeout(function(){
           var selectBox = document.getElementsByName("html_p");
           //var prev = window.open("","preview");
           var prev = $('newFrame')
           //prev.document.open();
           //prev.document.writeln('<html><head><title>live preview window</title><link Type="text/css" Rel=stylesheet HRef="'+cssref+'"></head>');
           //prev.document.writeln("<body>\n");
           if (selectBox[0].selectedIndex == 0)
           {
            //prev.document.writeln("</body></html>");
            var lines = code.split("\n");
            var inserttxt = ""
            for(var i=0; i < lines.length; i++)
            {
              inserttxt+=lines[i]+'<br>\n'
                 //prev.document.body.appendChild(document.createTextNode(lines[i]+'\n')); // use text nodes so that html tags appear as plaintext, and preserve linebreaks for html readability
              //prev.document.body.appendChild(document.createElement("br")); // preserve line breaks
             }
               //if (prev.document.body != null)
                 
             prev.innerHTML=inserttxt
           } else {
            //prev.document.writeln(code);
            //prev.document.writeln("</body></html>");
            prev.innerHTML=thecode
           }
           //prev.document.close();
          },1000);*/
         }
         
         function cp_showSatBrightBox2(event) {
           var colArr=event["target"].parentNode.getAttribute("secretcolor").split(",")
           cp_showSatBrightBox(new Array(colArr[0],colArr[1],colArr[2]))
         }
         
         function cp_showSatBrightBox(col) {
           var element = $('cp_satbrightbox');
           if ( element.hasChildNodes() )
           {
             while ( element.childNodes.length >= 1 )
             {
               element.removeChild( element.firstChild );
             }
           }
           s = 16; // steps
           colEnd = Array();
           col[0] = 256 - col[0];
           col[1] = 256 - col[1];
           col[2] = 256 - col[2];
         
           // calculating row end points
           for (j = 0; j < 3; j++) {
             colEnd[j] = Array();
             for (i = s; i > -1; i--) {
               colEnd[j][i] =  i * Math.round(col[j] / s);
             }
           }
           hexStr = '';
           for (k = s; k > -1; k--) {
             for (i = s; i > -1; i--) {
               for (j = 0; j < 3; j++) {
                 dif = 256 - colEnd[j][k];
                 quot = (dif != 0) ? Math.round(dif / s) : 0;
                 hexStr += cp_toHex(i * quot);
               }
               cpspan=document.createElement('span')
               cpspan.style.backgroundColor="#"+hexStr;
               aclick=document.createElement('a')
               aclick.setAttribute("secretcolor",hexStr)
               aclick.addEventListener("click",cp_showColorBox,false)
               aclick.innerHTML="<img border=0 width=8 height=8 src=\"" + cp_spacer_image + "\"/>"
               cpspan.appendChild(aclick)
               element.appendChild(cpspan)
               hexStr = '';
             }
             var brline = document.createElement('br')
             element.appendChild(brline)
           }
         }
         
         function cp_showSpectrumBox() {
           element = $('cp_spectrumbox');
           if ( element.hasChildNodes() )
           {
             while ( element.childNodes.length >= 1 )
             {
               element.removeChild( element.firstChild );       
             }
           }
           d = 1; // direction
           c = 0; // count
           v = 0; // value
           s = 16; // steps
           col = Array(256, 0, 0); // color array [0] red, [1] green, [2] blue
           ind = 1; // index
           cel = 256; //ceiling
           
           while (c < (6 * 256)) {
             cpspan=document.createElement('span')
             cpspan.style.backgroundColor=cp_toHex(col[0]) + cp_toHex(col[1]) + cp_toHex(col[2])
             aclick=document.createElement('span')
             aclick.setAttribute("secretcolor",new Array(col[0],col[1],col[2]))
             aclick.innerHTML="<img border=0 width=3 height=15 src=\"" + cp_spacer_image + "\"/>"
             aclick.addEventListener("click",cp_showSatBrightBox2,false)
             cpspan.appendChild(aclick)
             element.appendChild(cpspan)
             c += s;
             v += (s * d);
             col[ind] = v;
             
             if (v == cel) {
               ind -= 1;
               if (ind == -1) ind = 2;
               d = d * -1;
             }
             
             if (v == 0) {
               ind += 2;
               if (ind == 3) ind = 0;
               d = d * -1;
             }
           }
           cp_showSatBrightBox(col);
         }
         
         function cp_toHex(num) {
           if (num > 0) num -= 1;
           base = num / 16;
           rem = num % 16;
           base = base - (rem / 16);
           return cp_hexValues[base] + cp_hexValues[rem];
         }
         
         function cp_showColorBox(event) {
           hexStr=event["target"].parentNode.getAttribute("secretcolor")
           colorbox = $('cp_colorbox');
           spanny = document.createElement("span")
           spanny.style.backgroundColor=hexStr
           imgr = document.createElement("img")
           imgr.height=20
           imgr.width=60
           imgr.src=cp_spacer_image
           spanny.appendChild(imgr)
           colorbox.replaceChild(spanny,colorbox.firstChild)
           hexvaluebox = $('cp_hexvaluebox');
           inputt = document.createElement("input")
           inputt.type="text"
           inputt.value=hexStr
           hexvaluebox.replaceChild(inputt,hexvaluebox.childNodes[1])
           cp_currentColor = hexStr;
         }
         
         function cp_show() {
           var element = $('cp_colorpickerbox');
           element.style.visibility = 'visible';
           $('bCover').style.display=""
         }
         
         function cp_ok() {
           var textBox = document.getElementsByName("message");
           var selectBox = document.getElementsByName("html_p");
          if (cp_currentColor.length == 0) {
            cp_hide;
            return;
           }
           if(checkRange(textBox[0]))
           {
             wrapTags(textBox[0], '<div style="color:#'+cp_currentColor+'">','</div>')
            selectBox[0].selectedIndex=1;
           }
           else if ($('fontcol').value.indexOf('*') < 0)
           {
            $('fontcol').value+="*";
            insertAtCursor(textBox[0],'<div style="color:#'+cp_currentColor+'">');
            selectBox[0].selectedIndex=1;
           } else {
            $('fontcol').value=$('fontcol').value.replace(/\*/,"");
            insertAtCursor(textBox[0],'</div>');
           }
           livePreview(textBox[0].value);
           cp_hide();
         }
         
         function cp_hide() {
           element = $('cp_colorpickerbox');
           element.style.visibility = 'hidden';
           $('bCover').style.display="none"
         }
         
         function changeColor(e) {
           if ($('fontcol').value.indexOf('*') > 0) {
             insertAtCursor(document.getElementsByName("message")[0],'</div>');
             $('fontcol').value=$('fontcol').value.replace(/\*/,"");
           } else {
             posx = e.clientX;
            posy = e.clientY;
            $('cp_colorpickerbox').style.position = "fixed"
            //alert(document.body.scrollHeight)
            $('cp_colorpickerbox').style.top = (document.body.offsetHeight/2)-200;
            $('cp_colorpickerbox').style.left = (document.body.offsetWidth/2)-150;
             cp_show()
           }
         }
         
         function fontSizer(e) {
           var textBox = document.getElementsByName("message");
           if ($('fontsiz').value.indexOf('*') > 0) {
             insertAtCursor(textBox[0],'</div>');
             $('fontsiz').value=$('fontsiz').value.replace(/\*/,"");
           } else {
            fontSize = prompt("Enter the font size (1, 5, 7, etc.),  click 'cancel' or leave blank to end list.", "");
             if ((fontSize != "")&&(fontSize!=null))
             {
               var selectBox = document.getElementsByName("html_p");
              if(checkRange(textBox[0]))
              {
                 wrapTags(textBox[0], '<div style="font-size:'+fontSize+'">','</div>')
               selectBox[0].selectedIndex=1;
              }
              else if ($('fontsiz').value.indexOf('*') < 0)
              {
               $('fontsiz').value+="*";
               insertAtCursor(textBox[0],'<div style="font-size:'+fontSize+'">');
               selectBox[0].selectedIndex=1;
              } else {
               $('fontsiz').value=$('fontsiz').value.replace(/\*/,"");
               insertAtCursor(textBox[0],'</div>');
              }
              livePreview(textBox[0].value);
             }
           }
         }
         // --------------------------------------------------------------------------------------------
         var textBox = document.getElementsByName("message");
         var selectBox = document.getElementsByName("html_p");
         var t;
         var code;
         var cssref;
         try {
           livePreview(textBox[0].value);
         } catch (e) {}
         cssref = document.getElementsByTagName("link")[0]
         cssref=cssref.href;
         
         textBox[0].addEventListener("keypress",function(e){
          if(e.which == 13 && selectBox[0].selectedIndex==1)
           insertAtCursor(textBox[0],"<br>");
         },false);
         
         /*
         
         // TODO: Find a way to display this on the screen somewhere that won't get in the way
           
         textBox[0].addEventListener("keyup",function(e){
          livePreview(this.value);
         },false);
         
         selectBox[0].addEventListener("change",function(e){
          livePreview(document.getElementsByName("message")[0].value);
         },false);
         
         var newFrame=document.createElement("div");
         newFrame.id='newFrame';
         newFrame.border=2
         newFrame.style.height="182px";
         newFrame.style.width="400px";
         newFrame.style.position="fixed"
         newFrame.style.right="1px";
         newFrame.style.bottom="15px";
         newFrame.style.MozOpacity="0.7";
         newFrame.name="preview";
        
         var myText = document.createTextNode("Live Preview (1 second delay):");
         var font = document.createElement("font");
         font.style.fontWeight = "bold";
         font.style.fontSize="16px";
         font.id="preTitle"
         font.appendChild(myText);
         
         
         newDiv.appendChild(font);
         */
         
         var newDiv = document.createElement("div");
         newDiv.className="section-bg"
         newDiv.style.position="fixed"
         newDiv.style.left="1px"
         newDiv.style.bottom="15px"
         newDiv.style.MozOpacity="0.9"
         var toggleBut = document.createElement("input");
         toggleBut.type="button"
         toggleBut.value="-hide-"
         toggleBut.style.fontWeight="bold"
         toggleBut.addEventListener("click",function(){
           if ($("insertPoint").style.display=="none") {
              $("insertPoint").style.display = ""
              this.value="-hide-"
          } else {
           $("insertPoint").style.display = "none"
           this.value="-show-"
          }
         },true);
         var insertDiv = document.createElement("span");
         insertDiv.id="insertPoint"
         
         newDiv.appendChild(toggleBut)
         newDiv.appendChild(insertDiv)
         
         document.body.appendChild(newDiv)
         
         //getElemT("p")[getElemT("p").length-1].appendChild(newDiv)
         //document.body.appendChild(newDiv)
         /*
         header=document.createElement('th');
         header.align='right';
         header.innerHTML+='HTML:&nbsp;';
         
         data=document.createElement('td');
         data.className='section-bg';
         data.id='insertPoint';
         
         row=document.createElement('tr');
         row.id='rowPoint';
         row.appendChild(header);
         row.appendChild(data);
         var newbr = document.createElement('br')
         row.appendChild(newbr);
         var xselect = '/html/body/form/table/tbody/tr[1]/td';
         var selectrow = document.evaluate(xselect,document,null,XPathResult.ANY_TYPE,null).iterateNext();
         
         selectrow.appendChild(row)
         */
         
         //selectBox[0].parentNode.parentNode.parentNode.insertBefore(row,textBox[0].parentNode.parentNode);
         //$('insertPoint').appendChild(button);
         $('insertPoint').innerHTML += "<br>";
         simpleButtons = new Array();
         simpleButtons[0] = new Array('NoSpell','nospellcheck');
         simpleButtons[1] = new Array('Bold','b');
         simpleButtons[2] = new Array('Under','u');
         simpleButtons[3] = new Array('Italic','i');
         simpleButtons[4] = new Array('Strike','del');
         simpleButtons[5] = new Array('Code','code');
         createButtons(simpleButtons);
         complexButtons = new Array();
         complexButtons[0] = new Array('Link','link');
         complexButtons[1] = new Array('Image','image');
         complexButtons[2] = new Array('# List','ol');
         complexButtons[3] = new Array('* List','ul');
         complexButtons[4] = new Array('Color','fontcol');
         complexButtons[5] = new Array('Size','fontsiz');
         createButtons(complexButtons);
         
         // TODO: Toggle button for preview pane
         
         /*
         var liveToggle = document.createElement('input')
         liveToggle.type = "button"
         switch (GM_getValue("cb2preview",1)) {
          case 0:
            liveToggle.value = "Live Preview: Off"
            newFrame.style.visibility="hidden"
            font.style.visibility="hidden"
            break;
          case 1:
            liveToggle.value = "Live Preview: On"
            font.style.visibility="visible"
            newFrame.style.visibility="visible"
            break;
         }
         liveToggle.addEventListener("click",function(e){
            if (GM_getValue("cb2preview",1)==1) {
              GM_setValue("cb2preview",0)
              e["target"].value="Live Preview: Off"
              $('newFrame').style.visibility="hidden"
              $('preTitle').style.visibility="hidden"
            } else {
              GM_setValue("cb2preview",1)
              e["target"].value="Live Preview: On"
              $('newFrame').style.visibility="visible"
              $('preTitle').style.visibility="visible"
            }
         },false)
         */
         
         // Old method of inserting GUI buttons
         
         /*
         selectBox[0].parentNode.parentNode.appendChild(document.createTextNode("\u00a0"));
         selectBox[0].parentNode.parentNode.appendChild(newTd);
         textBox[0].parentNode.parentNode.appendChild(document.createTextNode("\u00a0"));
         textBox[0].parentNode.parentNode.appendChild(newFrame);
         
         row2=document.createElement('tr');
         row2.appendChild(document.createElement('td'));
         row2.appendChild(plusbutton);
         row2.appendChild(document.createTextNode("\u00a0"));
         row2.appendChild(minusbutton);
         row2.appendChild(document.createTextNode("\u00a0"));
         row2.appendChild(liveToggle);
         
         selectBox[0].parentNode.parentNode.parentNode.appendChild(row2);
         */
         
         
         // Register all the buttons to their event listeners
         for(var i=0; i<simpleButtons.length;i++)
          $(simpleButtons[i][1]).addEventListener("click",insertSimple,false);
         $('link').addEventListener("click",insertLink,false);
         $('image').addEventListener("click",insertImage,false);
         $('ol').addEventListener("click",insertList,false); 
         $('ul').addEventListener("click",insertList,false);
         $('fontcol').addEventListener("click",changeColor,false);
         $('fontsiz').addEventListener("click",fontSizer,false);
         
         var plusbutton=document.createElement('input');
          plusbutton.type="button";
          plusbutton.value="+";
           plusbutton.id='makebigger';
          plusbutton.style.fontSize="12px";
         var minusbutton=document.createElement('input');
          minusbutton.type="button";
          minusbutton.value="-";
           minusbutton.id='makesmaller';
          minusbutton.style.fontSize="12px";
         
         $('insertPoint').appendChild(minusbutton)
         $('insertPoint').appendChild(plusbutton)
         
         $('makebigger').addEventListener("click",function(){
          textBox[0].rows+=6;
          textBox[0].focus();
         },false);
         $('makesmaller').addEventListener("click",function(){
          if (textBox[0].rows>=15)
          {
           textBox[0].rows-=6;
           textBox[0].focus();
          } else {
           alert("Can't get any smaller!");
           textBox[0].focus();
          }
         },false);
         
         colorpick = document.createElement('div')
         colorpick.style.visibility='hidden'
         colorpick.style.position='fixed'
         colorpick.style.top=0
         colorpick.style.left=0
         
         var cphtml= '<div id="cp_colorpickerbox" style="top:0;left:0;position: absolute; display: nonde; border: 1px solid #000000;padding: 10px; width: 291px; height: 165px; background-color: #FFFFFF; z-index:255">'
         cphtml+=    '<div id="cp_spectrumbox" style="position: absolute; border: 1px solid #000000; font-size: 40px;">&nbsp;</div>'
         cphtml+=    '<div id="cp_satbrightbox" style="position: absolute; border: 1px solid #000000; top: 35px; left: 10px;">&nbsp;</div>'
         cphtml+=    '<div id="cp_colorbox" style="position: absolute; border: 1px solid #000000; top: 35px; left: 160px; font-size: 40px;">'
         cphtml+=    '<img src="'+cp_spacer_image+'" / style="border: 0px; width: 128px; height: 15px;">'
         cphtml+=    '</div>'
         cphtml+=    '<div id="cp_hexvaluebox" style="position: absolute; border: 0px solid #000000; top: 70px; left: 160px; font-size: 14px;">'
         cphtml+=    '#<input type="text" value="" style="border: 1px solid #000000; width: 100px; font-family: font-size: 14px;" /></div>'
         cphtml+=    '<div id="cp_controlbox" style="position: absolute; border: 0px solid #000000; top: 120px;left: 210px;">'
         cphtml+=    '<input id="cpokbutton" type="submit" value="OK" style="border: 1px solid #000000; width: 78px; height: 16px; font-family: font-size: 10px; background-color: #FFFFFF;"/>'
         cphtml+=    '<br /><br />'
         cphtml+=    '<input id="cpcancelbutton" type="submit" value="Cancel" style="border: 1px solid #000000; width: 78px; height: 16px; font-family: font-size: 10px; background-color: #FFFFFF;" /></div></div>'
         //position: absolute; border: 1px solid #000000; top: 35px; left: 160px; font-size: 40px;
         colorpick.innerHTML=cphtml
         document.body.appendChild(colorpick)
         bCover=document.createElement('div')
         bCover.style.backgroundColor="#000000"
         bCover.style.opacity="0.3"
         bCover.style.position="fixed"
         bCover.style.top=0;
         bCover.style.left=0;
         bCover.style.width=document.body.scrollWidth
         bCover.style.height=document.body.scrollHeight
         bCover.style.display="none"
         bCover.id="bCover"
         document.body.appendChild(bCover)
         cp_showSpectrumBox()
         $('cpokbutton').addEventListener("click",cp_ok,false);
         $('cpcancelbutton').addEventListener("click",cp_hide,false);
         // --------------------------------------------------------------------------------------------
        }
        
        /*
        List of pages where bookmark buttons will pop up
         
        /shared/community-member   /inspect_opponent   /gc/view-one  /gc/auction-rare
        /gc/auction-hot   /diy-stats   /scores_list_all   /minion-stats-all   /minion-stats-spells-all
        /stats-user   /stats-item   /stats-tattoo   /clans/view   /clans/stats   /clans/stats-i
        /clans/rivalry   /clans/stats-economic.tcl   /directory/trivia-generalitems  
        /directory/browse-by-item    /directory/party-power-graph   /directory/spell-popularity
        /directory/transfers   /directory/user-data   /wiki/
        */
        
        function addBookmarkButton() {
          var favs=GM_getValue('cb2fav','0');
          if ((favs!=0)&&(favs!="")) {favs=favs.split(',,,')} else {favs=null}
          if (favs) if (isIn(makeRegexReady(document.location.href),favs)) return;
          var dd=document.createElement('div')
          dd.innerHTML="<font style='font-size:10px;color:#000000 !important'>Bookmark:</font><br><a style='color:#000000 !important' title='Add this page to bookmarks' href='javascript://add to bookmarks'>+</a>&nbsp;<a style='color:#000000 !important' title='Add this page to bookmarks with custom title' href='javascript://add to bookmarks'>C</a>&nbsp;<a style='color:#000000 !important' title='Remove this button from page until it is reloaded' href='javascript://remove this button from page until it is reloaded' onclick='parentNode.parentNode.removeChild(parentNode)'>x</a>"
          dd.id="GMAddFavButton";
          dd.style.position="fixed";
          dd.style.left="1px";
          dd.style.bottom="1px";
          dd.style.fontSize="15px";
          dd.style.background="#FFFFFF";
          document.body.appendChild(dd)
          $('GMAddFavButton').childNodes[2].addEventListener("click",savepost5,true);
          $('GMAddFavButton').childNodes[4].addEventListener("click",savepost6,true);
        }
        
        function warning(evt) {
          var realname = this.id;
          realname=realname.substr(0,this.id.length-1)
          if (confirm ("Are you sure you want to update the '"+realname+"' variable?  There is no going back!")) {
              GM_setValue(realname,$(realname).value);
              alert(realname+' variable updated! Right click the sidebar and click refresh.\nNOTE: Make sure not to click or hover over any GM buttons while doing this otherwise your changes might be lost.\n')
          }
        }
        
        function displayRawData() {
          var fff=GM_getValue("cb2fav","empty"),ttt=GM_getValue("cb2train","empty"),ppp=GM_getValue("prefs","empty")
          var a=document.createElement('div')
          a.style.width="100%"
          a.align="center"
          a.innerHTML+="Raw Greasemonkey Data - you can use this page to backup and edit the GM data directly, you can also access this data by opening the about:config page inside of Firefox.<br><h2><b>MODIFY AT YOUR OWN RISK!</b></h2></div><div style='width:100%'><div style='position:absolute;left:0%;width:32%'>"
          a.innerHTML+="Bookmarks - cb2fav - <a id='cb2favl' href='javascript:// update cb2fav variable directly'>update</a></div><div style='position:absolute;left:33%;width:32%'>"
          a.innerHTML+="Training Sets - cb2train - <a id='cb2trainl' href='javascript:// update cb2train variable directly'>update</a></div><div style='position:absolute;left:66%;width:32%'>"
          a.innerHTML+="Preferences - prefs - <a id='prefsl' href='javascript:// update prefs variable directly'>update</a></div></div><br><div style='width:100%'>"
          a.innerHTML+="<textarea id='cb2fav' rows=10 style='position:absolute;left:0%;width:32%;overflow:scroll'>"+fff+"</textarea>"
          a.innerHTML+="<textarea id='cb2train' rows=10 style='position:absolute;left:33%;width:32%;overflow:scroll'>"+ttt+"</textarea>"
          a.innerHTML+="<textarea id='prefs' rows=10 style='position:absolute;left:66%;width:33%;overflow:scroll'>"+ppp+"</textarea>"
          document.body.appendChild(a);
          $('prefsl').addEventListener("click",warning,true);
          $('cb2trainl').addEventListener("click",warning,true);
          $('cb2favl').addEventListener("click",warning,true);
        }
        
        if ((p.match('q-and-a-one-category.'+ft))||(p.match('q-and-a.'+ft+'.topic_id.'))) {
          var lis=document.getElementsByTagName('ul')[0].childNodes
          var favs=GM_getValue('cb2fav','0');
          var favbutton;
          if ((favs!=0)&&(favs!="")) {favs=favs.split(',,,')} else {favs=null}
          for (i=1;i<lis.length;i++){
            favbutton=true;
            id=lis[i].innerHTML.match(/"q-and-a-fetch-msg.tcl.msg.id.([0-9a-zA-Z]+)">/)[1]
            if (favs) if (isIn(id,favs)) {lis[i].innerHTML="<b>"+lis[i].innerHTML+"</b>";favbutton=false;} 
            if (favbutton) {
              lis[i].innerHTML="<span id='"+id+"' title='Add to Bookmark to Sidebar' style='text-decoration:underline;cursor:pointer'>*</span>&nbsp;&nbsp;"+lis[i].innerHTML
              lis[i].childNodes[0].addEventListener("click",savepost2,true)
            } else {lis[i].innerHTML="<span id='"+id+"' title='Bookmark Already Added' style='text-decoration:underline;cursor:pointer'>*</span>&nbsp;&nbsp;"+lis[i].innerHTML} 
          }
        }
        
        
        if (p.match('q.and.a.fetch.msg.'+ft)) {addTogglesInPost();addBookmarkButton();}
        if (p.match(/store|gc.(place-ad|add-alert|my-bids|my-auctions|auction-hot|auction-rare)|recent_battles|wiki|shared.community-member|inspect_opponent|directory.(browse|browse-recent|browse-veryrecent|browse-new|portrait-browse|mentors|user-data|party-power-graph|spell-popularity|transfers|browse-by-item|trivia-generalitems)|clans.(view|stats|rivalry|stats-economic)|stats-(user|item|tattoo)|minion-stats-(all|spells-all)|scores.list.all|diy-stats|gc.view-one/)) {addBookmarkButton();}
        if (p.match("pvt.home."+ft)) {displayRawData();}
        
        // Add links to transfer log in purchase log per user
        if (p.match('.directory.purchases.'+ft)) {
         var matchmember = new RegExp("(<a href=..shared.community-member.tcl.user_id=)([0-9]+)(.>)(.+?)(<\\/a>)","g")
          var replacemember = "$1$2$3$4$5 <b><a title='View transfer log for this person' href='/directory/transfers.tcl?uid=$2'>[t]</a></b>"
          document.body.innerHTML=document.body.innerHTML.replace(matchmember,replacemember)
        }
        
        // Add links for auctions in transfer log
        if (p.match('directory.transfers.'+ft)) {
          bodyr=document.body.innerHTML
          bodyr=bodyr.replace(matchmember,replacemember)
          bodyr=bodyr.replace(/\((end-auction|outbid|bid|begin auction|auction-overage|bid-increase|start-auction) ([0-9]+)\)/g,"<a title='View this auction' href='/gc/view-one.tcl?classified_ad_id=$2'>($1 $2)</a>")
          document.body.innerHTML=bodyr
        }
        
        // Bot check sound and visual changes
        if (document.title == 'Security') {
          function Sound(surl) {
           $("snd").innerHTML="<embed src='"+surl+"' hidden=true autostart=true loop=false>";
          }
         function botCheckChanges(){
            document.getElementsByTagName('input')[1].style.fontSize="32px";
            document.getElementsByTagName('input')[1].style.fontStyle="italic";
            Sound("data:audio/x-wav;base64,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")
          }
          getPrefs();
          if (prefs['botchange']==1) {
            var spn = document.createElement('span')
            spn.innerHTML="<span id='snd'></span>"
            document.body.appendChild(spn)
            window.addEventListener("load",botCheckChanges,true);
          }
        }
        
        // Refresh button in main home page and linkify the characters name (for those of us with proxy caching issues)
        function homePageChanges() {
         var side = unsafeWindow.top.frames[0].document
         var charid = side.getElementsByTagName('select')[0].options[side.getElementsByTagName('select')[0].selectedIndex].value
         var charname = trim(unsafeWindow.$("#character h1")[0].childNodes[0].nodeValue);
         var charcolor = window.getComputedStyle(unsafeWindow.$("#character h1")[0],'').getPropertyValue("color");
        
         // The span put in place of the minions name
         var charspan = document.createElement('span');
         charspan.style.color=charcolor;
         charspan.innerHTML = "<a title='Inspect "+charname+"' href='/inspect_opponent.tcl?opponent_id="+charid+"'>"+charname+"</a>"
        
         // The span put at the end of the H1 in order to have a "refresh button"
         var newspan = document.createElement('span')
          newspan.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:document.location.reload('false')\"><img border=0 src=\""+getPic("refresh")+"\"></a>&nbsp;&nbsp;"
          
         unsafeWindow.$("#character h1")[0].removeChild(unsafeWindow.$("#character h1")[0].childNodes[0]);
         unsafeWindow.$("#character h1")[0].insertBefore(charspan,unsafeWindow.$("#character h1")[0].childNodes[0])
         unsafeWindow.$("#character h1")[0].appendChild(newspan);
        }
        
        if (typeof loader == "undefined") { var loader = 0; }
        
        if (document.getElementsByTagName('frame').length > 0) {
          // Need to wait for both frames to load before changing stuff
          window.frames[0].addEventListener("load",waitForFullyLoaded,true);
          window.frames[1].addEventListener("load",waitForFullyLoaded,true);
          function waitForFullyLoaded() {
            loader=loader+1;
            if (loader>=2) homePageChanges();
          }
        }
        
        // Try to change the home page if sidebar is already loaded
        if ((p.match(/http\:\/\/[a-zA-Z0-9\.]+\/$/))&&(window!=top))
        {try { homePageChanges(); } catch (e) { } }
        