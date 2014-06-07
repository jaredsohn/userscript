// ==UserScript==
// @name			SoundCloud Listened & Listenability
// @namespace		http://www.raiscripts.com
// @version			0.4
// @description		Adds a listenability statistic to the stats area for all tracks. Also greys out tracks you've already listened to.
// @include			http://www.soundcloud.com/*
// @include			http://soundcloud.com/*
// @include			https://www.soundcloud.com/*
// @include			https://soundcloud.com/*
// ==/UserScript==


Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};

var playedTracks = {};
var scll = {};
scll.JQ = null;
scll.myUnsafeWindow = null;
scll.clientId = atob('YTNlMDU5NTYzZDdmZDMzNzJiNDliMzdmMDBhMDBiY2Y=');

scll.addListenability= function ( sound )
{	
    var soundJQ = scll.JQ(sound);
    if (soundJQ.parents('.soundList__item').find(".listenability").length == 0) {
        var playsHtml = soundJQ.find(".sc-ministats-plays > .sc-visuallyhidden").html();
        if (playsHtml !== undefined)
        {
        var plays = soundJQ.find(".sc-ministats-plays > .sc-visuallyhidden").html().split(" ");
        var playCount = 0;
        var likes = soundJQ.find(".sc-ministats-likes > .sc-visuallyhidden").html().split(" ");
        var likeCount = 0;
        var listenability = 0;
        if (plays.length > 0) playCount = parseInt(plays[0]);
        if (likes.length > 0) likeCount = parseInt(likes[0]);
        if (playCount > 0) listenability = Math.round(100.0 * likeCount / playCount).toString();
        
        if (listenability < 3) {
            var hideContainer = scll.JQ('<div class="listenability hidden">Crappy track was hidden. </div>').prependTo(soundJQ.hide().parents('.soundList__item'));
            scll.JQ('<a href="#">(Unhide)</a>')
            	.on('click', function() { scll.unhideTrack(this); return false;})
            	//.on('mouseover' function() {}) // todo - add a mouseover that shows the track info
            	.appendTo(hideContainer);
        }
        else if (listenability > 10)
        {
            soundJQ.find('.sound__uploadTime').prepend('<span style="color:#F00;font-weight:bold;padding-right:10px;">HOT SHIT YO<span>');
        }
        else if (listenability > 6)
        {
            soundJQ.find('.sound__uploadTime').prepend('<span style="color:#FF7A3D;padding-right:10px;">SOLID<span>');
        }
         
        var uploadTime = Date.parse(soundJQ.find('.relativeTime').attr('datetime'));
        if (uploadTime > (new Date()).addDays(-1))
        {
            soundJQ.find('.sound__uploadTime').prepend('<span style="color:#00FF5D;padding-right:10px;">FRESH<span>');
        }
        
        soundJQ.find(".sc-ministats-group").prepend('<li title="Listenability: ' + listenability + '%" class="sc-ministats-item"><span class="sc-ministats sc-ministats-small sc-ministats-plays listenability"><span class="sc-visuallyhidden">Listenability: ' + listenability + '%</span><span aria-hidden="true">' + listenability + '</span></li>');
        }
    }
}

scll.checkPlayed= function ( sound )
{	
    var soundJQ = scll.JQ(sound);
    var trackLink = soundJQ.find('.soundTitle__title').attr('href');
    if (!soundJQ.hasClass('played') && playedTracks[trackLink] != null)
    {
        soundJQ.css('background-color', '#eee').addClass('played').find('.sound__soundActions').css('background', 'inherit');
    }
    else if (soundJQ.hasClass('playing'))
    {
    	playedTracks[trackLink] = true;
        soundJQ.css('background-color', '#eee').addClass('played').find('.sound__soundActions').css('background', 'inherit');
        localStorage.setItem('playedTracks', JSON.stringify(playedTracks));
    }
}

scll.unhideTrack = function (sender) {
    scll.JQ(sender).parent().hide().parents('.soundList__item').find('.sound').show();
}

function myMain()
{	
	scll.JQ(".sound").each( function()
	{
        if (!scll.JQ(this).hasClass('.playlist'))
			scll.addListenability( this );
        
        scll.checkPlayed( this );
	});
	/*
	if( scll.JQ(".trackList").length > 0 )//We have a playlist, add download link to each item in the playlist.
	{
		scll.JQ(".trackList .trackList__item").each( function ()
		{
			scll.addListenability( this );
		});
	}
    */
	scll.JQ(document).off("mousedown");
	scll.JQ(window).off("mousedown",'a[href*="-media.soundcloud."]');
	scll.JQ(scll.myUnsafeWindow).off("mousedown",'a[href*="-media.soundcloud."]');
}

function GM_wait() 
{
    if(typeof(Storage)!=="undefined")
    {
        var savedPlayedTracks = localStorage.getItem('playedTracks');
        if (savedPlayedTracks)
        	playedTracks = JSON.parse(savedPlayedTracks);
    }
	if( typeof unsafeWindow != 'undefined')
	{
		scll.myUnsafeWindow = unsafeWindow;
	}
	else if( window.navigator.vendor && window.navigator.vendor.match(/Google/) || ( window.navigator.appName && window.navigator.appName.match(/Opera/) )  )
	{	
		scll.myUnsafeWindow = (function()
		{
			var el = document.createElement('p');
			el.setAttribute('onclick', 'return window;');
			return el.onclick();
		}());
	}
	if(typeof scll.myUnsafeWindow.jQuery == 'undefined')
	{ 
		window.setTimeout(GM_wait,200); 
	}
	else 
	{
		scll.JQ = scll.myUnsafeWindow.jQuery;
		scll.c = Math.random().toString(36).substring(7);
		myMain();
		setInterval(myMain, 3000);//Check for new tracks and update with download links every 3 seconds.
	}
}
GM_wait();