// ==UserScript==
// @name		Clear text input field button
// @version	1.0
// @date		2008-06-21
// @author	Artemy Tregubenko <me@arty.name>
// @author	João Eiras created "Textarea drag resizer", parts of which are used here
// @description 	When you click a text input field, there appears a 'clear' button. You may click it to clear the field. 
// ==/UserScript==

/**
Licensing info:

Creative Commons Attribution-Share Alike 3.0 Unported 
You are free:
	to Share  to copy, distribute and transmit the work
	to Remix  to adapt the work
	
Under the following conditions:
	Attribution. You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work). 

	Share Alike. If you alter, transform, or build upon this work, you may distribute the resulting work only under the same, similar or a compatible license.
	
For any reuse or distribution, you must make clear to others the license terms of this work. 
Any of the above conditions can be waived if you get permission from the copyright holder.
Nothing in this license impairs or restricts the author's moral rights.

http://creativecommons.org/licenses/by-sa/3.0/
**/

(function(){

	function isValidTarget(target){
		return ( target instanceof HTMLTextAreaElement ) || 
			( (target instanceof HTMLInputElement) && /text/i.test(target.type) );
	}
	
	var button, target;
	
	function focus(e){
		if( !isValidTarget(e.event.target)  ) return;
		target = e.event.target;

		if ( !button ){
			button = document.createElement('img');
			button.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKXSURBVDiNlZJLaJRnFIaf75uZ6EwSm9tIQpNIvNWoFCsmiwrSgotKS3aCl4WL0Y2CIvwLBV0YFwYckFIQhI7GhWBLdaEL6Y0WMS20aTQxijGNmnFGSZPJZcw/80/+//uOK0VjIfisz/twzstRR75gczjEBRGixrL31A35kfdAhzTfr22OrdqworwxpLl6dJva+l4CYHFFVLO0KsLHLbFYSHP29H6lU0nVmUqq2gUFVugcfFJ0fSPU15QRXazqqxrpBY4DSxcUiPCN65mLtwbz7kzJp6mdypWtGzfE400vgLqFBEpEAOjap07EV3L8k7bPVXNLOz2nu73pf8Zy7FSTxsglEc4nHBn/X0EqqXZprb79dHNHtK6ugX+//punVx+y/ux2atdVkR7t9+7f/UOM9b4zRo4lHMnOF+zRmmRTfWs5lyRqJl22dG9lUY0GFYVQNX5Qzr3BX/2B/t8N4v9gDCng5usTUkm1KHKOOxXNtas6Lh8Oaf0cQg1gxsBksUEez7bgzdWQyQzI45EBd2oyW9SvVkk4UvJ301V7sLGkI2VgZyEYAZMF8x9e4RmzuevMjJ0jXo3a1P5VhVZKwm81UsHP2UxaW6tQ/ggiPv6ch1eapViYoVCYRkTQ4UrST3oDlPym38wnHHnmz02PpNN3mXFjTEyMksulmcxlcN0pRIRY9TYKRc3Qg/6SMThvCQACI4f6en8p+qzGdT2KxTzWBuhwDZXxHeTdmNy6eSVvTPBlwpHM6xLfpPuM6ln9UXvb8hWtES//J2WxNejIMh4N9wRDQ33j1vJZwpGHAOF30oAxdAw9+Ot25ZKGDz+oatOjo/f84eGfAmu869ZyIOHIxDufOJ9UUi1Tij6lEOCatZxMOPJ4/txLfgdDCCiEEtoAAAAASUVORK5CYII=';
			button.style.cssText = 'z-index: 9999 !important; position: absolute !important; width: 16px !important; height: 16px !important; border: none !important; padding: 0 !important; margin: 0 !important;';
			button.title = 'Click to clear this text field';
			button.addEventListener('click', function(){ target.value = ''; target.focus() }, false);
			document.body.appendChild(button);
		}
		button.style.top = get_y(target) + 5 + 'px !important';
		button.style.left = get_x(target) + get_w(target) - 20 + 'px !important';
		button.style.display = 'block';
		button.resizingtarget = target;
		
	};

	window.opera.addEventListener('AfterEvent.focus', focus, false);
	window.opera.addEventListener('AfterEvent.blur', function (e){ if ( isValidTarget(e.event.target) ) button.style.display='none'; }, false);
	
	function get_y(obj){
		var y = 0;
		do {y += obj.offsetTop; }while (obj=obj.offsetParent);
		return y;
	}
	function get_x(obj){
		var x = 0;
		do {x += obj.offsetLeft; }while (obj=obj.offsetParent);
		return x;
	}
	function get_w(obj){
		var styles=getComputedStyle(obj,'');
		return (opera.version()<9.5 ? parseInt(styles.width) :
			(parseInt(styles.borderLeftWidth)+parseInt(styles.paddingLeft)+parseInt(styles.width)+
			parseInt(styles.paddingRight)+parseInt(styles.borderRightWidth)
			));
	}
	function get_h(obj){
		var styles=getComputedStyle(obj,'');
		return (opera.version()<9.5 ? parseInt(styles.height) :
			(parseInt(styles.borderTopWidth)+parseInt(styles.paddingTop)+parseInt(styles.height)+
			parseInt(styles.paddingBottom)+parseInt(styles.borderBottomWidth)
			));
	
	}

})();