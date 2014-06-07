// ==UserScript==
// @name           A personal appeal from ponies
// @description    Wikipedia is magic
// @include        http://*wikipedia.org/*
// @version			1.2
// ==/UserScript==

var flgOverRidden = false;
var omsg;
var msgp;

var ponies = new Array(pinkie, twilight, fluttershy, rainbow, rarity, apple, derpy, bloom, scoot, sweetie);

var image = "";
var size;
var line1 = "";
var line2 = "";
var line3 = "";

var randomNum;



function pinkie(){    
    image = "http://images2.wikia.nocookie.net/__cb20110718163326/mlp/images/8/8a/Pinkie_Pie_11.png";
    
    line1 = 'A personal appeal from';
	line2 = 'an author of 549 Wikiquestria articles';
	line3 = '(about cupcakes)';
}

function twilight(){    
    image = "http://images.wikia.com/mylittleponyfriendshipismagic/bs/images/6/6d/My_little_pony_friendship_is_magic_twilight_sparkle.jpeg";
  
    line1 = 'A personal appeal from';
	line2 = 'Wikiquestria founder';
	line3 = 'Twilight Sparkle';
}

function fluttershy(){    
    image = "http://powet.tv/powetblog/wp-content/uploads/2011/02/my_little_pony_friendship_is_magic_fluttershy.jpeg";
    line1 = 'A personal appeal from';
	line2 = 'Fluttershy';
	line3 = 'If you maybe have time...';
}

function rainbow(){    
    image = "http://images.wikia.com/vssaxtonhale/images/6/6a/Rainbow_dash_evil_looking.png";
    line1 = 'It would be totally awesome';
	line2 = 'if you checked out this';
	line3 = 'personal appeal from Rainbow Dash';
}

function rarity(){    
    image = "http://i.imgur.com/8UudE.png";
    line1 = 'A personal appeal';
	line2 = 'from Rarity?';
	line3 = 'How utterly divine!';
}

function apple(){    
    image = "http://files.sharenator.com/My_Little_Pony_Friendship_is_Magic_1x04_Applebuck_Season_webrip_mentos_n1294804364351_bronies-s640x360-152678-580.jpg";
    line1 = 'Y\'all should';
	line2 = 'read this here appeal.';
	line3 = 'Wikiquestria don\'t grow on trees, y\'know';
}

function derpy(){    
    image = "http://www.dragoart.com/tuts/pics/5/9636/how-to-draw-derpy-hooves,-derpy-hooves,-my-little-pony-tutorial-drawing.jpg";
    line1 = 'Yes, I would like';
	line2 = 'a bacon cheeseburger';
	line3 = 'to go, please';
}

function bloom(){    
    image = "http://images2.wikia.nocookie.net/__cb20110930221816/mlp/images/thumb/4/42/Apple_Bloom_Runs_In_The_Family_S1_E12.jpg/616px-Apple_Bloom_Runs_In_The_Family_S1_E12.jpg";
    line1 = 'We can be';
	line2 = 'the Cutie Mark Crusader';
	line3 = 'Wiki Appealers!';
}

function scoot(){    
    image = "http://images1.wikia.nocookie.net/__cb20110824003158/mlp/images/thumb/9/90/Scootaloo_thinking-W_1.3691.png/573px-Scootaloo_thinking-W_1.3691.png";
    line1 = 'Coming up with appeals';
	line2 = 'is really really';
	line3 = 'really hard';
}

function sweetie(){    
    image = "http://images1.wikia.nocookie.net/__cb20110805172058/mlp/images/thumb/6/60/Sweetie_Belle_%28green_background.%29.png/564px-Sweetie_Belle_%28green_background.%29.png";
    line1 = 'Hey, can';
	line2 = 'I help with the';
	line3 = 'appeals too?';
}

function loaded(){
if(flgOverRidden === true){
    return;
}
//what was that wizardry. Thanks hiles!

 randomNum = Math.floor((Math.random() * ponies.length));
	(ponies[randomNum])();
	
  if(document.getElementById('cn-bold-blue-text') != null) {
    if(document.getElementById('text-line-2') != null) {
      document.getElementById('text-line-1').firstChild.nodeValue="";
      document.getElementById('text-line-2').firstChild.nodeValue="";
    } else {
       omsg = document.getElementById('cn-bold-blue-text');
       msgp = omsg.parentNode;
       flgOverRidden = true;
      
      var randomNum = Math.floor((Math.random() * ponies.length));
	(ponies[randomNum])();
	
     
     document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundImage = "url(" + image + ")";
      document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundSize = "310px";
      var rmsg = document.createElement('div');
rmsg.setAttribute('id', 'cn-bold-blue-text');
rmsg.setAttribute('style', 'float:none;padding-left:325px;padding-top:40px');

rmsg.appendChild(document.createTextNode(line1));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode(line2));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode(line3));

      
   msgp.replaceChild(rmsg, omsg);
    }
    

  }
randomnum = 0;}

(function(){document.addEventListener("DOMNodeInserted", loaded, false);})();