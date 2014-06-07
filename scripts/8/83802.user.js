// ==UserScript==
// @name           Remover Who to follow
// @namespace      http://GreasyMonkey.com
// @description    Script Para Remover Who to follow
// @include        https://twitter.com/
// @include        http://twitter.com/
// @include        http://twitter.com/home
// @include        https://twitter.com/home
// ==/UserScript==
function  fireEvent(element,event){
       var evt = document.createEvent("HTMLEvents");
       evt.initEvent(event, true, true ) // event type,bubbling,cancelable
       return !element.dispatchEvent(evt)
}

function naoqueroseguirobrigado(b){
    var button = document.getElementsByClassName('next-suggestion')
    for(var i = 0; i < button.length; i++){
       fireEvent(button[i], 'click') 
    }
}

function start(){
	
	var interval = setInterval(function(){
			var sugestoes = document.getElementsByClassName('next-suggestion')
		 	if(sugestoes.length > 0){
				naoqueroseguirobrigado(sugestoes)
			}else{
			  clearInterval(interval)
			}
	}, 4000)
	
}	
start()