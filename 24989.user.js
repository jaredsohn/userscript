// ==UserScript==
// @name           The Eighth
// @namespace      userscipts.org
// @description    JB's Quick-Nav script Redeux
// @version	0.2
// @include        http://forums.whirlpool.net.au*
// @include        http://whirlpool.net.au*
// ==/UserScript==

(function() {

	$ = unsafeWindow.jQuery;

	if(document.URL == 'http://forums.whirlpool.net.au/' || document.URL == 'http://forums.whirlpool.net.au/forum.cfm'){
	
		function checkIfSimonHasChangedShitAgain(gm){

			var arrHolder = [], hrefArr = [], dGetter;
			
			(gm == 'h3check')?dGetter = $('h3') : dGetter = $("h3:contains('"+gm+"')").next().find("div.title a[@href*='forum-threads.cfm']");		
		
			dGetter.each(function(){

				arrHolder.push($(this).text());

				if(gm != 'h3check'){
				
					hrefArr.push($(this)[0].href);
					
				}
			  
			});

			var ts = arrHolder.toString();

			if(!GM_getValue(''+gm+'') || ts != GM_getValue(''+gm+'') ){

				GM_setValue(''+gm+'',''+ts+'');
				
				if(gm != 'h3check'){
				
					GM_setValue(''+gm+'href',''+hrefArr.toString()+'');
				
				}

			}		
			
		}
	
		checkIfSimonHasChangedShitAgain('h3check');
		
		var splith3 = GM_getValue('h3check').split(',');

		for(var i=0;i<splith3.length;i++){
		
			checkIfSimonHasChangedShitAgain(splith3[i]);
		
		}
	
	}

	GM_addStyle("#pmenu {padding:0;list-style-type: none; position:fixed;z-index:50;height:19px;overflow:hidden;width:18px;}"+
				"#pmenu img{margin;0;padding:0;border:none;background:transparent;width:16px;}"+
				"#pmenu:hover {height:auto;overflow:visible;}"+
				"#pmenu ul {padding:0; margin:0; list-style-type: none; width:101px;}"+
				"#pmenu li {position:relative;z-index:51;}"+
				"#pmenu a{display:block;width:100px; font-size:10px; color:#000; height:23px; line-height:22px; "+
					"text-decoration:none; text-indent:5px; background:#D4CCC3; border:1px solid #fff; border-width:0 1px 1px 0;}"+
				"#pmenu>li>ul>li>a{background:#EDEDED;}"+
				"#pmenu li:hover > a {background:#dfd7ca; color:#c00;}"+
				"#pmenu li ul {display: none;} "+
				"#pmenu li:hover > ul {display:block; position:absolute; top:0; z-index:52;margin-left:101px;}");	

	
	var unLi = document.createElement('ul');
	unLi.setAttribute('id', 'pmenu');
	
	var uNumber = $('#menu+dl>dd:first').text().split('User ID: #')[1];
	
	var loc = document.location.host;
	
	var spinner="data:image/png;base64,"+
		"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"+
		"RK5CYII=";

	var gfx = 'http://forums.whirlpool.net.au/skin/web/img/favicon.gif';	
	
	var pol = 'data:image/png;base64,R0lGODlhFAAcAOU+AAICAjKa/qKCCuLCEv4CAtKaCprK/gJiyv6amtrSxmJKEtKyEurq4nJiMqKa'+
				'eoJiCv7iIv5iYrqKCnJaCppqAvLSGtra0mJSGv6iQuKyEgIyYvLKGtqqEv7+8opyEsqaCpKKYkIy'+
				'Ev7+AgIaMv7i4v7Kyqp6ArKSCv7y8pJqCv7aGurKGtq6GnpqOuLi2tKiCrqSCppyCuK6EmpKCGpS'+
				'CnpiOqqagopiAqqCCurCEtqyEtqiCsKSCmpSGv7+/gAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQF'+
				'BQA/ACwAAAAAFAAcAAAG/8CfcPgDGI/EJBFAaDoBSiXT2YRGl9TqFZu1botZgvd6LCOjxoN6fdC4'+
				'jUkAO30wut9DufotMmIAdyMjUIBvRyIiH39HgoOFAAEGkmUBlXWClGaackhHbmx3GphwPyieGiF3'+
				'IY1HHUIJExUQRiFHtUY5HDMJQg4eIcDBwsIPDkI1LCoQwsvBKhsyPC1CCivKwRDZztAfF9TW2eHi'+
				'ECorGd1CDQuy4+IVOToS0z8OOBsqIe3kITI7FMY/EtAYUAHfOHy5CuwSggKEgBwbKgwLAe8FBRAo'+
				'hrjocUJGjhUbNqzIIYPDCxM9XCSx0CAFhwwyZGTQsePDjQYWojBwMCMGjBcXBSRQmOGAwZYOCWy0'+
				'UKCghY0ErogEAQAh+QQFBQA/ACwHAAEAAgAFAAAGB0AEojQsEoMAIfkEBQUAPwAsBwABAAQABQAA'+
				'Bg3AiDCC+Al9xgjymAwCACH5BAUFAD8ALAYAAAAIAAYAAAYbwB9hSBQijsjhr8QsIYYlkpRUgk6p'+
				'Q0SU+gwCACH5BAUFAD8ALAYAAAAIAAYAAAYawB9gSBQSCIgkYnhMlkpMJKLkizqrgOa0GgQAIfkE'+
				'BQUAPwAsCQABAAQABQAABg1AAgGBECJKRuRQeQwCADs=';
	
	function qSett(){
	
		var qnsArray;

		var pO = window.pageYOffset+20;
		
		GM_addStyle("#setD{position:absolute;width:160px;height:330px;background-color:#D8D0C8;border:3px solid orange;left:35%;top:"+pO+"px;z-index:20;padding:20px;}"+
					"#setDh3{margin:0;background-color:#525D94;color:white;padding:10px;}"+
					"#setDcancel{margin-top:20px;}"+
					"#setDok{margin-top:20px;margin-left:20px;padding:0 20px;}");
	
		var setD = document.createElement('div');
		setD.id="setD"; 
		setD.innerHTML='<h3 id="setDh3">QuickNav Settings</h3>'+
			'<div id="setDcontentA">'+
			'<h4 id="setDhA4">Select Image To Use:</h4>'+
			'<form id="iSrc" name="iSrc">'+
			'<input type="radio" name="qnS" gm="imgSrc" value="'+spinner+'"> <img height="18px" width="18px" src="'+spinner+'" />'+
			'<br />'+
			'<input type="radio" name="qnS" gm="imgSrc" value="'+gfx+'"> <img src="'+gfx+'" />'+
			'<br />'+
			'<input type="radio" name="qnS" gm="imgSrc" value="'+pol+'"> <img src="'+pol+'" />'+			
			'</form>'+	
			'<br />'+
			'<h4 id="setDhA4">Select QuickNav Position:</h4>'+
			'<form id="quickNav" name="quickNav">'+
			'<input type="radio" name="qnS" gm="nPos" value="left">Far Left'+
			'<br />'+
			'<input type="radio" name="qnS" gm="nPos" value="right">Right Of Menu'+
			'</form>'+	
			'<br />'+		
			'</div>';
			
		var bC = document.createElement('button');
		bC.id="setDcancel"; 
		bC.value="Cancel";
		bC.textContent="Cancel";
		setD.appendChild(bC);
		$(bC).mouseup(function(){
		
			$(this).parent().remove();
		
		})		

		var bOk = document.createElement('button');
		bOk.id="setDok"; 
		bOk.value="OK";
		bOk.textContent="OK";
		setD.appendChild(bOk);
		bOk.addEventListener('click', function() {

			for(var n=0;n<qnsArray.length;n++){
			
		        var aCheck = qnsArray[n].checked;
				
				if(aCheck){
				
					var meh = qnsArray[n].getAttribute('gm');
				
					GM_setValue(''+meh+'', ''+qnsArray[n].value+'');

				}		
			
			}
			
			$(this).parent().remove();
		
		}, false);		
		
		$('body').prepend(setD);
		
		qnsArray = document.getElementsByName('qnS');
		
		for(var m=0;m<qnsArray.length;m++){
	
		    if( qnsArray[m].value == (GM_getValue('imgSrc')) || (qnsArray[m].value == GM_getValue('nPos')) ){

		        qnsArray[m].setAttribute('checked', 'checked');

		    }			
		
		}		
	
	}

	GM_registerMenuCommand('QuickNav Settings', qSett);
	
	if(!GM_getValue('h3check')){
	
		GM_setValue('imgSrc' , 'http://forums.whirlpool.net.au/skin/web/img/favicon.gif');
		GM_setValue('navPos' , '25px 0 50px 5px');
		
		unLi.style.display.margin = GM_getValue('navPos');
		unLi.innerHTML = '<a style="font-size:9px;" href="http://forums.whirlpool.net.au">Please Visit The Forum Index</a>';
	
		$('body').prepend(unLi);
	
	}
	else{
	
		var br = ($('body').width() - $('#root').width())/2+$('#left').width();
		
		(GM_getValue('nPos') == 'left')? GM_addStyle("#pmenu {margin: 25px 0 50px 5px}"): GM_addStyle("#pmenu {margin: 25px 0 50px "+br+"px}");

		var imgSrc = GM_getValue('imgSrc');
	
		unLi.innerHTML = '<img src="'+imgSrc+'" />'+
			'<li><a href="#">WP User</a>'+
				'<ul> ' +
					'<li><a href="http://'+loc+'/forum-user.cfm?id='+uNumber+'">Your Posts</a></li> ' +
					'<li><a href="http://'+loc+'/forum-user-online.cfm">People Online</a></li> ' +
					'<li><a href="http://'+loc+'/whim/?action=inbox">Inbox</a></li> ' +
					'<li><a href="http://'+loc+'/whim/?action=outbox">Outbox</a></li> ' +
					'<li><a href="http://'+loc+'/whim-contacts.cfm">Contacts</a></li> ' +
					'<li><a href="http://'+loc+'/forum-subs.cfm">Subscriptions</a></li> ' +
					'<li><a href="http://'+loc+'/forum-search.cfm">Thread Search</a></li> ' +
					'<li><a href="http://'+loc+'/profile/">Your Settings</a></li> ' +
					'<li><a href="http://'+loc+'/profile/index.cfm?a=logout&logout='+uNumber+'">Log out</a></li> ' +
				'</ul> ' +
			'</li> ';	

		$('body').prepend(unLi);

		var h3splitSecond = GM_getValue('h3check').split(',');
		
		for(var j=0;j<h3splitSecond.length;j++){
		
			var hrArrSplit = GM_getValue(''+h3splitSecond[j]+'href').split(',');	
			
			var splitagain = GM_getValue(''+h3splitSecond[j]+'').split(',');
			
			var l = document.createElement('li');
			l.setAttribute('class', 'theeighthli');
			l.innerHTML = '<a href="#">'+h3splitSecond[j]+'</a>';

			var ul2 = document.createElement('ul');
			ul2.setAttribute('class', 'theeighthul');
			l.appendChild(ul2);		
			
			for(var k=0;k<splitagain.length;k++){
			
				var l2 = document.createElement('li');
				l2.setAttribute('class', 'theeighthli2');
				l2.innerHTML = '<a href="'+hrArrSplit[k]+'">'+splitagain[k]+'</a>';	
				ul2.appendChild(l2);	
				
			}	
			
			unLi.appendChild(l);
			
		}
			
	}

	
})();