// ==UserScript==
// @name          TwitchFaces
// @version       0.5
// @description   Add menu for Twitch.tv emoticons
// @author        Jens Reineke and Kyle Paulsen (since version 0.4)
// @include       http://twitch.tv/*
// @include       http://*.twitch.tv/*
// @grant         none
// ==/UserScript==

(function() {
  var newStyles = document.createElement('style');
  newStyles.type = 'text/css';

  var styles = '#control_input { margin-right:60px !important;}';
  styles += '#chat_faces_dropmenu_button { margin-left:5px !important; float: right;}';
  styles += '#chat_viewers_dropmenu_button { float: right; }';
  styles += '#chat_settings_dropmenu_button { float: right; }';
  styles += '#control_buttons { width:auto !important;}';
  styles += '.chat_face img { width:25px; padding:5px; margin-bottom:5px;}';
  styles += '.chat_face img:last-child { margin-bottom:0px;}';
  styles += '#chat_faces_dropmenu { width: 200px; height:288px; overflow:auto; padding-left:10px; }';
  styles += '#chat_faces_dropmenu a { outline:none; }';

  newStyles.appendChild(document.createTextNode(styles));
  document.head.appendChild(newStyles);

  // Hide menu on click anywhere in DOC
  document.addEventListener('click', function(){
    document.getElementById('chat_faces_dropmenu').style.display = 'none';
  }, false);
  
  function isReady() {
    var buttons = document.getElementById('control_buttons');
    if(buttons) {
      init();
    } else {
      setTimeout(isReady, 500);
    }
  }

  function init() {
    // Add new button
    var btn = document.createElement('a');
    btn.id = 'chat_faces_dropmenu_button';
    btn.className = 'button btn_empty round';
    btn.href = '#';

    //make the button open the face icon div
    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      var dropmenu = document.getElementById('chat_faces_dropmenu');
      if (dropmenu.style.display === 'none') {
        var pos = findPos(e.target);
        dropmenu.style.position = 'absolute';
        dropmenu.style.display = 'block';
        dropmenu.style.top = (pos.top-315)+'px';
        dropmenu.style.left = (pos.left-188)+'px';
      } else {
        dropmenu.style.display = 'none';
      }
    }, false);

    //make sure face icon div stays in the right place.
    window.addEventListener('resize', function(){
      var pos = findPos(document.getElementById('chat_faces_dropmenu_button'));
      var dropmenu = document.getElementById('chat_faces_dropmenu');
      dropmenu.style.position = 'absolute';
      dropmenu.style.display = 'block';
      dropmenu.style.top = (pos.top-315)+'px';
      dropmenu.style.left = (pos.left-188)+'px';
    }, false);

    var btn_span = document.createElement('span');
    btn_span.className = 'glyph_only';

    var btn_img = document.createElement('img');
    btn_img.style.width = '15px';
    btn_img.style.paddingTop = '2px';
    btn_img.src = '../images/xarth/e/robot_2/excited.png';
    
    btn_span.appendChild(btn_img);
    btn.appendChild(btn_span);

    //move buttons around
    var control_div = document.getElementById('controls');
    control_div.appendChild(btn);
    control_div.appendChild(document.getElementById('chat_settings_dropmenu_button'));
    control_div.appendChild(document.getElementById('chat_viewers_dropmenu_button'));
    
    //push other content down
    var clearfix_div = document.createElement('div');
    clearfix_div.className = 'clearfix';
    document.getElementById('speak').appendChild(clearfix_div);
    
    
    //var control_btns = document.getElementById('control_buttons');
    //control_btns.insertBefore(btn, control_btns.firstChild);

    var images_url_base = 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-';

    var icons = [];
    icons.push({text:'4Head', img:'76292ac622b0fc38-20x30.png'});
    icons.push({text:'SoonerLater', img:'696192d9891880af-23x30.png'});
    icons.push({text:'OpieOP', img:'21e708123d6a896d-21x30.png'});
    icons.push({text:'HotPokket', img:'55873089390f4a10-28x30.png'});
    icons.push({text:'Poooound', img:'61a08075ecef6afa-21x30.png'});
    icons.push({text:'TooSpicy', img:'f193772ca6e512f2-23x30.png'});
    icons.push({text:'FailFish', img:'c8a77ec0c49976d3-22x30.png'});
    icons.push({text:'RuleFive', img:'4e65703c52fb67b5-20x30.png'});
    icons.push({text:'Volcania', img:'efbcc231b2d2d206-27x28.png'});
    icons.push({text:'WinWaker', img:'d4e971f7a6830e95-30x30.png'});
    icons.push({text:'Kappa', img:'ddc6e3a8732cb50f-25x28.png'});
    icons.push({text:'Kreygasm', img:'3a624954918104fe-19x27.png'});
    icons.push({text:'BionicBunion', img:'740242272832a108-30x30.png'});
    icons.push({text:'FrankerZ', img:'3b96527b46b1c941-40x30.png'});
    icons.push({text:'DansGame', img:'ce52b18fccf73b29-25x32.png'});
    icons.push({text:'SwiftRage', img:'680b6b3887ef0d17-21x28.png'});
    icons.push({text:'BrainSlug', img:'39f055e707725b5d-18x27.png'});
    icons.push({text:'PogChamp', img:'60aa1af305e32d49-23x30.png'});
    icons.push({text:'BibleThump', img:'f6c13c7fc0a5c93d-36x30.png'});
    icons.push({text:'BloodTrail', img:'f124d3a96eff228a-41x28.png'});
    icons.push({text:'EvilFetus', img:'484439fc20e0d36d-29x30.png'});
    icons.push({text:'PJSalt', img:'18be1a297459453f-36x30.png'});
    icons.push({text:'BCWarrior', img:'1e3ccd969459f889-29x27.png'});
    icons.push({text:'SSSsss', img:'5d019b356bd38360-24x24.png'});
    icons.push({text:'PunchTrees', img:'b85003ffba04e03e-24x24.png'});
    icons.push({text:'ItsBoshyTime', img:'e8e0b0c4e70c4fb8-18x18.png'});
    icons.push({text:'ResidentSleeper', img:'1ddcc54d77fc4a61-28x28.png'});
    icons.push({text:'MrDestructoid', img:'ac61a7aeb52a49d3-39x27.png'});
    icons.push({text:'FuzzyOtterOO', img:'d141fc57f627432f-26x26.png'});
    icons.push({text:'SMOrc', img:'9f276ed33053ec70-32x32.png'});
    icons.push({text:'MVGame', img:'1a1a8bb5cdf6efb9-24x32.png'});
    icons.push({text:'DatSheffy', img:'bf13a0595ecf649c-24x30.png'});
    icons.push({text:'JKanStyle', img:'3a7ee1bc0e5c9af0-21x27.png'});
    icons.push({text:'OptimizePrime', img:'41f8a86c4b15b5d8-22x27.png'});
    icons.push({text:'StoneLightning', img:'8b5aaae6e2409deb-20x27.png'});
    icons.push({text:'TheRinger', img:'1903cc415afc404c-20x27.png'});
    icons.push({text:'PazPazowitz', img:'521420789e1e93ef-18x27.png'});
    icons.push({text:'TriHard', img:'6407e6947eb69e21-24x30.png'});
    icons.push({text:'EagleEye', img:'95eb8045e7ae63b8-18x27.png'});
    icons.push({text:'CougarHunt', img:'551cd64fc3d4590a-21x27.png'});
    icons.push({text:'RedCoat', img:'6b8d1be08f244e92-19x27.png'});
    icons.push({text:'BrokeBack', img:'35ae4e0e8dd045e1-22x27.png'});
    icons.push({text:'JonCarnage', img:'6aaca644ea5374c6-20x27.png'});
    icons.push({text:'PicoMause', img:'ce027387c35fb601-22x27.png'});
    icons.push({text:'SuperVinlin', img:'92a1b848540e9347-23x27.png'});
    icons.push({text:'StrawBeary', img:'3dac9659e838fab2-20x27.png'});
    icons.push({text:'BlargNaut', img:'a5293e92212cadd9-21x27.png'});
    icons.push({text:'FreakinStinkin', img:'d14278fea8fad146-19x27.png'});
    icons.push({text:'KevinTurtle', img:'d530ef454aa17093-21x27.png'});
    icons.push({text:'FPSMarksman', img:'6c26a3f04616c4bf-20x27.png'});
    icons.push({text:'SoBayed', img:'58f4782b85d0069f-17x27.png'});
    icons.push({text:'NoNoSpot', img:'179f310b0746584d-23x27.png'});
    icons.push({text:'NinjaTroll', img:'89e474822a976928-19x27.png'});
    icons.push({text:'TehFunrun', img:'a204e65775b969c5-27x27.png'});
    icons.push({text:'UleetBackup', img:'5342e829290d1af0-17x27.png'});
    icons.push({text:'ArsonNoSexy', img:'e13a8382e40b19c7-18x27.png'});
    icons.push({text:'SMSkull', img:'50b9867ba05d1ecc-24x24.png'});
    icons.push({text:'GingerPower', img:'2febb829eae08b0a-21x27.png'});
    icons.push({text:'OneHand', img:'b6d67569a0c6340a-20x27.png'});
    icons.push({text:'TinyFace', img:'b93007bc230754e1-19x30.png'});
    icons.push({text:'HassanChop', img:'22c6299e539344a9-19x28.png'});
    icons.push({text:'TheTarFu', img:'1fcfa48228bbd6ea-25x28.png'});
    icons.push({text:'UnSane', img:'4eea6f01e372a996-28x30.png'});
    icons.push({text:'DBstyle', img:'1752876c0d0ec35f-21x30.png'});
    icons.push({text:'AsianGlow', img:'a3708d1e15c3f197-24x30.png'});
    icons.push({text:'ShazBotstix', img:'ccaf06d02a01a804-24x30.png'});
    icons.push({text:'Jebaited', img:'39dff1bb9b42cf38-21x30.png'});
    icons.push({text:'OMGScoots', img:'e01723a9ae4fbd8b-22x28.png'});
    icons.push({text:'PMSTwin', img:'a33f6c484c27e249-23x30.png'});
    icons.push({text:'BORT', img:'6f9fa95e9e3d6a69-19x30.png'});
    icons.push({text:'FUNgineer', img:'731296fdc2d37bea-24x30.png'});
    icons.push({text:':)', img:'13d54d9e49b593b3-24x18.png'});
    icons.push({text:':(', img:'2d2d0e6fdbc0b733-24x18.png'});
    icons.push({text:':o', img:'a8c70d142cf64819-24x18.png'});
    icons.push({text:':Z', img:'939757d7759f071f-24x18.png'});
    icons.push({text:'B)', img:'e073a3348e028b40-24x18.png'});
    icons.push({text:':/', img:'4853fe4f9829494b-24x18.png'});
    icons.push({text:';)', img:'aa3dd5587f06bb7b-24x18.png'});
    icons.push({text:';p', img:'912125d7459226cc-24x18.png'});
    icons.push({text:':p', img:'1a3f5d14a3190ef1-24x18.png'});
    icons.push({text:'R)', img:'c2b7132654a19e02-24x18.png'});
    icons.push({text:'<3', img:'67cde8d0b7916e57-24x18.png'});

    var numIcons = icons.length;
    
    var menu_div = document.createElement('div');
    menu_div.style.display = 'none';
    menu_div.style.zIndex = '10';
    menu_div.id = 'chat_faces_dropmenu';
    menu_div.className = 'dropmenu menu-like';

    clearfix_div = document.createElement('div');
    clearfix_div.className = 'clearfix';

    var chat_box = document.getElementById('chat_text_input');

    function clickFace(e){
      e.preventDefault();
      var ele = e.target;
      var text = ele.getAttribute('data-text');
      if (chat_box.value[chat_box.value.length-1] !== ' ') {
        chat_box.value += ' ';
      }
      chat_box.value += text+' ';
      chat_box.focus();
      chat_box.setSelectionRange(9999, 9999);
    }

    function findPos(obj) {
      var curleft = curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while(obj = obj.offsetParent);
      }
      
      return {'left': curleft, 'top': curtop};
    }

    for (var x=0; x<numIcons; ++x) {
      var newFace = document.createElement('a');
      newFace.href = '#';
      newFace.className = 'chat_face';

      var newFaceImg = document.createElement('img');
      var image_url = images_url_base;
      image_url += (icons[x].img ? icons[x].img : (icons[x].text+'.png'));
      newFaceImg.src = image_url;
      newFaceImg.setAttribute('data-text', icons[x].text);

      newFace.appendChild(newFaceImg);
      newFaceImg.addEventListener('click', clickFace, false);
      clearfix_div.appendChild(newFace);
    }

    menu_div.appendChild(clearfix_div);
    document.body.appendChild(menu_div);
  }

  isReady();
})();