// ==UserScript==
// @name          Reddit Hide All
// @namespace     http://userscripts.org/users/dbeck
// @description   Adds a button next to the logo to Hide All 
// @include       http://reddit.com/*
// @include       http://*.reddit.com/* 
// @exclude       http://www.reddit.com/comscore-iframe/*
// @exclude       http://static.reddit.com/ads/*
// @version       4
// @date          2010.04.20
// @creator       reddit@douglasbeck.com
// @homepage      http://douglasbeck.com/scripts/reddit/
// ==/UserScript==

/*
	if you have any comments or suggestions 
	send a reddit message to: dougletts
*/
var code_string = "(" + function() {
	
	//helper funciton
	function xpath(p, context) {
		if(!context) context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr;
	}
	
	//grab list at top of page
	var list = xpath("//div[@id='header-bottom-left']/ul")[0];
	if(typeof list=="undefined"||!list) return;
	
	//create link with hide functionality
	var link = document.createElement('a');
	link.setAttribute('href','#');
	link.setAttribute('id','reddit-hide-all');
	link.innerHTML = 'hide all';
	link.addEventListener('click', function(event){
		
		//ajax loading spinner
		var spinner = {
			lock : 0,
			remove : function(){
				--spinner.lock;
				if(spinner.lock ==0)
					$('#reddit-hide-all').css("background", "#EFF7FF");				
			},
			add : function(){
				//created ajax spinner with http://www.ajaxload.info/ #EFF7FF and #FF4500 (orangered) 
				//created data uri with http://www.sveinbjorn.org/dataurlmaker
				$('#reddit-hide-all').css("background", 'url("data:image/gif;base64,R0lGODlhEAAQAPIAAO/3//9FAPLMwv'+
				'pzQv9FAPiJYvafgvWqkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACw'+
				'AAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwA'+
				'AAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsA'+
				'AAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAw'+
				'AsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAA'+
				'sAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwA'+
				'AAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAA'+
				'AAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAA'+
				'AQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==") '+
				'#EFF7FF no-repeat center');
			}
		};
		
		// requests are now rate-limited in the default js, so I had to write my own function to process the requests.
		// I actually like it better because it hides the link *after* the request is sent/completed, not before.
		// I DON'T like how many ajax request this makes so I've submitted a feature request:
		// http://code.reddit.com/ticket/576
		$.fn.extend({
			redditHide: function(op, parameters, link){
				$.post(op, parameters, function(){ 
					hide_thing($(link).parents("form"));
					spinner.remove();
				}, null);
				return ++spinner.lock;
			}
		});
		
		//grab & hide all
		var links = document.getElementsByTagName('a');
		var count = 0;
		
		for(var i=0; i<links.length; i++){
			if(links[i].innerHTML === 'hide' && $(links[i]).thing().css('display') === 'block'){
				
				//add spinner background image
				spinner.add();
				
				// using just the onclick no longer works :(
				// change_state(links[i], 'hide', hide_thing);
				
				// looking at: http://code.reddit.com/browser/r2/r2/public/static/
				//		js/jquery.reddit.js?rev=77e51a304d1b4034614d75c5bf4c07b216400a42#L141
				var form = $(links[i]).parents("form");
				var id = $(links[i]).thing_id();
				var op = '/api/hide';
				var parameters = get_form_fields(form, {id: id});
				if (reddit.logged) parameters.uh = reddit.modhash;
				
				$().redditHide(op, parameters, links[i]);
				
				++count;
			}
		}
		if(count===0){
			alert('None Found.');
		}
				
		// stop default click action
		event.stopPropagation();
		event.preventDefault();
	}, true);

	//create new list item with link
	var item = document.createElement('li');
	item.appendChild(link);
	
	//insert at top of the list
	var topItem = list.getElementsByTagName('li')[0];
	list.insertBefore(item, topItem);
	
} + ")()";

// workaround for Google Chrome
// I realize this is NOT the nice way to do such things but from what I
// read there's no other way to access Reddit's native JS code
// (maybe one day 'hiding' will be added to the API)
var script = document.createElement('script'); 
script.type = 'text/javascript'; 
script.appendChild( document.createTextNode( code_string ) );
document.body.appendChild(script);
