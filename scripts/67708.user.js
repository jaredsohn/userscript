// ==UserScript==
// @name			DeathAdder
// @description		Echo's Holla World
// @include         http://*kingsofchaos.com/*
// @exclude         http://*.kingsofchaos.com/index.php*
// @exclude         http://*.kingsofchaos.com/error.php*	
// ==/UserScript==

(function(){

if(document.URL.match("kingsofchaos.com/base.php")) 
	{
	base();
	}
else if(document.URL.match("kingsofchaos.com/train.php"))
	{
	training();
	}

})();

function base()
{
	var sUsername = FindText(document.title,"Kings of Chaos :: ","'s "); //returns user's name
	alert(sUsername);
}

function training()
{
	alert('You are now on the training page, captain!');
}



// None KoC Functions
function FindText(str, str1, str2)
{
  var pos1 = str.indexOf(str1);
  if (pos1 == -1) return '';
  
  pos1 += str1.length;
  
  var pos2 = str.indexOf(str2, pos1);
  if (pos2 == -1) return '';
  
  return str.substring(pos1, pos2);
}