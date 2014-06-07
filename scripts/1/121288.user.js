// ==UserScript==
// @name           replace javascript function to enable play sound on chrome for english 8 octopus
// @namespace      System
// @author			chris chan
// @description    Original script by Bruno Leonardo Michels, u
// @include        *
// ==/UserScript==

//Audio player configuration
audioWidth = "320";
audioHeight = "35";
var audioOptions = [
	"autoplay",
	"controls"
];

function injectPlayer(elem, src, width, height, options) {
	var embed = "<video src='" + src + "' width=" + width + " height=" + height + " ";
	for(var i=0; i<options.length; i++)
	{
		embed += options[i] + " ";
	}
	embed += " />";
	elem.style.width = width;
	elem.style.height = height;
	elem.innerHTML = embed;
}

function LoadScript()
{
	var scriptCode = new Array();   // this is where we are going to build our new script
    
    // here's the build of the new script, one line at a time
    scriptCode.push('function playsnd(snd){'        );
    //scriptCode.push('  now=new Date;'                   );
    //scriptCode.push('  var currenttime = now.getTime();');
    //scriptCode.push('  alert("The time is: " + now );'  );
    scriptCode.push('  new Audio(snd).play(); '  );
    //scriptCode.push('  injectPlayer(snd);'  );
    scriptCode.push('}'                                 );
    
    // now, we put the script in a new script element in the DOM
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script

	document.getElementsByTagName('head')[0].appendChild(script);
    
};


	LoadScript();