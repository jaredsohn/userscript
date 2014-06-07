// ==UserScript==
// @name         Hide unwanted posters from Warriorsworld Main
// @namespace    hide_unwanted_posters
// @include      http://forums.warriorsworld.net/main/*
// @include      https://forums.warriorsworld.net/main/*
// @author       Originally designed by Jim Barnett (The fake one)
// @description  Improve the quality of your life and save time by hiding all posts written by unwanted posters on warriorsworld.net.  This extension will also remove any responses because any time spent replying is a waste of time as well.
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  
	var e = $('b:contains(yung virgo)');
        var e2 = $('b:contains(Alonzo)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(four touchdowns in a single game)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(GruberGoober)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(TidesHaveTurned)');
        $.merge( e, e2 );
        e2 = $('b:contains(whack jack)');
        $.merge( e, e2 );
        e2 = $('b:contains(mullyasadanoguac)');
        $.merge( e, e2 );
        e2 = $('b:contains(Trash Brothers)');
        $.merge( e, e2 );
        e2 = $('b:contains(K@libug@n)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(Showtime)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(northtop)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(2legit2quit)');
        $.merge( e, e2 );
        e2 = $('b:contains(wavey)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(whiteboy)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(Barnes-Spits-Bazetard-For-ThadeusYoung!!!!)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(ThrowTheBall)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(Khoee)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(Smedley)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(Building Winners)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(NCal Sports on the Rise)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(gswinsider)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(thehella)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(Giddyap-a-ding-dong-Giddyap)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(bringbackjarrettjack)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(LOLakers)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(david®)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(fredean100)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(never.forget.the.warriors)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(umami)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(folks)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(kerrywoodwins20)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(stompah)');
        $.merge( e, e2 ); 
        e2 = $('b:contains(jayfly)');
        $.merge( e, e2 ); 

	var parents = e.closest('ul').remove();

	var post = $('a:contains(Post A Message)');

	if (post != null){

		var message = 'You have been saved from ' + e.length + ' posts by people that annoy you!';
		post_parent = post.closest('table');
		post_parent.after('<p style="font-family: verdana; font-size: 12px; color: #666; font-weight: bold; text-align: center">' + message + '</p>');
	
	}
  
}

// load jQuery and execute the main function
addJQuery(main);