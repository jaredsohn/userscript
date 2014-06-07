// ==UserScript==
// @name           İkariam Savaş Stratejisi v.1.2
// @namespace      overkill_gm
// @version        0.9
// @description    Savaş Alanı V.3.4 Stratejisi Böylece Savaşa Gönderdiginiz Adamların Nasıl Yerleşecegini Görebilirsiniz..(www.ikariam.forumm.biz)
// @include        http://s*.ikariam.*/index.php*view=plunder&dest*
// @include        http://s*.ikariam.*/index.php*view=occupy&dest*
// @include        http://s*.ikariam.*/index.php*view=blockade&dest*
// ==/UserScript==


function debug() { var msg = []; for (var i = 0, n = arguments.length; i<n; ++i) msg.push(arguments[i]); setTimeout(function() { throw new Error("[debug] " + msg.join(' ')); }, 0);}
function copy(old){ var neu = {}; if (old) for (thing in old) neu[thing] = old[thing]; else neu = false; return neu; }
$ = document.getElementById;
function $x( xpath, root ) { var doc = root ? root.evaluate ? root : root.ownerDocument : document, next; var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = []; switch (got.resultType) { case got.STRING_TYPE: return got.stringValue; case got.NUMBER_TYPE: return got.numberValue; case got.BOOLEAN_TYPE: return got.booleanValue; default: while (next = got.iterateNext()) result.push( next ); return result; } } 
function $X( xpath, root ) { var got = $x( xpath, root ); return got instanceof Array ? got[0] : got; } 
function node(type, className, styles, content) { var n = document.createElement(type||"div"); if (className) n.className = className; if (styles) for (var prop in styles) n.style[prop] = styles[prop]; if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString(); return n; } 
function remove(node){ if (node) return node.parentNode.removeChild(node); }
function removeChildren(node){ if ( node.hasChildNodes() ){ while ( node.childNodes.length >= 1 ) node.removeChild( node.firstChild ); } }
function onClick(node, fn, capture, e) { node.addEventListener((e||"") + "click", fn, !!capture); }
function addLoadEvent(func) {
  var oldonload = unsafeWindow.onload;
  if (typeof unsafeWindow.onload != 'function') {
    unsafeWindow.onload = func;
  } else {
    unsafeWindow.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

var land = "" + <><![CDATA[
  <div class="battlefield_city_A_D" id="battlefield">    
    <div id="resAttacker">
      <div class="nav">
        <ul>
          <li><a id="attBack" href="javascript:;" style="visibility: hidden;">&lt;&lt;</a></li>
          <li class="res">Yedekler</li>
          <li><a id="attFore" href="javascript:;" style="visibility: hidden;">&gt;&gt;</a></li>
        </ul>
      </div>
      <div class="units "><ul></ul></div>            
    </div>
    <div id="fieldAttacker"></div>
  </div>
]]></>;

var sea = "" + <><![CDATA[
  <div class="battlefield_sea_A_D" id="battlefield">    
    <div id="resAttacker">
      <div class="nav">
        <ul>
          <li><a id="attBack" href="javascript:;" style="visibility: hidden;"><<</a></li>
          <li class="res">Yedekler</li>
          <li><a id="attFore" href="javascript:;" style="visibility: hidden;">>></a></li>
        </ul>
      </div>
      <div class="units ships"><ul></ul></div>            
    </div>
    <div class="seafight" id="fieldAttacker"></div>
  </div>
]]></>;
    
function init(){

  function main(){
    function getForce(){
      var plunderForm = { };
      var inputs = $x('//*[@id="mainview"]/form[1]/div[1]//input[@class="textfield"]');
      for (var i = 0; i<inputs.length; ++i){
        if (inputs[i].value != "0") {
          plunderForm[inputs[i].name.replace(/cargo_\w+_/,'')] = parseInt(inputs[i].value,10);
        }
      }
      return plunderForm;
    }
    function distributeForce(){
      function place(unit,position,slots,size,addToReserve){
        function addReserve(unit,number){
          if (number > 0) {
            reserve.push([unit,number]);
            force[unit] -= number;
          }
        }
        function slotsFree(slots){
          var sum = 0;
          for each (var slot in slots) if (slot === 0) sum++;
          return sum;
        }
        if (slots) {
          var free   = slotsFree(distribution[position]);
          var max    = free*size;
          if (addToReserve) addReserve(unit,force[unit]-max);
          //debug(unit,position,slots,'size"',size,addToReserve,'free"',free,'max"',max);
          var limit = Math.min(force[unit]/size,free);
          for (var i = 0; i < limit; i++)
          {
            distribution[position][i + (slots-free)] = [unit,Math.min(size,force[unit])];
            force[unit] -= size;
          }
        } else if (addToReserve) {
          addReserve(unit,force[unit]);
          force[unit] = 0;
        }
      }
      if (field == "sea") // this if statement is unnecessary but i think it improves readability
      {
        //air - diving boat
        if (force[212]) place(212,'air',distribution.air.length,30,true);
        // long range
        if (force[213]) place(213,'longRange',distribution.longRange.length,10,false);  // ballista
        // main
        if (force[213]) place(213,'main',distribution.main.length,10,true); // ballista
        if (force[210]) place(210,'main',distribution.main.length,10,true); // ram
        if (force[211]) place(211,'main',distribution.main.length,10,true); // fire
        if (force[216]) place(216,'main',distribution.main.length,10,true); // pwr
        //long range
        if (force[215]) place(215,'longRange',distribution.longRange.length,10,true); // mortar
        if (force[214]) place(214,'longRange',distribution.longRange.length,10,true); // catapult
      }
      else // LAND BATTLE
      {
        //air - gyroscope
        if (force[312]) place(312,'airfighter',distribution.airfighter.length,30,true);
        //air - bomb
        if (force[309]) place(309,'air',distribution.air.length,15,true);
        //artillery
        // mortar
        if (force[305]) place(305,'artillery',distribution.artillery.length,6,true);
        // cat
        if (force[306]) place(306,'artillery',distribution.artillery.length,6,true);
        // ram
        if (force[307]) place(307,'artillery',distribution.artillery.length,6,true);
        //main
        // hoplite
        if (force[303]) place(303,'main',distribution.main.length,30,true);
        // sg
        if (force[308]) place(308,'main',distribution.main.length,10,true);
        // sword?
        // spearman
        if (force[315]) place(315,'main' ,distribution.main.length,30,false);
        //long range
        // guns
        if (force[304]) place(304,'longRange',distribution.longRange.length, 7,true);
        // archer
        if (force[313]) place(313,'longRange',distribution.longRange.length,30,true);
        // slinger
        if (force[301]) place(301,'longRange',distribution.longRange.length,30,true);
        // fill up flanks
        // sword
        if (force[302]) place(302,'flankLeft' ,distribution.flankLeft.length,30,false);
        if (force[302]) place(302,'flankRight',distribution.flankRight.length,30,true);
        // spearman
        if (force[315]) place(315,'flankLeft' ,distribution.flankLeft.length,30,false);
        if (force[315]) place(315,'flankRight',distribution.flankRight.length,30,true);
        if (distribution.flankLeft.length == 2){
          // rebalance flanks
          var temp = distribution.flankLeft[1];
          distribution.flankLeft[1] = distribution.flankRight[0];
          distribution.flankRight[0] = temp;
        }
        // fill up special
        // cook
        if (force[310]) place(310,'special',distribution.special.length,1e9,false);
        // doctor
        if (force[311]) place(311,'special',distribution.special.length,1e9,false);
      }
      //debug(uneval(distribution),'\nreserve:',uneval(reserve));
    }
    function draw(){
      function distributionToField(distribution){
        function empties(num,total,position){
          var leftFunc = Math.ceil, rightFunc = Math.floor;
          if (position == 'flankRight') { leftFunc = Math.floor; rightFunc = Math.ceil; }
          return Array(leftFunc((total-num)/2)+1).join('<li style="width: 37px"></li>')
            + Array(num+1).join('<li><div class="empty"></div></li>')
            + Array(rightFunc((total-num)/2)+1).join('<li style="width: 37px"></li>');
        }
        var output = [];
        for (var position in distribution){
          output.push('<ul class="'+position+'">'    + empties(distribution[position].length,distributions.large[position].length,position) + '</ul>');
        }
        return output.join('');
      }
      function designate(unit,number){
        if (number) return '<div class="s'+unit+'"></div><div class="number">'+number+'</div>';
        else return '<div class="empty"></div>';
      }
      function reserveAdd(unit,number){
        if (number) return '<div class="s'+unit+'"></div>'+number;
      }
      $X('.//*[@id="fieldAttacker"]',base).innerHTML = distributionToField(distribution);
      for (var position in distribution){
        var slots = $x('.//ul[@class="'+position+'"]/li/div/..',base);
        for (var i = 0; i < distribution[position].length; i++) {
          var slotPosition;
          switch(position){
            case 'flankLeft'  : slotPosition = slots.length - 1 - i; break;
            case 'artillery'  : if (slots.length != 3) { slotPosition = i; } else { slotPosition = (slots.length>>1) + (Math.pow(-1,i+1) * (Math.ceil(i/2))); } break;
            case 'flankRight' :
            case 'special'    : slotPosition = i;  break;
            default           : slotPosition = (slots.length>>1) + (Math.pow(-1,i+1) * (Math.ceil(i/2))); // butterfly positioning
          }
          if (slots[slotPosition]) {
            var temp = distribution[position][i];
            if (temp) slots[slotPosition].innerHTML = designate(temp[0],temp[1]);
            else      slots[slotPosition].innerHTML = designate('',0);
          }
          else debug('missing slot',i,slotPosition,'= ('+slots.length+'>>1) + (Math.pow(-1,'+i+'+1) * (Math.ceil('+i+'/2)))',position);
        }
      }
      // draw reserves
      var resAttacker = $X('.//*[@id="resAttacker"]/div[2]/ul',base);
      removeChildren(resAttacker);
      for each (var unit in reserve){
        var temp = unit;
        resAttacker.appendChild(node('li','','',reserveAdd(unit[0],unit[1])));
      }
    }

    // BEGIN MAIN
    var distributions = {
      large : {
        special   : [0,0],
        airfighter: [0],
        air       : [0],
        flankLeft : [0,0],
        flankRight: [0,0],
        main      : [0,0,0,0,0,0,0],
        longRange : [0,0,0,0,0,0,0],
        artillery : [0,0,0],
      },
      medium : {
        special   : [0,0],
        airfighter: [0],
        air       : [0],
        flankLeft : [0],
        flankRight: [0],
        main      : [0,0,0,0,0],
        longRange : [0,0,0,0,0],
        artillery : [0,0],
      },
      small : {
        special   : [0,0],
        airfighter: [0],
        air       : [0],
        flankLeft : [],
        flankRight: [],
        main      : [0,0,0],
        longRange : [0,0,0],
        artillery : [0],
      },
      sea : {
        //special   : [],
        //airfighter: [0],
        air       : [0],
        //flankLeft : [],
        //flankRight: [],
        main      : [0,0,0,0,0],
        longRange : [0,0,0,0,0],
        //artillery : [],
      },
    }
    var distribution = distributions[field];
    var reserve = [];

    var force = getForce();
    distributeForce();
    draw();
  }

  var inputs = $x('//*[@id="mainview"]/form[1]/div[1]//input[@class="textfield"]');
  for (var i = 0; i<inputs.length; ++i){
    inputs[i].addEventListener("change", main, false); 
    //inputs[i].addEventListener("blur", main, false); 
  }
  $X('//*[@id="mainview"]/form[1]/div[1]//ul[@class="assignUnits"]').addEventListener("click", main, false); 

  var base = $('mainview').appendChild(node('','',{position:'relative',left:'-230px',marginBottom:'16px',width:'909px'},((document.body.id == "blockade") ? sea : land)+'<h3 class="header"></h3>'));
  var ctrl = $X('./h3[1]',base);
  var field = 'large';
  if (document.body.id == "blockade") {
    field = 'sea';
    //todo, use same field for both, just tweak DOM
  } else {
    onClick(ctrl.appendChild(node('span','button','','Küçük')),function(){field = 'small'; main(); });
    onClick(ctrl.appendChild(node('span','button','','Orta')),function(){field = 'medium'; main(); });
    onClick(ctrl.appendChild(node('span','button','','Büyük')),function(){field = 'large'; main(); });
  }
  main();
}





addLoadEvent(init);





GM_addStyle("" + <><![CDATA[

#battlefield {
    width: 909px;
    height: 199px;
}

.battlefield_sea_A_D {
	background-image: url('skin/combatreport/battlefield_sea_A_D.jpg');
}

.battlefield_land_A_D {
	background-image: url('skin/combatreport/battlefield_land_A_D.jpg');
}

.battlefield_city_A_D {
	background-image: url('skin/combatreport/battlefield_city_A_D.jpg');
}

.battlefield_barb_A_D {
	background-image: url('skin/combatreport/battlefield_barb_A_D.jpg');
}


#resAttacker {
    width: 125px;
    height: 183px;
    position: relative;
    top: 5px;
    left: 4px;
    float: left;
}

.nav ul {
    list-style: none;
    padding: 3px 0 0 10px;
    margin: 0;
}

.nav li {
    font-size: 11px;
    font-weight: bold;
    color: #612d04;
    float: left;
}

.nav li.res {
    padding: 0 18px;
}

.nav li a {
    text-decoration: none;
    color: #612d04;
}

.nav li a:hover {
    text-decoration: underline;
}

.units ul  {
    list-style: none;
    padding: 25px 0 0 5px;
    margin: 0;
    margin: 25px 0 0 5px;
    padding: 0;
}
.units ul li {
    padding: 2px;
    text-align: center;
    float: left;
    font-size: 11px;
    color: #612d04;    
}
.units ul li div {
    background-image:url(skin/combatreport/unitsprites.gif);    
    width:36px;
    height:36px;
    background-repeat: no-repeat;
}

.ships ul li div {
    background-image:url(skin/combatreport/unitfleets.gif);    
}

#fieldAttacker {
    width: 765px;
    height: 195px;
    margin: 0 0 0 140px;
}


#fieldAttacker ul {
    position: absolute;
    list-style: none;    
}

#fieldAttacker .flankRight      { margin: 130px 0 0 620px; }
#fieldAttacker .flankLeft       { margin: 130px 0 0 20px; }
#fieldAttacker .special         { margin: 22px 0 0 20px; }
#fieldAttacker .air             { margin: 22px 0 0 670px; }
#fieldAttacker .airfighter      { margin: 22px 0 0 619px; }
#fieldAttacker .artillery       { margin: 22px 0 0 293px;}
#fieldAttacker .longRange       { margin: 77px 0 0 180px;}
#fieldAttacker .main            { margin: 130px 0 0 180px;}

#fieldAttacker li {
    margin: 5px;
    float: left;
}


