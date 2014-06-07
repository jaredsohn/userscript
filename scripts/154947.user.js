// ==UserScript==
// @name           Diaspora Graph Button
// @namespace      https://pod.geraspora.de/u/codehero
// @description    Adds a button for the Diaspora reshare graph.
// @require        http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.1/jquery.fancybox.pack.js
// @require        http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.1/jquery.fancybox.pack.js 
// @include        http*://pod.geraspora.de/posts/*
// @include        http*://my-seed.com/posts/*
// @include        http*://the.diasperse.com/posts/*
// @include        http*://li-la.de:3000/posts/*
// @include        http*://social.mathaba.net/posts/*
// @include        http*://humanless.ru/posts/*
// @include        http*://poddery.com/posts/*
// @include        http*://yaspora.com/posts/*
// @include        http*://ottospora.nl/posts/*
// @include        http*://diasp.eu/posts/*
// @include        http*://diasp.be/posts/*
// @include        http*://diasp.org/posts/*
// @include        http*://mul.tiver.se/posts/*
// @include        http*://diaspora.compadre.dk/posts/*
// @include        http*://failure.net/posts/*
// @include        http*://despora.de/posts/*
// @include        http*://londondiaspora.org/posts/*
// @include        http*://filiusdex.com/posts/*
// @include        http*://diasp.de/posts/*
// @include        http*://diasp.urbanabydos.ca/posts/*
// @include        http*://fused.at/posts/*
// @include        http*://diaspora.subsignal.org/posts/*
// @include        http*://diaspora.lt/posts/*
// @include        http*://joindiaspora.com/posts/*
// @include        http*://efix.tk/posts/*
// @include        http*://diaspora.streusel.org/posts/*
// @include        http*://diasp.eu.com/posts/*
// @include        http*://diasp.fi/posts/*
// @include        http*://diaspora.dannielou.com/posts/*
// @include        http*://diaspora.xn--grne-lampe-beb.de/posts/*
// @include        http*://dpod.se/posts/*
// @include        http*://diaspora.isnap.gr/posts/*
// @include        http*://soc.ragriz.net/posts/*
// @include        http*://pod.chrisi01.de/posts/*
// @include        http*://foobar.cx/posts/*
// @include        http*://testy.kompisen.se/posts/*
// @include        http*://yaspora.es/posts/*
// @include        http*://diaspora.eigenlab.org/posts/*
// @include        http*://diaspora.sceal.ie/posts/*
// @include        http*://mariosabatino.info/posts/*
// @include        http*://diaspora.gpeni.net/posts/*
// @include        http*://rlb.co/posts/*
// @include        http*://www.geekspot.eu/posts/*
// @include        http*://diaspora.adlerweb.info/posts/*
// @include        http*://diasporapt.com/posts/*
// @include        http*://friends.gabewarren.com/posts/*
// @include        http*://84.23.75.136/posts/*
// @include        http*://diaspora.chouchoune.fr/posts/*
// @include        http*://alt.md/posts/*
// @include        http*://lksnyder0.mooo.com/posts/*
// @include        http*://nerdpol.ch/posts/*
// ==/UserScript==


      //$(document).ready(function() {

    function do_after_a_while () {
            	$(".various").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	        });


            //alert('test');

            var topnode = document.getElementById("top-right-nav");
     
            var graphlinknode = document.createElement("a");
            graphlinknode.setAttribute('class', 'various');
            graphlinknode.setAttribute('data-fancybox-type', 'iframe');
            graphlinknode.setAttribute('href', 'http://mablae.taurus.uberspace.de/diaspora_vis/?startUrl='+encodeURIComponent(window.location.href+'.json'));
            graphlinknode.setAttribute('id', 'graph-button');
     
            var graphspannode = document.createElement("span");
            graphspannode.setAttribute('class', 'label label-inverse');
     
            var graphspani = document.createElement("i");
            graphspani.setAttribute('class', 'icon-retweet icon-white');
     
            var graphspanspan = document.createElement("span");
     
            var graphbuttontext = document.createTextNode("GRAPH");
     
            graphspanspan.appendChild(graphbuttontext);
            graphspannode.appendChild(graphspani);
            graphspannode.appendChild(graphspanspan);
            graphlinknode.appendChild(graphspannode);
            topnode.appendChild(graphlinknode);
    }
     
     
    window.setTimeout(do_after_a_while,3333);
                           