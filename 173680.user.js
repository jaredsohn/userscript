// ==UserScript==  
// @name         keynav
// @version      0.0.3
// @author       sapjax@gmail.com
// @namespace    https://github.com/sapjax
// @description  页面键盘导航脚本 
// @include      *
// @grant        none
// ==/UserScript== 

//页面键盘导航脚本，按j,k 上下滚动页面，J,K的滚动距离更大 。
//按G 滚动页面到底部，g滚动页面到顶部 。
//按H,L 前进后退页面 。 
//按 . 建(问号左边) 进入hint模式， 会标记页面中的a ，input , textarea ，select元素, 键入标记的字母, 会点击对应的元素，按ESC退出hint模式
//当筛选元素时，字符少的案键完全匹配时， 可以按enter键 ， 手动跳转

;(function() {

	if( !('querySelectorAll' in document) ) return

	var HINT_KEYS =      ["a", "s", "d", "f", "j", "k", "l", "m", "w", "g", "h", "e", "r", "i", "o", "p"]
	var HINT_KEY_CODES = [ 65,  83,  68,  70 , 74,  75,  76,  77,  87,  71,  72,  69,  82,  73,  79, 80]; 
	var EMIT_KEY_CODE = 190; //.键
	var ESC_KEY_CODE = 27; //ESC建
	var ENTER_KEY_CODE = 13
	var J_KEY_CODE = 74
	var K_KEY_CODE = 75
	var G_key_CODE = 71
	var H_KEY_CODE = 72
	var L_KEY_CODE = 76
	var TAG_CLASS = '_keynav_tag_'
	var MATCHED_TAG_CLASS = '_keynav_tag_matched_'
	var SHEACHED_TAG_CLASS = '_keynav_tag_searched_'
	var IS_OPEN = false
	var KEYUP_TIMEOUT = 200
	var keyIndex = 0x0
	var tagMap = {}
	var tmpkeys = []
	var inited = false
	var searchedElement = null
	var tagBox = document.createElement( 'div' )
	var styleText = '.' + TAG_CLASS + 
		' {\
			position : absolute;\
			z-index	: 99999999;\
			padding : 5px;\
			background : rgba(0,0,0,0.8);\
			color : #fff;\
			border-radius : 5px;\
			font-size : 12px;\
			line-height : 12px;\
			box-shadow : 2px 2px 2px #666;\
		}' + 
		'.' + MATCHED_TAG_CLASS + 
		' {\
			// background : rgba(0,0,255,0.8);\
		}' +
		'.' + SHEACHED_TAG_CLASS +
		' {\
			background : rgba(255,0,0,0.8);\
		}'


	function insetStyle(styleText) {
		var style = document.createElement( "style" ); 
		style.type = "text/css"; 
		style.appendChild(document.createTextNode( styleText )); 
		var head = document.getElementsByTagName( "head" )[0]; 
		head.appendChild( style )
	}



	function getTargets() {
		return [].slice.call(document.querySelectorAll( 'a,input,select,textarea,[tabindex]' ), 0 )
	}



	function getPosition( elem ) {
		var box = elem.getBoundingClientRect()
		var doc = elem.ownerDocument
		var docElem = doc.documentElement
		return {
			top: box.top + ( window.pageYOffset || docElem.scrollTop ) - ( docElem.clientTop || 0 ),
			left: box.left + ( window.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		}
	}


	function getHintKey() {
		var key = ''
		var indexArr = keyIndex.toString(16).split('')
		indexArr.forEach(function( o, i ) {
			var n = ('0x' + o) * 1
			key += HINT_KEYS[n]
		})

		keyIndex++
		return key
	}


	function addTag(targets) {
		targets.forEach(function( elem, i ) {
			var pos = getPosition( elem )
			var key = getHintKey()
			var tag = document.createElement('div')
			tag.id = TAG_CLASS + key
			tag.className = TAG_CLASS
			tag.style.left = pos.left + 'px'; 
			tag.style.top = pos.top + 'px'
			tag.innerHTML = key
			tagBox.appendChild(tag)
			tagMap[key] = {
				elem : elem,
				tag  : tag,
				left : pos.left,
				top  : pos.top
			}
		})
		document.body.appendChild( tagBox )
		IS_OPEN = true
	}



	function clearTag() {
		keyIndex = 0x0
		tagMap = {}
		tmpkeys = []
		document.body.removeChild(tagBox)
		tagBox.innerHTML = ''
		searchedElement = null
		IS_OPEN = false
	}



	function bindKeyEvent() {
		document.addEventListener('keyup', function(e) {
			var elemType = e.target.nodeName.toLowerCase()
			var key = e.keyCode || e.witch
			var isInput = elemType == 'input' || elemType == 'textarea'

			if( !e.shiftKey && !e.ctrlKey && !e.altKey ) {
				if( key == EMIT_KEY_CODE && !isInput && !IS_OPEN ) {
					addTag(getTargets())
				} else if( key == ESC_KEY_CODE) {
					IS_OPEN && clearTag()
					if(isInput) {
						e.target.blur()
					}
				} else if ( key == ENTER_KEY_CODE && !isInput && IS_OPEN) {
					searchedElement && emitEvent( [searchedElement] )
				} else if( IS_OPEN ) {
					var index = HINT_KEY_CODES.indexOf( key )
					if(index > -1) {
						tmpkeys.push( HINT_KEYS[index] )
						emitEvent(searchTag(tmpkeys.join('')))
					}
				}
			}
		}, false)

		document.addEventListener('keydown', function(e) {
			var elemType = e.target.nodeName.toLowerCase()
			var key = e.keyCode || e.witch
			var isInput = elemType == 'input' || elemType == 'textarea'
			if(!e.ctrlKey && !e.altKey && !isInput && !IS_OPEN ) {
				switch (key) {
					case J_KEY_CODE:
						scrollPage( e.shiftKey ? 10 : 1)
						break
					case K_KEY_CODE:
						scrollPage( e.shiftKey ? -10 : -1)
						break
					case G_key_CODE:
						scrollPage(e.shiftKey ? 10000 : -10000)
						break
					default:
				}
			}
		}, false)

		document.addEventListener('keyup', function(e) {
			var elemType = e.target.nodeName.toLowerCase()
			var key = e.keyCode || e.witch
			var isInput = elemType == 'input' || elemType == 'textarea'
			if(e.shiftKey && !e.ctrlKey && !e.altKey && !isInput && !IS_OPEN ) {
				switch (key) {
					case H_KEY_CODE:
						history.go(-1)
						break
					case L_KEY_CODE:
						history.go(1)
						break
					default:
				}
			}
		}, false)

	}


	function getViewArea() {
		var winHeight = window.innerHeight
		var scrollTop = Math.max( document.documentElement.scrollTop, document.body.scrollTop )
		return {
			top : scrollTop,
			bottom : scrollTop + winHeight
		}
	}

	function scrollPage( n ) {
		var scrollTop = Math.max( document.documentElement.scrollTop, document.body.scrollTop )
		var scrollLeft = Math.max( document.documentElement.scrollLeft, document.body.scrollLeft )
		window.scrollTo(scrollLeft, scrollTop + (n * 20) )
	}


	function searchTag( q ) {
			
		var elems = []
		var viewArea = getViewArea()

		for( key in tagMap) {
			var obj = tagMap[key]
			var tag = obj.tag
			var elem = obj.elem
			var inView = obj.top > viewArea.top && obj.top < viewArea.bottom

			if( key == q ) {
				tag.classList.add( SHEACHED_TAG_CLASS )
				tag.classList.remove( MATCHED_TAG_CLASS )
				searchedElement = elem
				inView && elems.push(elem)
			} else if( key.indexOf(q) == 0 ) {
				tag.classList.add( MATCHED_TAG_CLASS )
				tag.classList.remove( SHEACHED_TAG_CLASS )
				inView && elems.push(elem)
			} else {
				tag.hidden = true
				delete tagMap[key]
			}
		}
		return elems
	}



	function emitEvent(elems) {
		if(elems.length == 1) {
			var elem = elems[0]
			if( elem.nodeName.toLowerCase() == 'a' ) {
				var target = elem.getAttribute('target')
				elem.removeAttribute('target')
				setTimeout(function() {
					elem.setAttribute('target', target)
				}, 500)
			}
			elem.focus()
			elem.click()
			clearTag()
		}
		if( elems.length == 0) {
			clearTag()
		}
	}

	//init
	function init() {
		if(inited) return
		inited = true
		insetStyle(styleText)
		bindKeyEvent()
	}

	document.addEventListener( "DOMContentLoaded", init, false )
	window.addEventListener( "load", init, false )
	if(document.readyState == 'complete') {
		init()
	}


}())