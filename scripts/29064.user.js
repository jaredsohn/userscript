// ==UserScript==
// @name           RPSLS-II
// @namespace      http://localhost
// @author         dEfEndEr
// @version        1.0.0
// @description    FACEBOOK Hobowars RPSLS-II
// @include        http://www.hobowars.com/fb/*
// ==/UserScript==
// Based on RPSLScript 1.0.2 by Xyan Flux



var auto=0;      //auto click 0=disabled,1=enabled
var dispInfo=0;  //display extended info 0=disabled,1=enabled


/* You can decode the color (gameID) by using java.awt.Robot or equivalent. 
Color c = robot.getPixelColor(x,y);
int gameID = c.getRGB()&16777215;
if(gameID==16711680){//FF0000
	isMainPage=true;
}else if(gameID==15597568){//EE0000
	isNoCash=true;
}else if(gameID==14483456){//DD0000
	isNoAwake=true;
}else{
	hint = gameID%7; gameID/=7;
	yourMove = gameID%6; gameID/=6;
	johnsonMove = gameID%7; gameID/=7;
	bet = gameID*50;
}
*/


var menu, contents;

menu = document.getElementById('menu');
contents = document.getElementById('contents');

if(contents){
	if(contents.textContent.match('City Hall.*')){

		var page=0;        //0=NaN,1=Play RPSLS,2=Main City Hall,3=No Cash,4=No Awake
		var hint=0;        //0=NaN,1=Tongue,2=Ground,3=Thumb,4=Ears,5=Eyes,6=Nothing
		var yourMove=0;    //0=NaN,1=Rock,2=Paper,3=Scissors,4=Lizard,5=Spock
		var johnsonMove=0; //0=NaN,1=Rock,2=Paper,3=Scissors,4=Lizard,5=Spock,6=Goatse
		var bet='0';       // =dollars
		var betint=0;      // =bet/50
		var color='000000';
		var colorint=0;

		var link, linkText,additionalText;
		var allLinks, thisLink;
		allLinks = document.evaluate('//a[@href]',document,null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < allLinks.snapshotLength; i++) {
			thisLink = allLinks.snapshotItem(i);
			if(thisLink.textContent=='Play Rock Paper Scissors Lizard Spock'){
				link =thisLink.href;
				linkText='Continue';
				page=2;
				break;
			}else if(thisLink.textContent=='Forget this'){
				link =thisLink.href;
				linkText='Skip';
				page=1;
				break;
			}
		}

		var text= contents.textContent;
		if (menu&&link&&text)
    {
			
			if(text.indexOf('gonna need')+1){
				linkText='Continue';
				page=3;
			}else if(text.indexOf('too tired')+1){
				linkText='Continue';
				page=4;
			}
      if(page==1)
      {
        if(text.indexOf('tongue')+1){
          link+='&action=rpsls&move=scissors';
          linkText='Scissors 2'
          hint=1;
        }else if(text.indexOf('ground')+1){
          link+='&action=rpsls&move=paper';
          linkText='Paper 2'
          hint=2;
        }else if(text.indexOf('thumb')+1){
          link+='&action=rpsls&move=scissors';
          linkText='Scissors 2'
          hint=3;
        }else if(text.indexOf('ear wiggles')+1){
          link+='&action=rpsls&move=lizard';
          linkText='lizard 2'
          hint=4;
        }else if(text.indexOf('his eyes')+1){
          link+='&action=rpsls&move=rock';
          linkText='Rock 2'
          hint=5;
        }else {
          link+='&action=rpsls';
          hint=6;
        } 

				var firstDollar = text.indexOf('$');
				var secondDollar = text.indexOf('$',firstDollar+1);
				secondDollar = secondDollar<0?firstDollar:secondDollar
				var space = text.indexOf(' ',secondDollar);
				text = text.substring(0, space);
				bet = text.substring(secondDollar+1,space);

				if(text.indexOf('!')+1){
					if(text.indexOf('soul')+1){
						johnsonMove=6;
						yourMove=0;
					}else if(text.indexOf('rock')+1){
						johnsonMove=1;
						yourMove=1;
					}else if(text.indexOf('paper')+1){
						johnsonMove=2;
						yourMove=2;
					}else if(text.indexOf('scissors')+1){
						johnsonMove=3;
						yourMove=3;
					}else if(text.indexOf('lizard')+1){
						johnsonMove=4;
						yourMove=4;
					}else if(text.indexOf('spock')+1){
						johnsonMove=5;
						yourMove=5;
					}else if(text.indexOf('crushes Scissors')+1){
						johnsonMove=1;
						yourMove=3;
					}else if(text.indexOf('crushes Lizard')+1){
						johnsonMove=1;
						yourMove=4;
					}else if(text.indexOf('covers')+1){
						johnsonMove=2;
						yourMove=1;
					}else if(text.indexOf('disproves')+1){
						johnsonMove=2;
						yourMove=5;
					}else if(text.indexOf('cut')+1){
						johnsonMove=3;
						yourMove=2;
					}else if(text.indexOf('decapitate')+1){
						johnsonMove=3;
						yourMove=4;
					}else if(text.indexOf('eats')+1){
						johnsonMove=4;
						yourMove=2;
					}else if(text.indexOf('poisons')+1){
						johnsonMove=4;
						yourMove=5;
					}else if(text.indexOf('vaporizes')+1){
						johnsonMove=5;
						yourMove=1;
					}else if(text.indexOf('Spock smashes')+1){
						johnsonMove=5;
						yourMove=3;
					}
					if(text.match('.win!.*')){
						var temp=johnsonMove;
						johnsonMove=yourMove;
						yourMove=temp;
					}
				}else{
					johnsonMove=0;
					yourMove=0;
				}

				betint =parseInt(bet)/50;
				colorint= hint + yourMove*7 + johnsonMove*42 + betint*294;

				color='';
				var temp=colorint;
				var digit=0;
				for(var i=0;i<6;++i){
					digit=temp%16;
					if(digit<10){
						color=String.fromCharCode(digit+48)+color;
					}else{
						color=String.fromCharCode(digit+55)+color;
					}
					temp/=16;
				}

				//extended - additionalText ='   hint:'+hint+', yourMove:'+yourMove+', johnsonMove:'+johnsonMove+', bet:'+bet+', betint:'+betint +'color:'+color+', colorint:'+colorint;
				additionalText ='   hint:'+hint+', yourMove:'+yourMove+', johnsonMove:'+johnsonMove+', bet:'+betint +', gameID:'+color;


				if(auto){
					location.href = link;
				}
			}else if(page==2){
				color='FF0000';
				additionalText='';
				if(auto){
					location.href = link;
				}
			}else if(page==3){
				color='EE0000';
				additionalText='   No Cash';
			}else if(page==4){
				color='DD0000';
				additionalText='   No Awake';
			}

			var newElement = document.createElement("div");
			newElement.innerHTML='<div style="color: #'+color+';">\u2022<a href=' + link + '>' + linkText + '</a>' + (dispInfo?additionalText:'') +'</div>';

			menu.parentNode.insertBefore(newElement, menu.nextSibling);

		}
	}
}