#fieldAttacker .longRange li, #fieldAttacker .main li, #fieldAttacker .artillery li {
    margin-right: 15px;
}

#fieldAttacker .air li {
    margin: 0px;
}

#fieldAttacker .airfighter li {
    margin: 0px;
}

#fieldAttacker .special li {
    float: left;
    display: block;
}


#fieldAttacker ul div.number {
    position: absolute;
    background-image: none; 
    text-align: center;
    font-size: 10px;
    height: 13px;
    background-color:#f6ebbd;
    border:1pt solid #c39363;
    
    -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
	filter: alpha(opacity=70);
	opacity: .7;	
}



#fieldAttacker ul div.empty {
    background-image: url('skin/combatreport/empty.gif');
    background-repeat: no-repeat;
}

#fieldAttacker ul div {
    background-image: url('skin/combatreport/unitsprites.gif');    
    width: 36px;
    height: 36px;
    background-repeat: no-repeat;
}

#fieldAttacker.seafight div, #fieldDefender.seafight div {
    background-image: url('skin/combatreport/unitfleets.gif');
}


.s301 {}
.s302 {background-position: -36px 0;}
.s303 {background-position: -72px 0;}
.s304 {background-position: -144px 0;}
.s305 {background-position: -396px 0;}
.s306 {background-position: -360px 0;}
.s307 {background-position: -432px 0;}
.s308 {background-position: -252px 0;}
.s309 {background-position: -324px 0;}
.s310 {background-position: -216px 0;}
.s311 {background-position: -180px 0;}
.s312 {background-position: -288px 0;}
.s313 {background-position: -108px 0;}
.s314 {background-position: -468px 0px;} 
.s315 {background-position: -540px 0px;} 
.s316 {background-position: -504px 0px;} 

.s201 {}
.s210 {background-position: -36px 0;}
.s211 {background-position: -108px 0;}
.s212 {background-position: -252px 0;}
.s213 {background-position: -72px 0;}
.s214 {background-position: -144px 0;}
.s215 {background-position: -216px 0;}
.s216 {background-position: -180px 0;}

]]></>);