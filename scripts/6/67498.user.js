// ==UserScript==
// @name			Farmville / Mouse Recorder Pro Helper Script
// @namespace		Farmville
// @description		Script that creates a script for use by Mouse Recorder Pro for auto harvesting.
// @include			http://www.this-page-intentionally-left-blank.org/blankpage.html
// @version			1.0.1
// ==/UserScript==

// These are the values that you need to get from your 2 screenshots.
var zoomX = prompt('Enter the X coordinate of the zoom out button:');
var zoomY = prompt('Enter the Y coordinate of the zoom out button:');
var fullscreenX = prompt('Enter the X coordinate of the fullscreen button:');
var fullscreenY = prompt('Enter the Y coordinate of the fullscreen button:');
var startX = prompt('Enter the X coordinate of the middle of your bottom plot:');
var startY = prompt('Enter the Y coordinate of the middle of your bottom plot:');
var farmsize = prompt('How big is your farm (for instance, for a 20x20 farm enter 20):');

// Convert all of the prompted values to Integers.
zoomX = parseInt(zoomX);
zoomY = parseInt(zoomY);
fullscreenX = parseInt(fullscreenX);
fullscreenY = parseInt(fullscreenY);
startX = parseInt(startX);
startY = parseInt(startY);
farmsize = parseInt(farmsize);

// This is the change in X and Y for moving up a plot in a column.
// The values of 25 and 12 work for 1280 x 986 resolution.
// Will check for additional resolutions later. 
var deltaX = 25;
var deltaY = 12;

// This creates the start of the script.  Zooms all the way out, then clicks on full screen.
// Total time for script action = 10 seconds.
var msg = 
	'DELETE THIS ENTIRE LINE\n'+ // Necessary for final saving in the editor.
	'Delay (by milliseconds)|2900\n'+ // Initial 2.9 second delay so you can let go of the mouse =]
	'Mouse Position|X:' + zoomX + ' Y:' + zoomY + '\n' + // Move the mouse to the zoom button.
	'Delay (by milliseconds)|50\n'+ // Standard wait time inbetween moves and clicks.
	'Mouse Event|Left Down\n'+ // Mouse Down and Mouse Up constitute a single click.
	'Mouse Event|Left Up\n'+
	'Delay (by milliseconds)|1000\n'+ // Wait one second after zoom clicks.
	'Mouse Event|Left Down\n'+ 
	'Mouse Event|Left Up\n'+
	'Delay (by milliseconds)|1000\n'+ // Repeat twice more to be sure we are at maximum zoom.
	'Mouse Event|Left Down\n'+ 
	'Mouse Event|Left Up\n'+
	'Delay (by milliseconds)|1000\n'+ 
	'Mouse Position|X:' + fullscreenX + ' Y:' + fullscreenY + '\n' + // Move the mouse to the full screen button.
	'Delay (by milliseconds)|50\n'+
	'Mouse Event|Left Down\n'+ 
	'Mouse Event|Left Up\n'+
	'Delay (by milliseconds)|4000\n'; // Wait 4 seconds to allow for the screen to go full screen.

// Total plot count and skippedplot are for deciding which plot holds your boxed in farmer.
var totalplot = 0;
var skippedplot = (farmsize * farmsize / 2) + (farmsize / 2) + 1;

// This is what creates most of the script.
for ( var  col = 0; col < farmsize; col++ ){
	for ( var  row = 0; row < farmsize; row++ ){
		totalplot++;
		if ( skippedplot != totalplot ) {
			var x = startX - (deltaX * row) + (deltaX * col);
			var y = startY - (deltaY * row) - (deltaY * col);
			var msg = msg + 
				'Mouse Position|X:' + x + ' Y:' + y + '\n' + 
				'Delay (by milliseconds)|50\n' + 
				'Mouse Event|Left Down\n' + 
				'Mouse Event|Left Up\n' ;
		}
	}
}

// This is the end of the script.
// 20 second delay is to give time for the clicks to catch up if your computer is slow.
// F12 key press ends the script.  You can always manually hit the F12 key to stop the script if you want to.
msg = msg + 'Delay (by milliseconds)|1000\n';
msg = msg + 'Key Press|{F12}\n';


GM_log(msg);