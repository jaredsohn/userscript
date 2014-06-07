// ==UserScript==
// @name          Maze Defence total health / monsters
// @description	  script that will display the total health of all monsters
// @author        Niels Stoelinga
// @version       0.2
// @homepage      -
// @include       http://apps.new.facebook.com/mazedefense/mymaze.aspx*
// @include       http://apps.facebook.com/mazedefense/mymaze.aspx*
// ==/UserScript==
(function(){

var refRun = run;

if (document.getElementsByClassName == undefined) {
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
	}
}

function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function run() { 
  var elements = [];
  var totalhealth = 0;
  var totalamount = 0;
  var amount = 0;
  var health = 0;

  elements = document.getElementsByClassName('md_monster_array');

  if(elements.length==0) {
    setTimeout(refRun, 5000);
  } else {
    for ( var i=0, len=elements.length; i<len; i++ ){
      var params = elements[i].getElementsByTagName("*");

      amount = parseInt(params[1].innerHTML);
      health = parseInt(params[5].innerHTML);

      totalhealth += amount * health;
      totalamount += amount;
    }

    var healthtarget = document.getElementById('littleBIT-mdth');
    var amounttarget = document.getElementById('littleBIT-mdta');

    if(!healthtarget && !amounttarget) {
      var input = '<tr><th class="detached_label"><label>Reward type:';
    var output = '<tr><th class="detached_label"><label>Total monsters:</label></th><td><div id="littleBIT-mdta"></div></td><td class="right_padding"></td></tr><tr><th class="detached_label"><label>Total health:</label></th><td><div id="littleBIT-mdth"></div></td><td class="right_padding"></td></tr><tr><th class="detached_label"><label>Reward type:';
    document.body.innerHTML = document.body.innerHTML.replace(input,output);
    } else {
      healthtarget.innerHTML = '<img src="http://74.63.90.194/Images/heart.png" alt="Hit points"> ' + addCommas(totalhealth);
      amounttarget.innerHTML = '<img src="http://74.63.90.194/Images/Monsters/monster11.png" alt="Monster"> ' + addCommas(totalamount);
    }

    setTimeout(refRun, 5000);
  }
}

window.setTimeout(refRun, 2000);

})();