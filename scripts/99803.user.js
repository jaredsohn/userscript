// ==UserScript==
// @name       link2text
// @namespace  link2text
// @version    v1.0
/* @reason
 *     translate a link into selectable by double click it.
 * @end
 */
// @match     http://*/*
// @author    wonderfuly@gmail.com
// @thankto   wong2.cn
//
// ==/UserScript==

(function(){
    var handler = function(event) {
		var button = event.button;
		if (button == 0) {
			var link = this.href;
			if (this.clickTimeout) {
				// 双击
				clearTimeout(this.clickTimeout);
				this.clickTimeout = null;
				window.now = {
					'element': this,
					'href': this.href
				};
				this.removeAttribute("href");
				this.removeEventListener("click", handler, false);
			}
			else {
				// 单击
				this.clickTimeout = setTimeout(function(){
					// 跳转到相应网址
					this.clickTimeout = null;
					window.location.href = link;
				}, 300);
			}
			//阻止链接onclick时的默认行为
			
		} else if (button == 1) {
			window.open(this.href);
		}
		event.preventDefault();
    }
    document.addEventListener("click", function(event) {
        var now = window.now;
        if (now && event.target !== now.element) {
            now.element.addEventListener("click", handler, false);
            now.element.setAttribute("href", now.href);
        }
    }, false);

    var links = document.links;
    for(var i=0, len=links.length; i<len; i++){
       links[i].addEventListener("click", handler, false);
    }
})();