// ==UserScript==
// @name       MyDigitalLifeForum - All posts in one page UserScript
// @namespace  http://www.zunq.net/
// @version    1.0
// @description  https://www.freelancer.com/u/carpediem22.html
// @match      http://forums.mydigitallife.info/*
// @copyright  2013, Soare Daniel-Bogdan
// ==/UserScript==


function loadScript(src, callback) {
    var head=document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.onreadystatechange = function () {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
            callback();
        }
    }
    script.onload = callback;
    script.src = src;
    head.appendChild(script);
}

function isjQueryLoaded() {
    return (typeof jQuery !== 'undefined');
}

function tryLoadChain() {
    var chain = arguments;
    if (!isjQueryLoaded()) {
        if (chain.length) {
            loadScript(
                chain[0],
                function() {
                    tryLoadChain.apply(this, Array.prototype.slice.call(chain, 1));
                }
            );
        } else {
            alert('not loaded!');
        }
    } else {
        console.log('Successfully loaded jquery!');
		$("#postlist .content div").filter(function() { return $(this).css("display") == "none" }).css('display','block');
        appendMenu();
        debugdata();
    }
}

tryLoadChain(
    'https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'
);

function debugdata(){
    if (isPrintView() == true ){console.log('Printview: true;')} else {console.log('Printview: false;');}
    console.log('Max page: ' + determineMaxPage());
    console.log('Current page: ' + determineCurrentPage());
}

function isPrintView(){
	var documentpath = document.URL;
	if ( documentpath.lastIndexOf('printthread')  > 0 ) return true;
	return false;
}

function determineMaxPage() {
    var max_page = $('.first_last').last().find('a').attr('href');
    if (isPrintView() == true) {
    	max_page = max_page.substr(max_page.lastIndexOf("page")+5,4);
        max_page = parseInt(max_page);
        return max_page;
    }
	max_page = max_page.substr(max_page.lastIndexOf("page")+4,4);
    max_page = parseInt(max_page);
    return max_page;
}

function determineCurrentPage() {
    var current_page = $('#pagination_top span.selected').text();
	current_page = parseInt(current_page);
    return current_page;
}

var time_started;

function appendMenu() {
    if (isPrintView() == true)
    {
     	$("#pagetitle p").append('<ul id="mdlf-controller"><p></p></ul>'); 
    }else {
        $("#thread_controls div").first().append('<ul id="mdlf-controller"><p></p></ul>');
        $("#mdlf-controller").css('float','left');
        
    } 
    $('#mdlf-controller').append('<button id="mdlf-go-button"> Append remaining posts... </button>');
    $('#mdlf-controller p').css('display','inline-block');
    $("#mdlf-controller p").text('Page ' + determineCurrentPage() + '/' + determineMaxPage());
    
    $('#mdlf-go-button').click(function() {
       var last_page = $('.first_last').last().find('a').attr('href');
	   var general_url;
	   if (isPrintView() == true) {
			general_url = last_page.substr(0,last_page.lastIndexOf("page")+5);
	   } else {
			general_url = last_page.substr(0,last_page.lastIndexOf("page")+4);
	   }
       general_url = 'http://forums.mydigitallife.info/' + general_url;
        
       time_started = new Date();
       time_started = time_started.getTime();
       doit(determineCurrentPage(),general_url);
    });
}

function updateStatus(x) {
    $('#mdlf-controller p').text('Retriving page ' + x + ' of ' + determineMaxPage());
}

function doit(x,general_url) {
	if (x<determineMaxPage()) {
		x=x+1;
		var  ajaxlink = general_url + x;
		$.ajax({
		  url: ajaxlink,
		  cache: false,
		  dataType : "html",
		})
		  .done(function( html ) {
              if (isPrintView() == true) {
                  var res1 = jQuery(html).find('#postlist').children();
				  //res1.filter(function() { return $(this).css("display") == "none" }).css('display','block');
                  $('#postlist').append(res1);
              }
              else
              {
                  var res2 = jQuery(html).find('#posts').children().not('div');
				  //res2.filter(function() { return $(this).css("display") == "none" }).css('display','block');
                  $('#posts').append(res2); 
              }
			  $("#postlist .content div").filter(function() { return $(this).css("display") == "none" }).css('display','block');
              updateStatus(x);
			doit(x, general_url);
		  });
	}
    else {
       var elapsed_time;
       var now = new Date();
       elapsed_time = now.getTime() - time_started;   
       alert('Done retriving all pages. Action took ' + elapsed_time/1000 + ' seconds');
       $('#mdlf-controller').text(''); 
    }
}