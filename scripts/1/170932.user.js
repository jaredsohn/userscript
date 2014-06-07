// ==UserScript==
// @name        Spardot Ban Bot Horde
// @namespace   http://boards.420chan.org/*
// @description There's never enough spardot, is there?  Well now there is!
// @include     http://boards.420chan.org/*
// @version     1
// @grant	none
// ==/UserScript==

blockQuotes = document.getElementsByTagName('blockquote');
str = "";
function ban( element, mod, duration, reason ) {
	var banDiv = document.createElement('div');
	banDiv.className = 'ban';

	banDiv.innerHTML = '<div class="banimage"><img src="/static/images/block.png" alt="Banned" /> </div> <div class="banmessages">   <div class="banmsg"> User was banned for this post </div>  <div class="bannedby"> User was banned by: <span style="color: black">' + mod + '</span> for <span style="color: black">' + duration + '</span>  </div> <div class="banreason"> Reason: <span style="color: black">' + reason + '</span> </div> </div>					 </div>  				  ';
	element.appendChild( banDiv );
}

trackNo = null;

// Stolen from stackoverflow
var getCumulativeOffset = function (obj) {
    var left, top, width, height;
    left = top = width = height = 0;
    width = obj.offsetWidth;
    height = obj.offsetHeight;
    if (obj.offsetParent) {
        do {
            left += obj.offsetLeft;
            top  += obj.offsetTop;
	    //alert( obj.offsetTop );
        } while (obj = obj.offsetParent);
    }
    return {
        x1 : left,
        y1 : top,
	w : width,
	h : height,
	x2 : left + width,
	y2 : top + height
    };
};

