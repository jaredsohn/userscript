// ==UserScript==
// @name         Back to Top for Firefox
// @author       ygtyugh, forked for Facebook by Eth
// @namespace    http://tieba.baidu.com/f?kw=firefox
// @description  Add a back to top button on Facebook
// @version	 	 2.5.1
// @include      http://www.facebook.com/*
// @include      https://www.facebook.com/*
// @require      http://code.jquery.com/jquery-1.6.min.js
// ==/UserScript==
var scroll_speed = 500;//The smaller, the faster.When you click the button, it works.
var toumingc_control = 0;//If you don't want to get the opacity(tou'ming in Chinese) changed, set it to 0;

//if(/https?:\/\/twitter\.com/i.test(window.location.href)) document.getElementById("doc").style.position = "static";

//////////////////////////////////////////////
function up() {

    $(window).scrollTop($(window).scrollTop() - 1);
    fq = setTimeout(up, move_speed)
};

function create_button() {
	if(document.body){
		var a = document.createElement('span');
		a.id = "shang";
		var css_a = 'opacity:1;-moz-transition-duration:0.2s;background:url(data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=) no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 5px 0 0;cursor:pointer;height:36px;margin-right:24px;width:36px;position:fixed;right:230px;bottom:0%;z-index:1';

		a.style.cssText = css_a;
		a.addEventListener('mouseout',function(){clearTimeout(fq);},false);
		a.addEventListener('click', function(){ $("html,body").animate({scrollTop:0},scroll_speed); }, false);

		if(toumingc_control){
		$(window).scroll(function(){
			if($(window).scrollTop()){
				a.style.display = "";
			}
			else{
				a.style.display ="none";
			}
			a.style.opacity=($(window).scrollTop())/($(document).height()-$(window).height());
		});
		}
		document.body.appendChild(a);
	}
};
if(window != window.top) return 0;
if($(document).height()-$(window).height())	create_button();