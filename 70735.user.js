// ==UserScript==
// @name           Gorillaz Bucket Lift
// @namespace      Gorillaz Bucket Lift
// @description    Gorillaz Bucket Lift Script
// @include        http://gorillaz.com/feature/lift
// ==/UserScript==

var output = document.createElement('div');
output.innerHTML = ('<div style="position:fixed; bottom: 0px; right: 0px; background-color: red; font-size: 30px; padding: 10px; -moz-border-radius-topleft: 10px;"><div><button id="toggle">Start</button></div><div>Buckets bailed: <span id="myBuckets"></span></div><div>Buckets left: <span id="bucketsLeft"></span></div><div>Contribution: <span id="myContribution"></span></div></div>');
document.body.appendChild(output); 

var toggleButton = document.getElementById('toggle');
toggleButton.addEventListener('click',function()
{
	if( isRunning )
	{
		isRunning = false;
		toggleButton.innerHTML = 'Start';
	}
	else
	{
		isRunning=true; 
		toggleButton.innerHTML = 'Pause';
		step1(); 
	}
},true);

var isRunning = false;

if( typeof(GM_getValue('gorillazLiftCount'))=='undefined' )
	GM_setValue('gorillazLiftCount',0);

step1();

var display = 
{
	bucketsLeft : document.getElementById('bucketsLeft'),
	myBuckets : document.getElementById('myBuckets'),
	myContribution : document.getElementById('myContribution'),
	
	update : function ( response )
	{
		var bytes = [ response.responseText.charCodeAt(127) & 0xff, response.responseText.charCodeAt(128) & 0xff, response.responseText.charCodeAt(129) & 0xff ];
		var intval = (bytes[0]<<16) + (bytes[1]<<8) + (bytes[2]);
		var bucketsLeft = 9524288 - (intval/2);
		
		this.myBuckets.innerHTML = GM_getValue('gorillazLiftCount');
		this.bucketsLeft.innerHTML = bucketsLeft;
		this.myContribution.innerHTML = ((GM_getValue('gorillazLiftCount')/(9000000-bucketsLeft))*100).toFixed(4)+'%';
	}
};

function step1()
{
	GM_xmlhttpRequest(
	{
		method : "POST",
		url : 'http://gorillaz.com/amfphp/gateway.php',
		overrideMimeType : 'text/plain; charset=x-user-defined',
		data : '\x00\x03\x00\x00\x00\x01\x00\x21\x67\x6f\x72\x69\x6c\x6c\x61\x7a\x2e\x67\x65\x74\x58\x6d\x6c\x2e\x67\x65\x74\x4d\x75\x6c\x74\x69\x55\x73\x65\x72\x43\x6f\x75\x6e\x74\x00\x02\x2f\x31\x00\x00\x00\x1d\x0a\x00\x00\x00\x01\x02\x00\x15\x66\x6c\x6f\x6f\x64\x65\x64\x2d\x6c\x69\x66\x74\x2d\x62\x61\x69\x6c\x6f\x75\x74\x73',
		binary : true,
		headers : 
		{
			'Content-Type' : 'application/x-amf',
			'Referer' : 'http://gorillaz.com/swf/plasticbeach/rooms/lift.swf'
		},
		onload : function(response)
		{
			display.update( response );
			if( isRunning )
				step2();
		}
	});
}


function step2()
{
	GM_xmlhttpRequest(
	{
		method : "POST",
		url : 'http://gorillaz.com/amfphp/gateway.php',
		overrideMimeType : 'text/plain; charset=x-user-defined',
		data : '\x00\x03\x00\x00\x00\x01\x00\x24\x67\x6f\x72\x69\x6c\x6c\x61\x7a\x2e\x75\x70\x64\x61\x74\x65\x2e\x75\x70\x64\x61\x74\x65\x4d\x75\x6c\x74\x69\x55\x73\x65\x72\x43\x6f\x75\x6e\x74\x00\x02\x2f\x32\x00\x00\x00\x1d\x0a\x00\x00\x00\x01\x02\x00\x15\x66\x6c\x6f\x6f\x64\x65\x64\x2d\x6c\x69\x66\x74\x2d\x62\x61\x69\x6c\x6f\x75\x74\x73',
		binary : true,
		headers : 
		{
			'Content-Type' : 'application/x-amf',
			'Referer' : 'http://gorillaz.com/swf/plasticbeach/rooms/lift.swf'
		},
		onload : function(response)
		{
			display.update( response );
			if( isRunning )
				step3();
		}
	});
}

function step3()
{
	GM_xmlhttpRequest(
	{
		method : "POST",
		url : 'http://gorillaz.com/amfphp/gateway.php',
		overrideMimeType : 'text/plain; charset=x-user-defined',
		data : '\x00\x03\x00\x00\x00\x01\x00\x21\x67\x6f\x72\x69\x6c\x6c\x61\x7a\x2e\x67\x65\x74\x58\x6d\x6c\x2e\x67\x65\x74\x4d\x75\x6c\x74\x69\x55\x73\x65\x72\x43\x6f\x75\x6e\x74\x00\x02\x2f\x33\x00\x00\x00\x1d\x0a\x00\x00\x00\x01\x02\x00\x15\x66\x6c\x6f\x6f\x64\x65\x64\x2d\x6c\x69\x66\x74\x2d\x62\x61\x69\x6c\x6f\x75\x74\x73',
		binary : true,
		headers : 
		{
			'Content-Type' : 'application/x-amf',
			'Referer' : 'http://gorillaz.com/swf/plasticbeach/rooms/lift.swf'
		},
		onload : function(response)
		{
			GM_setValue('gorillazLiftCount', GM_getValue('gorillazLiftCount')+1 );

			display.update( response );
			
			if( isRunning )
				step1();
		}
	});
}