function SparSpright( x, y, velocity, No ) {
	this.imgRoot = 'http://boards.420chan.org/nc/src';
	this.frames = Array(
			Array(
				'1371325037972.gif',
				'1371325091972.gif'
			     ),
			Array(
				'1371325162972.gif',
				'1371325221972.gif'
			     ),
			Array(
				'1371325269972.gif'
			     ),
			Array(
				'1371325314972.gif'
			     )
			);
	this.element = document.createElement('div');

	this.element.style.position = 'absolute';
	this.element.innerHTML = '<img src="' + this.imgRoot + '/' + this.frames[0][0] + '" />';
	this.element.addEventListener( 'click', this.track, false );
	this.velocity = velocity;
	this.step = 0;
	this.No = No;
	this.messages = Array(
			'FUCK YOU, YOU FUCKING FUCK!!!',
			'GET FUCKED!!!',
			'SORRY, THIS IS NOW A NO RETARD ZONE, GO FUCK YOURSELF!!!',
			'DON\'T YOU HAVE SOME OFFS TO FUCK?',
			'YOU ARE A STUPID, USELESS PIECE OF SHIT, ENJOY YOUR BAN.',
			'DO THE WORLD A FAVOR AND GO BURN TO DEATH.',
			'THERE ARE PIECES OF SHIT AND THEN THERE ARE PIECES OF SHIT AND THEN THERE\'S YOU.',
			'I WOULD SAY THAT YOU ARE DOG SHIT IF YOU WERENN\'T SO USELESS.'
		);
	this.minuteMin = 10000000;
	this.minuteRange = 10000000000;
	this.targetPosition = Array();

	var body = document.getElementsByTagName('body')[0];
	body.appendChild( this.element );

	// Move spardot
	this.setPosition = function( x, y ) {
		// Move
		this.position = Array( x, y );
		this.element.style.top = y + 'px';
		this.element.style.left = x + 'px';
	}
	// Calc step vector, run this every step, it can change if a ban is entered higher up the page
	this.updateVect = function() {
		// Calc y position of target
		coff = getCumulativeOffset( this.target );
		this.targetPosition[1] = Math.round( coff['y1'] + coff['y2'] * 0.5 )/2;

		// Calculate a step displacement vector
		this.vect = Array( this.targetPosition[0] - this.position[0], this.targetPosition[1] - this.position[1] );
		vectCo = Math.sqrt( this.vect[0] * this.vect[0] + this.vect[1] * this.vect[1] );
		this.vect[0] = this.velocity * this.vect[0] / vectCo;
		this.vect[1] = this.velocity * this.vect[1] / vectCo;
	}

	this.scrollTo = function () {
		window.scrollTo( this.position[0], this.position[1] - 100);
	}

	// Select a new target and compute vector
	this.retarget = function() {
		// Select a random target element
		var blockQuotes = document.getElementsByTagName('blockquote');
		this.target = blockQuotes[ Math.round( Math.random() * ( blockQuotes.length - 1 ) ) ];

		// Pick a nice x position in the element to move to
		coff = getCumulativeOffset( this.target );
		//this 200 is bullshit
		this.targetPosition[0] = Math.round( coff['x1'] + Math.random() * 200 ); 
	}

	// For debugging
	this.pointer = function( x, y, w, h )
	{
		var pointer = document.createElement('div');
		pointer.style.position = 'absolute';

		pointer.style.left = x + 'px';
		pointer.style.top = y + 'px';

		pointer.innerHTML = '<img src="' + this.imgRoot + '/' + this.frames[0][0] + '" /><p>' + x + ', ' + y + '</p>';

		var body = document.getElementsByTagName('body')[0];
		body.appendChild( pointer );
	}

	// Move the sparspright to her next location and, if it's time, ban and select the next target
	this.increment = function( incNo ) {
		// Move a step
		var x = this.position[0] + this.vect[0];
		var y = this.position[1] + this.vect[1];

		var xOff = this.targetPosition[0] - this.position[0];
		var yOff = this.targetPosition[1] - this.position[1];

		var dist0 = Math.sqrt( xOff * xOff + yOff * yOff ); 

		this.updateVect();
		this.setPosition( x, y );

		// See how far away we are from target
		var xOff = this.targetPosition[0] - this.position[0];
		var yOff = this.targetPosition[1] - this.position[1];
		var dist1 = Math.sqrt( xOff * xOff + yOff * yOff ); 

		var dir = null;
		if( this.vect[0] > 0 ) {
			dir = 1;
		} else {
			dir = 0;
		}

		// Ban and retarget if in range
		if( dist1 > dist0 ) {
			dir += 2;
			stepFrame = this.step % this.frames[dir].length;
			this.element.innerHTML = '<img src="' + this.imgRoot + '/' + this.frames[dir][stepFrame] + '" />';
			ban( this.target, 'spardot', this.minuteMin + Math.round( this.minuteRange * Math.random() ) + ' minutes', this.messages[ Math.round( ( this.messages.length - 1 ) * Math.random() ) ] );
			this.retarget();
		} else {
			stepFrame = this.step % this.frames[dir].length;
			this.element.innerHTML = '<img src="' + this.imgRoot + '/' + this.frames[dir][stepFrame] + '" />';
			this.step++;
		}
	}

	this.setPosition( x, y );
	this.retarget();
	this.updateVect()
}

// Sparspright base velocity in pixels per step
velocity = 20;
// Number of sparsprights
sparSprightN = 5;
// Delay between steps
delay = 100;
// Set to track a sparspright
trackNo = null;

sparSprights = Array();
for( i=0; i < sparSprightN; i++ ) {
	sparSprights.push( new SparSpright( -100, -100, velocity * ( 1 + Math.random() * 1), i ) );
}

if( sparSprightN > 0 ) {
	setInterval( function() {

			for( i=0; i < sparSprights.length; i++ ) {
				sparSprights[i].increment(i);
				if( trackNo != null ) {
					//alert( trackNo + ', ' + i );
				}
				if( trackNo == i ) {
					sparSprights[i].scrollTo();
				}
			} } ,
			delay
	);
}
