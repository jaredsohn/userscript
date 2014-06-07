// ==UserScript==
// @name            Sofiawars
// @author          Gigobyte (new version) Original by PixoiD
// @description     Sofiawars GUI+
// @namespace       *
// @version         2.3.2.1 (03.06.2011)
// @include         http://*sofiawars.com*
// @exclude         http://www.sofiawars.com/fight/*
// @run-at          document-end
// ==/UserScript==

var Notify={close:function(id){var removeDialog=function(d){Notify._v.arrDialogs=Notify._v.arrDialogs.filter(function(i){return!(new RegExp('^'+d+'$')).test(i)});if(typeof(Notify._v.dialogs[d])==='object'&&Notify._v.dialogs[d]!==null){window.removeEventListener('click',function(){Notify.close(d)},true);if(typeof(Notify._v.dialogs[d].buttons)==='object'&&Notify._v.dialogs[d].buttons!==null){for(var btn in Notify._v.dialogs[d].buttons){window.removeEventListener('click',Notify._v.dialogs[d].buttons[btn].callback,true)}}var e='div[id="GM-NotifyWrapper"] .GM-NotifyCell.'+Notify._v.dialogs[d].location;Notify.$(e).firstChild.removeChild(Notify.$('div[data-dialog="'+d+'"].GM-NotifyDialog'));Notify._v.dialogs[d]=null}};if(typeof(Notify._v.arrDialogs)!=='undefined'){if(typeof(id)==='number'){id=id.toString()}if(typeof(id)==='string'){removeDialog(id)}else{removeDialog(Notify._v.arrDialogs[Notify._v.arrDialogs.length-1])}if(Notify._v.arrDialogs.length===0){Notify.$('body').removeChild(Notify.$('#GM-NotifyWrapper'));var styles=Notify.$$('style');for(var i=0;i<styles.length;i++){if(styles[i].innerHTML.indexOf('#GM-NotifyWrapper')===0){styles[i].parentNode.removeChild(styles[i])}}Notify._v.wrapperDrawn=false}}},closeall:function(){if(typeof(Notify._v.arrDialogs)!=='undefined'){var m=Notify._v.arrDialogs.length;for(var i=0;i<m;i++){Notify.close()}}},show:function(options,id){Notify._setOptions(options);if(!id||(typeof(id)!=='number'&&typeof(id)!=='string')){id=((new Date()).getTime()).toString()+(Math.floor(Math.random()*100)).toString()}if(typeof(id)==='number'){id=id.toString()}if(typeof(Notify._v.dialogs)==='undefined'){Notify._v.dialogs={}}if(typeof(Notify._v.arrDialogs)==='undefined'){Notify._v.arrDialogs=[]}if(typeof(Notify._v.dialogs[id])==='object'&&Notify._v.dialogs[id]!==null){Notify.close(id)}Notify._v.dialogs[id]=Notify._cloneObj(Notify._options);Notify._v.arrDialogs.push(id);var html='';if(Notify._v.wrapperDrawn!==true){var wrapper=document.createElement('div');html='<div class="GM-NotifyCell top"><div class="GM-NotifyDialogWrapper"></div></div>'+'<div class="GM-NotifyCell bottom"><div class="GM-NotifyDialogWrapper"></div></div>'+'<div class="GM-NotifyCell left"><div class="GM-NotifyDialogWrapper"></div></div>'+'<div class="GM-NotifyCell right"><div class="GM-NotifyDialogWrapper"></div></div>'+'<div class="GM-NotifyCell center"><div class="GM-NotifyDialogWrapper"></div></div>'+'<div class="GM-NotifyCell top left"><div class="GM-NotifyDialogWrapper"></div></div>'+'<div class="GM-NotifyCell top right"><div class="GM-NotifyDialogWrapper"></div></div>'+'<div class="GM-NotifyCell bottom left"><div class="GM-NotifyDialogWrapper"></div></div>'+'<div class="GM-NotifyCell bottom right"><div class="GM-NotifyDialogWrapper"></div></div>';wrapper.innerHTML=html;wrapper.setAttribute('id','GM-NotifyWrapper');if(Notify._options.mask){wrapper.setAttribute('class','mask')}else{wrapper.setAttribute('class','')}Notify.$('body').appendChild(wrapper);Notify._v.wrapperDrawn=true}var dialog=document.createElement('div');html='<div class="GM-NotifyHeader">'+'<img class="GM-NotifyHeaderIcon" src="'+Notify.icons[Notify._options.type]+'"/>'+Notify._options.title;if(Notify._options.closeable){html+='<button class="GM-NotifyCloseButton" title="Close"><img src="'+Notify.icons.cross+'"/></button>'}html+='</div>'+'<div class="GM-NotifyContent">'+Notify._options.message+'</div>'+'<div class="GM-NotifyFooter">';var btn;if(typeof(Notify._options.buttons)==='object'&&Notify._options.buttons!==null){for(btn in Notify._options.buttons){html+='<button class="GM-NotifyButton-'+btn+'"';if(Notify._options.buttons[btn].hovertext!==null){html+=' title="'+Notify._options.buttons[btn].hovertext+'"'}html+='>';if(Notify._options.buttons[btn].icon){html+='<img src="'+Notify._options.buttons[btn].icon+'"/>'}html+=Notify._options.buttons[btn].text+'</button>'}}html+='</div>';dialog.innerHTML=html;dialog.setAttribute('data-dialog',id);dialog.setAttribute('class','GM-NotifyDialog');Notify.$('#GM-NotifyWrapper .GM-NotifyCell.'+Notify._options.location).firstChild.appendChild(dialog);var e;if(typeof(Notify._options.buttons)==='object'&&Notify._options.buttons!==null){for(btn in Notify._options.buttons){e='div[id="GM-NotifyWrapper"] div[data-dialog="'+id+'"].GM-NotifyDialog .GM-NotifyButton-'+btn;Notify.$(e).addEventListener('click',Notify._options.buttons[btn].callback,true)}}if(Notify._options.closeable){e='div[id="GM-NotifyWrapper"] div[data-dialog="'+id+'"].GM-NotifyDialog .GM-NotifyCloseButton';Notify.$(e).addEventListener('click',function(){Notify.close(id)},true)}Notify._setStyles()},css:null,settings:null,_setStyles:function(){var css="#GM-NotifyWrapper { visibility: hidden !important; z-index: 2147483645 !important; display: block !important; opacity: 1.0 !important; position: fixed !important; width: 100% !important; height: 100% !important; top: 0 !important; left: 0 !important; padding: 0 !important; margin: 0 !important; visibility: hidden !important; background: rgba(0, 0, 0, 0.7) !important; }"+"#GM-NotifyWrapper.mask { visibility: visible !important; }"+".GM-NotifyCell { visibility: hidden !important; float: none !important; margin: 0 !important; padding: 0 !important; background: none !important; border: none !important; width: 33.3% !important; height: 33.3% !important; position: fixed !important; top: 33.3% !important; left: 33.3% !important; display: table !important; }"+".GM-NotifyCell * { float: none !important; }"+".GM-NotifyCell.center { top: 33.3% !important; left: 33.3% !important; }"+".GM-NotifyCell.left { left: 0 !important; }"+".GM-NotifyCell.right { left: auto !important; right: 0 !important; }"+".GM-NotifyCell.top { top: 0 !important; }"+".GM-NotifyCell.bottom { top: auto !important; bottom: 0 !important; }"+".GM-NotifyDialogWrapper { padding: 5px !important; display: table-cell !important; }"+".GM-NotifyCell.center .GM-NotifyDialogWrapper { vertical-align: middle !important; }"+".GM-NotifyCell.left .GM-NotifyDialogWrapper { vertical-align: middle !important; }"+".GM-NotifyCell.right .GM-NotifyDialogWrapper { vertical-align: middle !important; }"+".GM-NotifyCell.top .GM-NotifyDialogWrapper { vertical-align: top !important; }"+".GM-NotifyCell.bottom .GM-NotifyDialogWrapper { vertical-align: bottom !important; }"+".GM-NotifyCell.left .GM-NotifyDialog { float: left !important; }"+".GM-NotifyCell.right .GM-NotifyDialog { float: right !important; }"+".GM-NotifyDialog { display: block !important; clear: both !important; margin: 0 auto !important; width: 300px !important; background: #f9f9f9 !important; border: 1px outset #555 !important; padding: 0 !important; font-family: Arial !important; font-size: 14px !important; -moz-border-radius: 5px !important; cursor: default !important; color: #333 !important; z-index: 2147483645 !important; visibility: visible !important; }"+".GM-NotifyDialog * { border: none !important; margin: 0 !important; padding: 0 !important; color: #000 !important; font-weight: normal !important; width: auto !important; max-width: none !important; text-align: left !important; letter-spacing: normal !important; text-transform: none !important; font-size: 12px !important; text-decoration: none !important; font-family: Helvetica Neue, Arial, Helvetica, sans-serif !important; line-height: 1.2em !important; }"+".GM-NotifyDialog img { vertical-align: baseline !important; display: inline !important; }"+".GM-NotifyHeader { font-size: 13px !important; font-weight: bold !important; padding: .5em !important; color: #fff !important; border-bottom: 1px solid #333 !important; background-color: #999 !important; -moz-border-radius: 3px 3px 0 0 !important; }"+".GM-NotifyHeaderIcon { margin: 0 0.3em -0.3em -0.2em !important; }"+".GM-NotifyCloseButton { float: right !important; cursor: pointer !important; padding: 0 22px 2px 0 !important; height: 23px !important; width: 23px !important; margin: -.25em !important; background: #eee !important; -moz-border-radius: 3px !important; border: 2px groove #666 !important; }"+".GM-NotifyCloseButton:hover { background-color: #f9f9f9 !important; }"+".GM-NotifyContent { padding: 1em 1em 0 1em !important; }"+".GM-NotifyFooter { text-align: right !important; padding: 1em !important; }"+".GM-NotifyFooter button { height: 27px !important; border: 1px outset #666 !important; padding: 3px 5px 5px 5px !important; background: #eee !important; -moz-border-radius: 3px !important; cursor: pointer !important; margin-left: .5em !important; }"+".GM-NotifyFooter button:hover { background-color: #f9f9f9 !important; }"+".GM-NotifyFooter button img { margin: -0.3em 0.2em -0.3em -0.2em !important; }";var styles=Notify.$$('style');var num=-1;for(var i=0;i<styles.length;i++){if(styles[i].innerHTML.indexOf(css)===0){num=i;if(typeof(Notify.css)==='string'){if(styles[i].innerHTML.indexOf("\n/*GM_NotifyUserDefinedStyle*/\n"+Notify.css)===-1){styles[i].innerHTML=styles[i].innerHTML+"\n/*GM_NotifyUserDefinedStyle*/\n"+Notify.css}}}}if(num===-1){if(typeof(Notify.css)==='string'){css+="\n/*GM_NotifyUserDefinedStyle*/\n"+Notify.css}GM_addStyle(css)}},_setOptions:function(obj){Notify._options=Notify._cloneObj(Notify._defaults);if(typeof(Notify.settings)==='object'&&Notify.settings!==null){for(var s in Notify.settings){if(typeof(Notify._defaults[s])!=='undefined'){Notify._options[s]=Notify.settings[s]}}}if(typeof(obj)==='string'){Notify._options.message=obj}else{if(typeof(obj)==='object'&&obj!==null){for(var o in obj){if(typeof(Notify._defaults[o])!=='undefined'){Notify._options[o]=obj[o]}}}}if(typeof(Notify._options.mask)!=='boolean'){if(typeof(Notify.settings.mask)!=='boolean'){Notify._options.mask=Notify._defaults.mask}else{Notify._options.mask=Notify.settings.mask}}if(typeof(Notify._options.closeable)!=='boolean'){if(typeof(Notify.settings.closeable)!=='boolean'){Notify._options.closeable=Notify._defaults.closeable}else{Notify._options.closeable=Notify.settings.closeable}}if(typeof(Notify._options.message)!=='string'){if(typeof(Notify.settings.message)!=='string'){Notify._options.message=Notify._defaults.message}else{Notify._options.message=Notify.settings.message}}if(typeof(Notify._options.title)!=='string'){if(typeof(Notify.settings.title)!=='string'){Notify._options.title=Notify._defaults.title}else{Notify._options.title=Notify.settings.title}}var match;match=/^center|top|bottom|left|right|top-left|top-right|bottom-left|bottom-right$/;if(!match.test(Notify._options.location)){if(!match.test(Notify.settings.location)){Notify._options.location=Notify._defaults.location}else{Notify._options.location=Notify.settings.location}}Notify._options.location=Notify._options.location.replace('-','.');match=/^notice|warning|error$/;if(!match.test(Notify._options.type)){if(!match.test(Notify.settings.type)){Notify._options.type=Notify._defaults.type}else{Notify._options.type=Notify.settings.type}}if(typeof(Notify._options.buttons)==='object'&&Notify._options.buttons!==null){for(var b in Notify._options.buttons){if(typeof(Notify._options.buttons[b].callback)!=='function'){Notify._options.buttons[b]=null;continue}if(typeof(Notify._options.buttons[b].text)!=='string'){Notify._options.buttons[b].text=''}if(typeof(Notify._options.buttons[b].icon)!=='string'){Notify._options.buttons[b].icon=null}if(typeof(Notify._options.buttons[b].hovertext)!=='string'){Notify._options.buttons[b].hovertext=null}}}},_options:{},_v:{},_defaults:{mask:false,closeable:true,message:'',title:'Greasemonkey Script Notification',location:'bottom-right',type:'notice',buttons:null},icons:{check:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFzSURBVHjarFO9bsJADDZVX6BsLOwwMLEwIOUGxMCSJVIlFl6hEx0qQaUOZerSqUsfIEsGCEKRyD0FLJnIgJSBKhPiT/Q+l1wpBVUtPcmxz/b32dY5qe12S+ec1L8QVOzKb3EGxLO89sUfigLsK2nhconPZrOh4fXwaHbnraPtwWDA4Gq1Cpt93MF6vf6xbK/XM1Qeg5GfYJhgtVq1S68l4xTYcRxD5fi1Wo3m8znyWfYJWkgovhS/kdi2zWDTNCmOY1oul9TtdoERmgBOy7Kg/cJzQZPAhg+xKIposVgwWPmEErnfAYVhSPV6Hbafe8oZENjwIQaw67pcWfnklxHQARKCIKBGo8GdQGDDh1i/3+fK45uxbF41GaMXKfuQ5ecRgseifD7PejQasfZ9PDuJyd1EJuMpDKn7B0GmldELkpAkJwGrIw/90/vp5x6Uy2WptPA8T7/zzha7GB2KHiF9mz62qlxZiTy1H7PH2fl/47sAAwBiEwtZ3OydtgAAAABJRU5ErkJggg==",cross:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHMSURBVHjapFO/S0JRFP4UIUJIqMWgLQzalAyKIN4TxNXJoZaGIPwHXNMt/A+C1pZabKgQQd9kQ4pS0KBUi4MNNgT+ev54nXPeVTRoqQvfu+ee7zvnnnPvfQ7LsvCf4ZLvSZi/ScIpQScYv+g1QoGQEv15zk4wHo0k2BmJYJzNskB3XuTnkoyPQxKsNLwRnJTEycZwOJRgDAbgmdYF82hfmwSzzb4fGkni4DPoHu5K9sVw2I5wu9HNZKDagXDRKNBuy6Kbywm3ePlgSAUD0zQI+tftLdDrAa0WOIB8BYYEk4851rCWY1Qb1IJpYum6bNCsf97f0xZdoNHAUiwmYJt9zLFGaTFNMOj3ZbF882yQrX9ks0CnA9RqNshmH3OsmY1xqRampz21PR6g2bRtr3dOM6ubq+B9b1Uju7AWjwNvb3YVDLLZxxxrZmPkFurbK9NH4kskgHxeyHqpJLMvGLS3DYVQT6cnt2P4HluY3ILGpy3Bd3dy2i/F4uS0dbbldohjjbod+51wBU+bC5Z1dWZZBzsCXhM05hSviUbxrJU1cdJCZcMlTzng96NSrUqJZM89ZfJLizOaVKA2TEqC8rrjTz/T1quq4D/jW4ABAF7lQOO4C9PnAAAAAElFTkSuQmCC",download:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAExSURBVHjapFM7boRADB2i8CmoaOj2EjR0DBJXYC/BBVJEykZKkYqOSyxHAAkOQElNsR0NNIhvQcbWgiYJkCix9DQP22M9bI8wzzP5jwl8gXN85mMJA73zlMFeAlfnuiY98DemaSKGYSAYpzv8k4JH/mMYhjXhiO8W6Pt+TTjiuwW6rkP8xHcLtG27JhzxIwWXKIpeeEXLyfzLuF4ZLptjPL2d4Jg9zyNlWSLAdF1HBEGAd27Pt+0xQqNM0xR83yd5nmPnAcDBB7GvU/i2B2CWZQlZlpG6rhHAwcfnbPaAN8dxhDiOkzu3f7vKiSiKVFEUIssykSQJ/eM44u/BDjAFKVtle1NBURTUdd3DxxOGId1VoD1piaqqVNM0AmAc/U3TkKqqEIyn1Xtlbxb4i30IMAAneulYPSbkAwAAAABJRU5ErkJggg==",plus:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEVSURBVHjarFM7boQwEDVSgIJuqWlouAGiQl5pT0CxZ8kRcpYtOEGkBURFTwsN9dJAwU+OZzY49ipuQkYaNMwbP88b2wZjjByxN/hcP6+/YXfu9DvOuJ9fC26X25Ng2zYShqECVlVF95wcS/hPB+u6Iolsck6HC4JlWURiNzmnwwXBPM8isZuc0+Eywb0sS2pZFgE3TZO4risWQVzXNYN/WAjOJeFgkWCaJpokibLDOI5kGAaMgyAgjuMoeJqmVJHQdZ32rPu+R9dK4B1keZ5TaB0k2LaNMnzfx6KmaVAOrxPz4EPN5A7OURQpOxRFwTzPw7htWxLHsfGC/+MpHL4HR26iAa/x9H7602N6fDyeBEfsS4ABAL8Y9kkNjy+sAAAAAElFTkSuQmCC",minus:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACcSURBVHjaYvz//z8DJYBx1ABqGZDuup+BhcWBgY2NgYGdHYJBbBYWiKo/fxgYfv1iYPj5E4JB7D9/DjDM3O0IVvHxzRsH/ogIkmz+uGKFAz+QBhvw+skTBv6zZ0kyAKwH5oWzyoz7mVlZHVg5OBjAmJOTgQXoDRaQN0A+ADr5D9Dpv79/Z/j94wcY//39+4Dx3f+Oo+lgMBgAEGAAPeleY+UmmgEAAAAASUVORK5CYII=",refresh:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArlJREFUeNqkU89PE1EQnu1uodtCJW0p0iIEERSBaCwarcF4USOEaDAxSnrxRLwZ/wAPTbgZDyb+B6ZeDB7QRI2JIUQu2MBBjXGhWNqlQH8tm2739z5nG6DglU2+3bfzZr6Z+eY9ihACR3kY+3Xp5SowTicwDAMOmg5RFDWB5iiib9fvD2IBk81YlrVB03QM/0e+PgpOMf8RjjM0iZ864Q50tLp8Xjfjto1i1ejP5pURLi3dswhZMA3j1l6AYz+UkHG2EabvXgue7/S5OigD3LJsgqpaWCbl7vK7OsauBK4bGBwbC0XwW2+BWFaIpqz4WLRtaHtDBlkzlJWcxGfzVcHe7w57Wi72+3uKeQUe3AxHdsoa6JpWr8DQtImeMBvIZUQolivKl8XszzQvPEPiYV1RhrlU6WPiA5cMtrOQ5kpg6AYYqlon0FT1asDr9O2Uq/ArVeSR/QUKlpBE0d6LIS4/jg1ExLIMLX4XuFjGttdbwCy9NEW5JUUHfksQcBIJU9cBFbe1GbFH/fzVQvKg2jip5D6BzSapBkimVVtbpgmmaUCji7XHO2UT2T1jUGT4XFfz8bYmMvvpR7regqJwW4JSlRwMeI+xLajJpCYrUNrehnKhADsIrPJCU1PDDfQZzOQrrbqqOvcJ8OfbWqZQEplGaD/dGcZsT7Hsyd097IKMou1+6ExXO/pQ69mihvZKnUDTZtZ+/y1YHhaytMc1OBodCHa2xnEK3xFzuH4yeDt6lnc2E9tnnctIGFOsaWEL5I29sfsepz3uaf+d0SHZIOBxUuBtqPGLombxkk5SLEOtFN+9XzJl5TMKnRNfPwSmfhDJrFIWgE+8jTv7egOVk92+nM9fO8qOkqCS1ZRY4rhN0PR5FDZ36DIdJLGq1aSxtDwBS8t7l0lCLCLmcArzmFk4NM6jXud/AgwAHI+A9u0hVBUAAAAASUVORK5CYII=",save:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFmSURBVHjapFMxS8NAGH0laaKxIbUQuhVcXC3EwbEdXN1dHPUvuPoz9A+46ZK93RSaQqYuboIgOKTlatIkl9a7KxeIqSXYg+8+uHvv3fu+u6utVivsMlQ+3TyMB4qi9M5OuzjQAJMFz3vqGrSgwHcCkGSdXz0fWZYN76+dvoAsl8ue4zi4Oql26oJ2MRqNerkDSilXRJwplQQ4lnNyAbkQJtUE5IG5QJqmIsJUryQg8YUS+MLbJ0HHNreS378Iw9JiCZycJAmeXj4Qx/FWAV3XYdt20YG01Gw2/1eCdMDHpWOic6huth9QPI5JLlLqQRiGaBsGzm+fxaZ7d1EQaBvAbDaDwTClHvAIgoCJWLAsS2xywd+DY+r1etGBfAfT6VSQeJP+EuCYVqtVfAeM3Pc8b6BpmrgF6WDTjczn8/JLZH9hyFKfxcB1XRw3GjBNE5PJvgBFUQRCiCADR/B9X3JQ2/U7/wgwAKdW7Y3bu9H7AAAAAElFTkSuQmCC",settings:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVHjapFO5iiJRFL3l1iIq7hi4NIgKIjSCiqCgDYbm/oCYGhqq/2Bi2KGZgaHgDAqtKEhj5pooiLuRuE+dh8oMMx3Ng1t16t5zXt165xZXKBTom5XlI3PHufvzX0twvV4pGo0Sf8/yUQW+P2e+wVVw75i4fD7/fJvP56PhcEgajYbUajVptVq63W60Xq9ps9mwu81mo1ar9exKdLlc8BD2er2k0+lIqVQy4mKxYBgLGBtarVaSSCTk8Xio3W6H2Sdgg1gs9t7v92m/35NAIGBku91OYrGYBTByqIEDLjTQis7nM3uLQqGg+XxOer2eXl5eqNFoUL1eZ7VQKESBQIAOhwPrBlwsaAX8JVssFm9IoigUCtEe4kc6neYQwMih9tgAGmixQSYej5PRaCSz2UwikYi63S6lUqn3h1XAyKEGDrjQQCs6nU40mUz+8PbR4r9y4MMRBLAwGAxyg8EgghOfTqdkMBhILpfT5+dnxOFwfEBULperbrf7VSqVsu5weLVaDXOQY2eQSCS45XLJhLvdjtnlcrkilUrlhgBGDjVwwIUG2qcLOByTycQcmM1mzDZMGxbaRU4mk7ENYOPDBaHf76dms1l1Op2vGKbRaMTIvV6Pjscjs/br64tZiNb5T6HtdkulUinCT+nHYxJ/8jZFgMfjMXu7SqWi32dktVoRf1as/U6nwzTPSQyHw1n+noPfb29vnMVigffsZ0EAI4caOODeNcQlk8n/+p1/CTAASVxppUgA6l4AAAAASUVORK5CYII=",notice:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiFJREFUeNqkUz9o1FAc/t5L0rs0KUGLi4iDSwdxFwdpXKyCa1EQBAftoZMOKi2KcA6CVYQWEYcucpUuBbtZuEUrtCAUHHouVrBC6clJrneX5JL34nuvudwdtFMf/PJevnzf719+jyRJgsMsXT3OLAFEA6gwQscFdPsA/lskfAGcAQlD/P3KnoOeNS4IE88mL7q1mp9CCWSSjmPiyfNPJAUX+jLIxJxNFKcuuxsb2wrwPE/tjuNgZ6eOqXsX3OKLZfQ6od3IrPD00Zi7vv4LQRCgWq1icXpEmTxLrFL5g/t3zruSqzSZA84Kjx+Mja6t/YDv+8ra7XaWmjx38ErlN27dODsqNVkJCYvJ5uY2wjDMRJxzjFxaBGMcuqGDxUzhmq6h9u+v0nR7wGMSRZEgi84KoldvoNlsolQ8CUIIrk5ugeq5tKVAqxUpTa8DJfTDGN5uIKITUCOnxKZpQhvIg1Ijyy4hhtJ0HYh0Gi2OZlsTZAuaggIltm0b+sCgSD2fOSAaUZq+EvS8DSPX/adRSJXYsizRg0HxzeqfmLQEmmYwu/T+48rw8FFBHFImo0qxLEOeO7i0b8vlFalR2ci7oJ14I51cE1N4171+81wU792P3epPtQ8dO5UF/vJh7qsY9xlR0zzbKmSDJDrD55OgPlt+93JVN0xIO3L8tLLO++e5V6uSI7n7jbJ0UkqCBi2/fqjte5VEZJK3S33QYa/zfwEGANxO+apCxsozAAAAAElFTkSuQmCC",warning:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlpJREFUeNpsU89rE0EU/mY2xqonsejBgwcRDyJGUqTeLAVLUxttEtGD1B+0f4V48ebFk5dgUai1tE0C0cT+MCm0BgKhteRiWq3oodAmIUXT1DWb7Ow6M8vGkObBx+yb977vvX2PIeA2codg5C5AKUCIBW6DHMOwbJwjZpqAgGEAY1Mc0yZIKkSgUIvcJCDJ7huZAEwDnz9cDQsRTo7ZAgKMg+KgeXnSffdAOsBK82C7H+H2LAXEnYi1JtO2ZM+yXyvEoeuahFbkIn2z/nYizQI3eVsP3P0Jn7rzjhOrePK8JiG+1WISl3unfCJH5LYKSHJXf3xofzsKxjSJcrksYftqKQXXteBQs4gY4i1+Puz2RLz7hYVGO3VWx/Xba8jn80jGXTAYsyoqCo53uvBj5dl77r52GAyPugfeDlby8zJBN+r4re1Crf9BNpu1xBQNUCxhBh3FXxmcujTs3VkbJw6+CmrqqgyqOm9ZK4CZTK7UNoXqB1ZlGHtijZTyzl6l4qNz5NhpVGpboETDIU4QKBWeSti+jQ7nEWytROcElyTeED4g+Lno6MWee33q/nqjyrkLq/Lc/NL1f230MDYzaTGsl3wcEbvRCBcZyyYnEkc7OhuVbLN9J2XYSKcTIldwRMzR9FthHiCriwv0Sk9Xr2GoqJQey8DeblSeq8u5RWJVDjfmM+wjaDwSE7lq1dR+fts+efb8iTP1ag4ClBhYml3/xAsEHQ4yQ5veDj04XUyrfxGMhTYyCmEQiIW+ZsSdiLXmO9o8JtHNZK0GOjPx3Y6/cDox2S73nwADAOk2P6jHeNmxAAAAAElFTkSuQmCC",error:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjRJREFUeNqkU81u2kAQHmxjvEagxC1VhVQOQFQ5qpA4VWpVyScuUS/03JfgCfIEnPoGvaNKkZJrL/05pKccrChBRC0kgAwY29jG+KezJiCHqqdY+uzZmf2+mdkdp6Iogsc8HH19TqWAxS9FCqCIaKL5BlG63/cb8R1TdRC3AS4oPmJybkfwfZqQVrlWqxYPDiSSzwu0Qscw6rdXV+96FxcfPMdp476TBxVsyGRv7/j10ZEccRxZ+j7c9XpxQJIk8bksi4Vy+cn52dnxYj6HjQhDX1hWkRWEVr3RkOe2TXRdh8FgALXT0xjUpj7LdckrRZGZTKZFOVsB7KdZOjyszkyTzFHdNE2wbXtbGrWpzzAMMFHkWaVSDdbntG7BB3ibKxQkbTrdkizLgtFoFJNusJUwCNY9cxw83d+XKAeXnzYCL0KGEXzsO1itwJzNwF4soN/vQzqdBgb97EYZ465tC5STrAB8DHi0dKwiwmxp9FFyNpsFfue0WdzrJ29hBfDHHI/rkaaJJDFYqqLE3/zOXa88z6Wc7SGi2rfxcDjJYX8irsX1QIGiqtDodmNbTMBwnCnlJAU6N5NJFxjGEXEq6aYMguf5OGMmQQ7D0Bkul9eUsxUIcTwXQdD+oWkqBhyCIgX0/6xUYlCbIDwkn1uWaodhm3IeTCI6Tu7wtL/oekvm+epLnpdKLCvQmB4E7qXnTVXPu14hOf+fUY5FtDD89dV1m4h/fia8yk7uPvPmST32d/4rwADXYRP4WSwJ+gAAAABJRU5ErkJggg=="},$:function(query){return document.querySelector(query)},$$:function(query){return document.querySelectorAll(query)},_cloneObj:function(obj){var c={};for(var i in obj){if(typeof(obj[i])==="object"){c[i]=Notify._cloneObj(obj[i])}else{c[i]=obj[i]}}return c}};


var SUC_script_num = 99665;
try {
	function updateCheck(forced) {
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) {
			try {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp) {
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1){
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version){
								if(confirm('Новая версия "'+script_name+'."\n Хочешь установить?')) {
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							} else if (forced)
								alert('Нова верия "'+script_name+'." още е в разработка');
						} else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			} catch (err) {
				if (forced)
					alert('Някакви глупости:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Sofiawars') + ' - Обнови скрипта', function() {
		updateCheck(true);
	});

	updateCheck(false);
} catch(err){}


$Settings = {
		settings: {},
		
		init: function(){
			var self = this;
			var today = new Date();
			var default_settings = {
					petric: 0,
					last_petric: 0
			};
			self.settings = self.jsonParse(localStorage.getItem('settings'));
			self.settings = self.settings ? self.settings : default_settings;
			self.save();
		},

		save: function(){
			var self = this;
			localStorage.setItem('settings', self.jsonStringify(self.settings));
		},
		
		get: function(name){
			var self = this;
			var value = self.settings[name];
			if ( value == null ) {
				value = null;
			}
			return value;
		},
		
		set: function(name, value){
			var self = this;
			self.settings[name] = value;
			self.save();
		},
		
		jsonParse: function( valueToParse ){
			if ( typeof JSON.parse !== "undefined" ){
				return JSON.parse( valueToParse );
			} else {
				return JSON.decode( valueToParse );
			}
		},
		
		jsonStringify: function( valueToStringify ){
			if ( typeof JSON.stringify !== "undefined" ){
				return JSON.stringify( valueToStringify );
			} else {
				return JSON.encode( valueToStringify );
			}
		},
		
		setInput: function(name){
			if($Settings.get(name) == 1){
				$("#"+name).attr("checked", "checked");
			} else {
				$("#"+name).removeAttr("checked");
			}
		},
		
		getDataInput: function(name){
			if($("#"+name).is(':checked')){
				$Settings.set(name, 1);
			} else {
				$Settings.set(name, 0);
			}
		},
		
		openDialog: function(){
			Notify.show([], 'my_dialog');
			this.setInput('petric');
		}
	};

$Settings.init();

GM_registerMenuCommand(GM_getValue('SUC_target_script_settings', 'Настройки'), function() {
	$Settings.openDialog();
});

var messages = "<label>Преработка lelemale: <input type='checkbox' name='petric' id='petric'/></label>";
Notify.settings = {
    mask: true,
    closeable: true,
    title: 'Настройки',
    location: 'center',
    type: 'warning',
    message: messages,
    buttons: {
    	my_button: {
    		callback: function () { 
    			$Settings.getDataInput('petric');
    			Notify.close('my_dialog'); 
    			window.reload();
    		},
    		text: 'Запази',
    		hovertext: '...'
    	}
    }
};

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery;}
}
GM_wait();

function myfunc(){
musicURL =  "data:audio/x-wav;base64,UklGRiRaAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YQBaAAB/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+AgICAgICAgICAgICAgICAgH9/gICAgICAgICAgIB/gICAgICAgICAgICAgICAgYGBgICAgICAgIB/gIB/f39/f39/f39/f39/fn9+fn5+fn5+fX59fn5+fn5+fn5/f39/f39/f39/f4CAgYGBgYGBgICBgYGDeYl8foF6hIh9eHhnkoKVd2Z/cZt+hnNygHOVfYt0cYJ+i4d2f3SDioh+c4FwmHOKcniDeZJujWiJe4SDd4JziXqIfX96goKBgX2BfH6ChniLd3WPb4N1iHuMZop8gpBsh2uFg4OFdXh0fYZ9i2Z9cn+Ih3OEepd1o3Jve2yig5Fib3+BnHGPYnaHiZOCfXR9fZWHg3V2eoyHmG1+c4eNi4V2e36JjId4gXGUfpN6fnp6j3ySbYpui3+GhHSHcI13ineDeYCDfYh6hXaFeoJ+gH99gXuCe4N8f3t8fX9/fHt4fXyBfHx5fH2Af317e35/g3+AfICAg4KAf32Af4N/gH6BgIGBgIB/gICBfn9+f4CBgIB/f39/gICAf4B/gICAgIB/gIB/gH+Af3+AgH+Af39/gICAgH9/gICAgICAgICAgICAgICAgICAgICAf4CAgICAgIB/gICAgICAgICAgICAgICAgICAgICAf4CAgICAgICAgICAgICAgICAf4CAgICAf4CAf4B/gICAgICAf4B/gICAgICAgIB/gH+AgICAf4CAgH+Af4CAgICAgH+AgIB/gIB/gICAgIB/gIB/gIB/gH+AgIB/gH+AgH9/gICAgH+AgICAf3+AgH+AgH+Af4CAgH9/f3+AgIB/f4B/f39/f4B/f4CAf39/gICAf39/f39/f4B/f4B/f39/f3+AgH9/f39/f4B/f39/gH9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/gICAgH+AgICAgICAgICAgIB/gH+AgIB/gICAgICAgICAgICAgICAgICAgICAgIGBgYCAgICAgICAf4CAf39/f39/f39/f39/f39/fn5+fn5+fn19fn5+fn5+fn5/f39/f39/f39/f3+AgIGAgYGBgYCAgYGBhHmGf311iXuRe4FweIiJkWhzb4mNhoVtd3WLhIh6dXh6i4aGdHx1i4mFd3l6gop5hmyEdox/e39xiXmMdYRzgoCBhnuAeYd8hXyBfnyAhIx3gISDfYVzlIJujmOFhX2Mc3d6fo17gnR6dXyRdohlfYB8j3t3aniVeZNycICFnJOJVIZvm5R/hV2Gc518iGl8doyTgn5ue4GJjoR2eHiLi4t2gHCMf5d3f3t5k3+Yb4pwjoGKg3aEc493j3SCeHuFfIV4hXaIe4d/gIB7hHmFe4N7gX19gXuEe396fX5/fnx6eXx+gHx8eX1+gX59en1+gYJ/f32BgYOBgH5/gIGCf4B/gYCCgIB/f4CAgH5+foCAgIB/f3+AgICAgH+AgICAgIB/gH9/gIB/gH9/gICAgH9/f4CAgIB/f4CAgICAgICAf4CAgICAgICAgICAgICAgICAgICAgICAgICAf4CAgICAgICAgICAgICAgICAf4CAgICAgH+AgICAgICAgICAgH+AgICAgICAgICAgICAgICAf4CAgIB/gICAgICAgICAgICAgICAgICAf4B/gICAgIB/gH+AgICAgH+AgICAf4CAgICAf4CAf4CAgIB/gICAgIB/f4CAgICAgIB/gICAf39/f3+AgH9/gH9/gH9/f39/gH+Af4CAf4CAf3+Af4B/gIB/f3+AgH9/f4B/f4B/f39/gICAf39/f4B/f39/f4B/f39/f3+AgH9/f39/f39/gH9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/f39/f4B/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/gIB/gICAgICAgICAgICAgIB/gH+AgICAgIB/gICAf4CAgICAgICAgICAgICAgIGBgYCAgICAgICAf4CAf39/f39/f39/f39/f39/fn5+fn5+fn19fn1+fn5+fn5+f39/f39/f39/gH+AgIGAgYGBgYCAgYGBhHiJfnx3hnyQe4BycYuHk2xvc4SShIVtdXeDiIV+dXZ9iYeGc350iomFeXd9fY92iWyBeIeEdoNti3mLeIF3foJ/h3uAeId9hX2Afnx/hIx2hYB8hIF1joNwkWGJg3yQb312gIx8g3N5dHyPdoxjfnt6jH90bXeUc5ltbIB/oZCNVYBylpl5iV+Ed5qCiGx6eIqUgn9veX6Ki4lyeXWKi4t6fnKJgZV7fn52lX2ZcIhyiYSHh3KGb5B4jXh/fXiIeYh3hXaHfYWBfoJ5hXmFe4N7gH58gXuEe4B6fX5/f3x6eX1+gHx8eX1+gX59en1+gIN/f3yBgYOBgH5+gIGCf4B+gYCCgIB/f4CAgX5/foCAgYCAf39/f4CAgH+Af4CAgICAgIB/gIB/gH9/gICAf39/f4B/gIB/f4CAgICAgICAgICAgICAgH+AgICAgICAgICAgH+AgICAgICAgICAf4B/gICAgICAgICAgICAgICAgICAgICAgIB/gIB/gH+AgICAgH+AgICAgICAgH+AgICAgICAgICAgH+AgIB/gICAgICAgICAgICAgICAf4CAf4B/gICAgH9/f4CAgIB/f4B/gIB/f3+AgH+AgH+AgH+AgH9/gH+AgH+Af4B/f39/f39/f4B/f39/f4CAf39/f39/f39/f4B/f39/f39/gIB/f39/f39/f39/f39/f39/f3+Af39/f39/f3+Af39/f39/f39/f39/f39/f39/f4B/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+Af39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/gH+Af3+AgICAgH+AgICAgIB/gICAf4CAgICAgICAgICAf4CAgH+AgICAgICAgICAgIGBgYCAgICAgICAgH+Af39/f39/f39/f39/f35/f35+fn5+fn1+fX5+fn5+fn5+f39/f39/f39/f4CAgICBgIGBgYCAgIGBgX+Cf4CCc4l8iXh9aImBjoVjf2mXgId+bn9ul3yPdHKBeI+Gf3l3eouJgnN+cZJ7g3xviHKVcYlwgIN9i3KIbol7hoF8fnyHfYV7gX19goOCgHeEkGqPcJSBd3lzfIqHe4FphHyJf313d3qAi395cnaIhZBziHCNj5OFfXdwkomSdVqKcJ+BjW9hinefeIhsf3SRjoJ5cn2JhpdzfnOAjoqLc4FxjoKTc4FziYmIjHOGcZN6k3WDd36Je45wiXCIfIV+fYB5iHqLeoR5gX99g32De4N7gH6AgH19en1/f317eHt8gX58enp+foB+fHp+foKAgH1+gYKDgH99gH+CgYB/gIGBgYCAfoCAgH9/fn+AgYB/f39/gIB/gIB/f4CAgICAf4CAf4B/gH9/gICAgH9/f4CAf4B/f4CAgICAgICAgICAgICAf4CAf4CAgICAgICAgICAgIB/gICAgICAgICAgIB/gICAgICAf4CAgICAgICAgICAgICAgICAf4B/gICAgIB/gICAgICAgICAgIB/gICAgICAgICAgH+AgICAgIB/gH+Af4CAgH+AgH+Af4CAgIB/gICAf4CAgICAf4CAgICAgICAf39/gICAgH+AgH+AgIB/f4CAgICAgIB/gIB/f39/gH9/gIB/gH9/gICAf4CAgH+Af4CAf4CAf3+Af4CAgIB/f4CAgICAgH9/gICAf39/gICAf39/gIB/f39/gH9/f39/f3+AgIB/f3+Af39/f39/f4CAf39/f39/f39/f39/f4CAf39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/gICAgICAgICAgH+Af4CAgICAgICAgICAgICAgICAgICAgICAgICAgICBgICAgICAgICAgICAf39/f39/f39/f39/f35/f35+fn5+fX1+fX5+fn5+fn5+f39/f39/f39/f39/gICBgIGBgYCAgIGBgYF/gYCBcop6jXl/a4SCi4lke2mTg4eBbn1vlH2NdXN+eI+GgXd4d4uJg3R8dI6AgYBuh3OTdIV0eoV7jHKIboh8hYN8f3qHfIZ7gX19goSGfHmHjm+NcZeBcoJtfomDgXxsgXyLfX93eHl/j3p+bXiHg5J0g2yFlIqIfHZ3j4+TfFeLb6CIi3VeiXKgd4lpf3SQkIJ6cX2Hh5R4fXV+jYqMc4Jwj4CWc4F1g4yFkXCIcJN8kXl/e3qMeY9xh3KEfoGAe4J3iXqKe4N8gIF8hHyDeoN7f39+gnx+en1/f317eXt8gH58e3p+foB+fHp9foKBgH5+gYGDgYB9gH+CgX9/f4GAgoCAfn+AgIB+fn6AgICAf39/f4CAgICAgICAgICAf4CAf4CAf39/f4CAgIB/f4CAf4B/f4CAgICAgICAgH+AgICAgICAgH+AgIB/gICAgH+AgICAgICAgICAgICAf4B/gICAgICAgIB/gICAf4B/gICAgICAgICAgIB/gH+AgICAf4CAgICAgICAgICAgICAf4CAgH9/gICAgIB/gIB/gIB/f4CAgIB/f3+AgH+AgIB/f39/gH+Af3+Af4CAf4CAf3+Af4B/f4CAf3+Af4B/f4CAf39/gIB/f39/f39/f39/f39/f4B/f39/gH9/f39/f39/f39/f4B/f39/f4B/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4CAf4CAgICAgICAgICAgICAf4CAgICAgH+AgICAgH+AgICAgICAgICAgICAgICBgYGAgICAgICAgH+AgH9/f39/f39/f39/f39/f35+fn5+fn59fn1+fn5+fn5+fn9/f39/f39/f39/gICBgYGBgYGAgIGBgYN5iXx+gnqEh353eGeSgpV4Zn9wm36GdHKAcpZ9i3Rwg32Lh3Z+dIOKiH5zgXCYc4pyeIN5km2NaIl8hIN3gnKJeoh9f3qBgoGBfYB8foKGeIt2dY9ug3WJe4tniXyDj2yHa4WDg4V1eHR9h36LZ31yfoiHdIV6l3ejdHB7bKGDkWNtf3+ccY9idYeJlIN/dH19lYeDdXZ6jIeZbX9zho2LhHZ7fYiLh3eCcZR+lHt+e3qPfJJtim6Kf4WEdIdwjXeKeIN6gIR9iHqFdoV6gn6Af3yBe4J7g31/e319f399e3h9fIF8fHl8fYB/fnt7fn+Df4B8gICDgoB/fYGAg3+AfoCAgYGAf3+AgIF+f35/gIGAgH9/f3+AgIB/f4CAgICAgH+AgICAf4B/f4CAgIB/f3+Af4CAf3+AgICAgH+AgICAgICAgICAgICAgH+AgICAgICAgH+AgICAgICAgICAgIB/gICAgICAgICAgICAgICAgICAgICAgICAgICAf39/gICAgICAgIB/gICAgH+AgICAgICAgICAgICAgICAgH+Af4CAgH+Af4CAgICAgICAgICAgICAgICAf4CAf4CAgICAf3+AgICAf39/gH+AgH+AgH+AgH9/f3+AgICAgICAf4CAf4B/gH+Af4B/gIB/f4B/f4B/f4B/f39/gIB/f39/f4CAf39/gH+AgH+Af3+AgH+Af39/f3+Af39/f4CAf39/f4B/gH9/f39/gH9/f39/f39/f39/gH9/gH9/f39/gH9/f39/f39/f3+Af39/f39/gH9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+Af39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/gH+Af3+AgICAgICAgICAgICAf3+Af4CAgICAgICAgICAgICAgICAgICAgICAgICBgYGAgICAgICAgH+AgH9/f39/f39/f39/f39+f35+fn5+fn59fn1+fn5+fn5+fn9/f39/f39/f39/gICBgYCBgYGAgIGBgYJ7h3x/g3eGg4F2eWeQgJN8ZIFtm36GdnGBb5h8jnNwg3uNh3l9dYCKiX9ygXCYdYh1dIV1lG2Naod+god1hXCKeoh+fnt/hH+CfIF8foKFe4l2eZFrinKMfoVrg3uGjW+HaYZ/hYN4d3R8hIOIbXpyg4iJc4l5l4CgenZ5ap2DkWlnhHmddI9kboqDmX+Ecn55lImDd3V7i4aabX9zhY6Kh3R+eIuIjHWCcZGAkIB6fnaRepNuiXGGg4OIcolvjHeJeYF8fYV7iXmGd4R7gYB/gXyCeoJ7gn5+fHx9f399e3h8fIF9fHl7fX9/fnt7fn+Df4B8gICCgoB/fYB/g4CAfoCAgYGAgH6AgIF/f35/gIGAf39/f4CAf4CAf4CAgICAgH+AgICAf4B/f4CAgIB/f3+AgICAf3+AgICAgH+AgICAgICAgICAgICAgICAgICAf4CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAf4CAgICAgICAgH+AgICAgICAgICAgICAgH+AgICAgICAgICAgICAgH+AgICAf4B/gIB/gH+AgICAgICAgICAgICAgH+AgICAgH+AgICAgH+Af4CAgICAf4CAf4B/gICAgICAf4B/gH+AgH+AgIB/gH+AgIB/gH+Af3+AgH9/gH+Af4CAf3+Af3+Af39/f4B/f3+Af4B/gIB/f39/f4CAf4B/gH9/f4B/f4B/gIB/f39/gH9/f39/f39/gH9/f4B/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/gH9/f39/gICAgICAgICAgICAgH+AgICAgIB/gH+AgICAgICAf4CAgICAgICAgICAgYCBgICAgIB/gIB/gIB/f39/f39/f39/f39/f39+fn5+fn5+fX5+fn5+fn5+fn5/f39/f39/f3+Af4CAgYCBgYGBgICBgYGEeIh+fHiGfZB7f3NyjIeUbG90g5KEhW51eISJhX91dX2Ih4dzfnSKiYZ5dn18j3aIbIF5h4V2hW2LeYt4gXZ9g3+He4B4hn2EfYB/fH+EjHaGgHuFf3WMg3CSYYmCfJBvfnaAjHyDc3l0fI92jGN+enqMgHRvd5Rzmm5rgH+hj41WgXOWmXmKX4R3mYGIa3p4ipSCf295fYqLiXJ6dYqLi3p9comBlXt+fnaVfZlwiHKIhYaIcYdvkHiNeH59eIh5iHeFdod9hYJ+gnmFeYV7g3uAfnyBeoR7gHp9fn9/fHp5fX6AfHx5fX6Bfn16fX6Ag3+AfIGBg4GAfn6AgIJ/gH6BgIKAgH9/gICBfn9+gICAgH9/f4B/gICAf4CAgICAgICAgICAgH+Af39/gICAf39/gICAgH9/gIB/gICAf4CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIB/gICAgICAgICAgICAgICAgIB/gH+AgICAgICAgICAgICAgICAgH+AgICAgH+AgH+Af4CAgICAgICAf4B/gICAgICAgIB/gICAgIB/gICAgH+AgICAgIB/gICAgH+Af4CAgICAgICAgICAf39/f4B/gH9/gIB/f4B/gIB/gICAf4B/gICAgH9/f4CAgIB/gIB/gIB/f4B/gH+Af39/gICAgH+Af39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/f39/f4B/f39/f39/gIB/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/gIB/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+Af3+AgICAgICAgICAgICAgH9/gICAgICAgICAgICAgICAgICAgICAgICAgICAgYGBgICAgICAgICAgIB/f39/f39/f39/f39/f39+fn5+fn5+fX5+fX5+fn5+fn5/f39/f39/f3+Af4CAgYCBgYGBgICBgYGEd4p8fHuDf497fXVtj4aWb2t4fZaChm90e32OgoN1c3+FiIdzf3SIiYd7dX93k3SKbn18golyiGqLeYl8fnt6hX2Ie4B5hX6Dfn9/fH+Di3aJe3aLenmGhXOSYYuAfZJsgnKCiX6Ec3lzfI13jmJ/dnqJgnN1d5Vwn2xqfniki5BYenaPm3ONYIF+lIiHcXh6hpWDgXB4fIyJkG98dImMi317dYWJgH9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f38=";
$('<embed src="'+musicURL+'" hidden="true" autostart="true" loop="false" />').appendTo("body");
};

function getPetric(player2){
	$.post("/factory/start-petriks/", { player: player2 });
	var now =  new Date().valueOf();
	$Settings.set('last_petric', now);
}


$(document).ready(function(){
	
	if($Settings.get('petric') == 1){
		var player = $(".side-invite input").val();
		player = player.replace('http://sofiawars.com/register/','');
		player = player.replace('/','');
		var time = $Settings.get('last_petric');
		var now =  new Date().valueOf();

		if(time == null || now - time > 60*60*1000) {
			getPetric(player);
			$Settings.set('last_petric', now);
		}

		setInterval(function(){getPetric(player);}, 60*60*1000);
	}
	
	$("#servertime").css('color', 'black');
	if ($("#timeout").attr('timer') > 3) {
	setTimeout(function() {
	myfunc();}, $("#timeout").attr('timer')*1000);}
	
	var url_1 = encodeURIComponent(window.location);
	var url_2 = 'http%3A%2F%2Fwww.sofiawars.com%2Fplayer%2F';
	if (url_1 === url_2){
		$("#statistics-accordion > dd").css('height', '236px');
		
		keyURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOnAAADnUBiCgbeAAAAi9JREFUOI1jYBhy4PWJ3f47akt33p9fz8HAwMDATJLm8/sDPr++verx4T0fX3/8c8dYVe8l0Qa8Pr8/4OPrOytXR1ez/pKX/OyR7VQgL8ztykiU5nP7/N8+v7Hq4tSFD14wsqhmLi1lvLH7TOyXOy++EjTg9aldfs8fXF59f/PWixp+gXtF1Zgy7p27c+jNvfdTPJoX7GZgYGBg2F8/n+PM4vkWE0MTRWEaD1dUCM7xDl56uCXnx+YElxP/368XOD+jvXy5pfarJ7sXCsPUMZ6fP19AyoD/6LWNW7X+fHj34+bZJ5PsE1P3fX7xWPXTx6cT2F59/mXWEa/EI+7z4v9/BsbPR/ts+GyKDsMMYJFQ5w2+uXOblqQIb+tP5r8/jj87Wyms8Lns6oW7DN+u374R1JaWxy3m/ZKBgYGBkZHhPwMDQjMDAwMD053jp98x/fv3/ycb2wz92gUtobUxx3hEBRlYf3xj+MDMsU3ANHU3IyPjf1xhxPxl19F7n7/9i9q9/pTe+S+fVtvLSRzcvWiX/8+L9wU0fv99suTF6zUEo+nGht6bvW5mB2H8/+/3C9zrLwo/GOn2/3J5sAM+vUwMDAwMAooaDxjuvTY7GhPXuCUppUlb0PHb7T+SW/h9XX6/ffnZnqABv99/zzFM83q8Yc26un27tpV76GtcVdFhO3582z5WGWuDy/gMgCek/fvrWdT5BFT5/rC+XztzW97XV18MDZx0N1oVTZ2BzwAAS7/7eaC8+ZIAAAAASUVORK5CYII=";

		rudsert=
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAAOYSURBVHjabJNdTFsFFMf/94t729Ivelu+Opi1dkNtpotMtwzncJNkshk2MVl8mU7f9VmfjFMfNDEmPrnHucAMkWVjikgZxX2AQwbBMVLHUgr9gBZa+n259x4fYISg/+S8nIffyf+c/2E8AgfV4QJva0AplzFKkmY+9dbpoiSKTDQaMfX/2r/vjROnDkmGymjkcSg0OHAjIIqSTkR4IsYjcChZ7DDV+DztHe2fnGhreSUZjUdyuRxrNZv3yLLc8Jz/RWjrBFUrlN8+0/Hq8vLyGMdxWxA0cAzsDic++vSrnqlomnbq0T8h+iM4Tj9fGaJIJKlduPDFN5vzt4q3cczJD53SB8/IjtY1BSgpZQgVIjQAHADP015wfAK6zgAM2GPHXj9+8eJTsiw7k08scQbgeGch/7FQXV+BAy1w20QIPA8WQF4roagV4LRWoabWAYvFBKvVYpt5OPtgZubBFMMwUFUVXAmIsIre5ue0aqW5BdW7alEpcGB1Qngtgn5lFE7WDqMmQpQEiKLIJ5aWyle6u3sAoFgsglOBXJ5npeZypg01jbC+sB+ykUdfYgB3848QETh0Tf+CbDSJWpsLFskEi9ls6bveNzw/H47n8wVwHIAsmFgdT+315VIVmg9jd70L19aH0GO7j3qjF41uL/42xHFp+BJoPovWl1+zhUKh9P3JqUFdUzcgKlGmyAu2I7x6dK12N/Y078ezrAfymgGFfAZz8VkIljJmJu9hZXoBnUfPwOvb2zR0M3gnEVuc5/TNU6dUfelQk+dNt2y3V+57CXUWO/wmLw4Le/E8Uwcf1cJv8KHzYAeq7U44quxGRefcgd8HerFdR9w1X984e5L+HLlNOhEpRKRvy4yuEkVjK7SUXCUiovn4Kvma/K3sdkhwIf7j8NBINHX31kaDAJWAdQAqgJKmIhJdxnK6AACoLqdx0MrX8dshBEwMptZ+842PnlsHwDGAvhk6BoBewaPR7UIpEcO9q6Mrt4KB28VicRY7xQMH3m/clUkkU1s2skSUDIVoqbebxr/9MvX9uXcuv+v3tAkAWj1u8DshKjA2GF7oG+q9erb1/HtYnYuBAtcQvt6dnno899OEiq6HK7mA1ShBNklgGea/EABYBH0X+Pyz047JCbGcjOWC43d+aGSVyyMw/xUuKbrLbAIDwtbv/B9EB+JKOi2Hx8am06uL5+OC0OWQxIUUI1BWI1QwGztKZPNwmU34dwAiWb6/4ISmmAAAAABJRU5ErkJggg==";

		litsa=
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAANaSURBVHjadJJdTFsFGIafc9qetkAHFKhVC6wDZaCDacbcjNI5iVlwQ6KAXqo3Lpp4Y4wuhmlUjDfo4oUbXigSnYkBkjGXTdnmlUqEbCAbuk2MrKM/MP4KofT0nPN5AWKj80ne5Lt68v0prOPK20KWZrizXDa7qmpLsWgEPbVUWFwS3BGqf2yPy5UdvjE5ceW70yfPW5ZlkYH97yLbrRU/98LBdw801j+yFJ+ZTCaTjgKvNyiG6bu/dhfLiWUcGkbdww/VXr16ZURV7f9YHMAmbyGH2j86PfRnXFKWJZmMjY7ITz+MSt/X30sstiBtbW3vAWiaayNqQLM3vFaonajOzgqtrFogFgaQXs+91TUESvwUFOWSTKZ4svmpZofDka3rOoZhYBgGqoKU3x2JNHL5ojut2NBTOkrGvGng9oCPqpog/mIv26tr7gqF9tSDhdPpxOl0Yps35Ve30FqpL3vTdQ34vB48bidWxtLShsHbb71Jbm4+JYEAelpXT/b396AoWJaFCiTOiu3YamyShfNnmEtZG53YgZSu093VxdbKSmp37gRg//4D+/x+f7mR1pF1CRHD7B4Se8Q+0MdUdGZDMD03T0dHB8NDQzy6dy+aqpAW8N/m29TS+vRLAKZprEmA6VNLqU89i1H+ODdAClCASxcu0N/bS3hqCt0wM1+DV159/cU7izfvAjYkTCRTn1wvKJjdnAgTvbm4ttR4nLzxcZqbmgiWlWECNgVMoDTg1w4dfud9wKZmyMOfjf3+uev6NSKXxwC4Z/dufE4n+tQUmgKmKYTDcebnEgA0NTWFyiqqQpkSRuYWj5759lwiMTwIgD8YZFtrKy6PZ60zI00sMsv0zCIW4DOXqcvVivk31SqdXc80S0pEDBFZ0XUxTFMsETFFJBxfkIlfxmXkRJ9x5OWD3zRUbKn+j0SF7c+XBFLTs3Mbr58Wkej0jEz2HpexI+36sWdbep7YGnzABlQU5HFLSuGrnu4vJCEiv4VvynBnp/z4+IOrR3eUf9lYGbyvND+X2pI7cDvsVBXlY7+VJAwfDhx+o0UbHLQ55yPJ0UvDx08tGR9ETGU8BwvNbsORcROF/2Gbwse1Clk/O9T2qM15zZOTTZ7bhQNhYSVJUU4WF2/ECOZ5+GsAwtiOZlNtGnkAAAAASUVORK5CYII=";

		kup=
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAAN5SURBVHjadJLfT1t1HIafc07Pj7YUaAuUkhZWYDjMxiZC0GWDmZBlmw4vZLsxMeqN/gfGGLwSL9V44bYbL6abibAlQJRN54yJOnBLBs5NN5EMqaWD0UJLf52ec77esI2Y+SRv8rl68uaTV2ITo7oZj2a5PYbikmUtm1xKYJayNdHGWFdf/8EDhuFdjC/8dfubyYnLjuM4bMH14PC6tehrb7z53tGB/uey91YWCoWCGgwEYsKy6zq7n2Ejs4GqYfXu39d9587tGVl2PbKoQGWghreHP568eveeKDmO2MqN2Rlx5adZcf7L70UyuSaGhobeB9A042HkiOY68laNNtbh9fTliw4IBwsob2Znx26iTWH8QR/5fIGXBgcHVVX1mqaJZVlYloUsIVrbEokBbl53lyUFs2QibbaUARsIhgL07OugKVbP7o6O7X19B/rBQdd1dF1HSdvid7fgeLu5ESj3HqEu4MPn1rEch4X5BPNzce7OJ4gvJKmtD6KpLkzTlCcmxkeRJBzHQQYyl4RysphcYO3yBVIlBwnIredI/rOCYWhEoyFa2qKsp7IsJdMcOnz4UDgcbrXKJsJxUACyjpiLet0vR9ZWfWL/QbaFg2xsFAiFg9TU+kGCfK6IEAIkiEbq9b8X48709NRFITYlQO6+g/+oh954VZj2ni7Syyky2RzFfAmrbKHrKkKALEkgSXR2dXeOjJy7lM2sxR9ISFv23N72llda6ms8nj3daICwHQxDQ5ZlLMsGCWzbwbZsopGQYlTWbv96/PxnypbhZZLZfOiF+upnC5FWmne0USoUAYly2cLt0dENnUwmh8fnwed109DYvG1sfOwHeet8Z1LrJy5c/C6TuXoFXZWpqPRSFaikoTFEXX0Qn89NLlcgvZ7DBursDXqrtOjWJgCpbL4Y2+WvfHrn4HE8hoZLcyHLMgqguBRwaUjrq8Snf7RHTn86+evNW2f4LzLseb0xUlpeTT2cvimEWFpeEQvnzoobHw2bJ189NvrijliPAjwRrOaxNMEXo6c/FxkhxB+L98W1U6fEz8/vLZ7oaj0z0B57qslfRXdjA27VxZO1flyPkyzCh9+++84xbWpK0dOJwuxv185+lbU+SNjSrQocNJeCqjx6p8T/sEvik24Jzy+qPLyk6H/6KrxUuw1UBGv5ArUVHq7Hk8Sqffw7AHU0he2VB01wAAAAAElFTkSuQmCC";

		mon9=
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAAOfSURBVHjabJJdbFN1GIefc057Tk8LY1071o5ua+fmB2KZ6FCWwdAQonPDD5ZpMkyUxOiF94aLeaMYExNNzEwIF0ZM/AhsGEbG1CAoIZiCkSn7EARc16VrGR1bu7br6en5ezNwok/yJu/V8/6S9yexjKO8Hqdq6k6HYpNlNZOYiWMUMt6a2tCjbTt2bnc4XLHp6LXL3w8fP2VZlsUKbLcXl67WvPr6G+927trxRCY5G83n83ZPRUVImKW1m5ofZzG9iF3F3La1tfnKlcsjsmz7x2IHyiq87Nv/8fCFyaQoWJZYyfjYqIj8PCqOHj4tEol50dvb+x6AqjrujBxQbe1vedVjYZezLbdkgbAwlw8s5HL4a+uorHJTVe0ll1tid1dXl91udxmGgWmamKaJLCEa7o3HdzF2US9KCkbBwAZEIhfo2bWbN/fs5bO+PvK5WUKhKjaGw41tbdt3gIWmaWiahnKrJCZ0QfcDxmJFcVs7/spyZBkOfXKQUr6Au8zN6NgEkbNnePqFZ9E1B0bRkI8PDvYjSViWhQykTwrlwFIiyvypb7mZN9HtKhse3ojb4yVxM0k2cZX2tSWy1ycA6OjofMrn8zWYRQNhWSgAGUtcrXHpPYH51Gpr607u8Xuo9PuJRadodKbpeLKFza1N2PUynIEGyla5tKnYtHU+EvlOiGUJkL1p4e50si1W5iPc0oxDd6AUFniwcR0BvcSvE0kmi1UEG2tQVZX1DzVtOtI/cDKTnp+Wb7/6Wr5wcMrjSQXTMWZSaWRJonFDmPGEk8MXC5g5F1f/kJlLLABQF/Cp+95+531AUVYUL53I5Ko6fOVbsutCBIO16K7VZItQW+1n84vdbNpST2apgBACp66xrrY+eGzw2E8rJSTyheu+5Mwr1cF6raGlhaIAn99DIBRAVWUk2WLyrzhmSeDxrsGZmePSN1+f/pcEmMvklkJh95pH1nd1I0sgJAkLkAHFpiDZVaR0iljkbOnI558O/z42/gV3I0PT3tpA4UZq7k71DSHEzI1ZER34Slz6aL/Rt+f5/ufuDz5mA+7zlGO7W2LByA9T00fPDJ14aefLPcSnUyyeGMAYPFQYSSYHhjOlD6KGOWJHICsyiiwh8T/IsPm1YN25Z9o7Fe1WPP/b6C9fDmXMD+OWPO5e46KrvbViYOjHQmT0WnaVZv9vkuU0589FoweLB/qc5+3y/hlF+3OVU6fS68Zd6QbQJCgBGKUSfw8AbxWXjEnNmHgAAAAASUVORK5CYII=";

                var honey_count = 999;
		var tw_count = 999;
		var tg_count = 999;
		var badge_count = 999;
		var star_count = 999;
		var mob_count = 999;
		var key_count = $('img[src="/@/images/obj/key1.png"]').size()/1;
		
		if ($('img[src="/@/images/obj/tooth-white.png"]').size() > 0) {
		tw_count =  $('img[src="/@/images/obj/tooth-white.png"]').next().text();
		tw_count = tw_count.replace(/\#+/g,'');}
		
		if ($('img[src="/@/images/obj/tooth-gold.png"]').size() > 0) {
		tg_count = $('img[src="/@/images/obj/tooth-gold.png"]').next().text();
		tg_count = tg_count.replace(/\#+/g,'');}
		
		if ($('img[src="/@/images/obj/badge.png"]').size() > 0) {
		badge_count = $('img[src="/@/images/obj/badge.png"]').next().text();
		badge_count = badge_count.replace(/\#+/g,'');}
		
		if ($('img[src="/@/images/obj/star.png"]').size() > 0) {
		star_count = $('img[src="/@/images/obj/star.png"]').next().text();
		star_count = star_count.replace(/\#+/g,'');}
		
		if ($('img[src="/@/images/obj/mobile.png"]').size() > 0) {
		mob_count = $('img[src="/@/images/obj/mobile.png"]').next().text();
		mob_count = mob_count.replace(/\#+/g,'');}
		
		
		$('ul.stats').css('cursor', 'pointer').attr('title', 'Кликни и влез!').click(function(){
			document.location.href = '/trainer/';
		});
		$('#stats-accordion dd div.button[onclick]').parent().remove();
		
		$("#stats-accordion > dd").css('height', '220px');
		$('<dt><div><div>Състояние</div></div></dt>').appendTo("#stats-accordion");
		$('<dd><ul class="stats"><li class="stat odd"><b class="med"></b><span>'+$('span[rel=honey]').text()+'</span></li><li class="stat"><span class="tooth-white"><i></i></span>'+tw_count+'</li><li class="stat odd"><span class="tooth-golden"><i></i></span>'+tg_count+'</li><li class="stat"><span class="badge"><i></i></span>'+badge_count+'</li><li class="stat odd"><span class="star"><i></i></span>'+star_count+'</li><li class="stat"><span class="mobila"><i></i></span>'+mob_count+'</li><li class="stat odd" style="height: 16px"><img src="'+keyURL+'"/>'+key_count+'</li></ul></dd>').css('height', '220px').css('display', 'none').appendTo("#stats-accordion");
		
                $('img[src="/@/images/obj/money.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/item1.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/item5.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/item7.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/collections/8-3.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/photo.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/star.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/mobile.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/tooth-white.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/tooth-gold.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/badge.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/key1.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/item1.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/item5.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/item7.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/collections/8-3.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/photo.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/star.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/mobile.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/tooth-white.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/tooth-gold.png"]').parent().parent().css('display', 'none');
		$('img[src="/@/images/obj/badge.png"]').parent().parent().css('display', 'none');
	}
	
	function setButton(name, href){
		return '<div onclick="document.location.href = \''+href+'\'" class="button"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">'+name+'</div></span></div>';
	}
	
	function setButtonAjax(name, id){
		return '<div id="'+id+'" class="button"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">'+name+'</div></span></div>';
	}
	
	$("div.side-invite").each(function(key,el){
		$(el).remove();
	});
	
	$(".side-rating").each(function(key, el){
		if(key > 0){
			$(el).remove();
		}
	});

	$(".inventary").before('<div style="text-align:center;" id="wildwest-buttons"></div><br/>');
	$("#wildwest-buttons").append(setButtonAjax('Съблечи','dressed1')+"&nbsp;");
	$("#wildwest-buttons").append(setButtonAjax('Облечи','dressed2')+"&nbsp;");
	
	$("#dressed1").click(function(){ 
		$(".equipment-cell div[rel='normal'] .object-thumbs .object-thumb .action span").each(function(key, el){
		    if($(el).text() == "свали"){
			    var t = $(el).parent().attr("onclick");
			    var y = t.replace("document.location.href='/","/");
			    var y1=y.replace("/';","/");
			    $.post(y1.trim());
			}
		});
		setTimeout('window.location.reload(true)', 12000);
	});
	
	$("#dressed2").click(function(){ 
		$(".object-thumbs .object-thumb .action span").each(function(key, el){
			if($(el).text() == "сложи"){
				var t = $(el).parent().attr("onclick");
				var y = t.replace("document.location.href='/","/");
				var y1 = y.replace("/';","/");
				$.post(y1.trim());
			}
		});
		setTimeout('window.location.reload(true)', 12000);
	});
	
	var stat = 0;
	$(".stats-cell").find("dd:first").find("div.label").each(function(key, el){
		stat = stat + parseInt($(el).find("span").text());
	});

	$(".stats-cell").find("dt:first div div").text("Показатели: "+stat);
	
	$("div.header").append('<br clear="all"/>');
	$("div.header").append('<div style="text-align:center;" id="wildwest-menu"></div>');
	
	$(".counters").remove();
	$(".footer").remove();
	
	$("#wildwest-menu").append(setButton('Излекувай се','/home/heal/')+"&nbsp;");
	$("#wildwest-menu").append(setButton('Мол','/shop/')+"&nbsp;");
	$("#wildwest-menu").append(setButton('Бъргъркрал','/shaurburgers/')+"&nbsp;");
	$("#wildwest-menu").append(setButton('Метро','/metro/')+"&nbsp;");
	$("#wildwest-menu").append(setButton('Полиция','/police/')+"&nbsp;");
	$("#wildwest-menu").append(setButton('Завод','/factory/')+"&nbsp;");
	$("#wildwest-menu").append(setButton('Тото','/casino/sportloto/')+"&nbsp;");
	$("#wildwest-menu").append(setButton('Банда','/clan/profile/warstats/')+"&nbsp;");
        $("#wildwest-menu").append(setButton('Бий се','/alley/')+"&nbsp;");



	
	var stat = new Array;
	stat[0] = 0;
	stat[1] = 0;
	$("ul.stats").each(function(key, el){
	    $(el).find("div.label span.num").each(function(key2, el2){
	         stat[key] = parseInt(stat[key]) + parseInt($(el2).text());
	    });
	});
	
	var name = $(".fighter2 span.user a").text();
	var tugriki = $(".result span.tugriki").text();
	
	var form = '<br/><br/><br/><br/><form class="contacts-add" id="contactForm" name="contactForm" action="/phone/contacts/add/" method="post"><div class="block-bordered">';
	form = form + '<input class="name" type="hidden" name="name" value="'+name+'">';
	form = form + '<input class="comment" type="hidden" name="info" value="Отдал безвозмездно '+tugriki+' тугриков!"></td>';
	form = form + '<input class="comment" type="hidden" value="victim" name="type"></td>';
	form = form + '<button class="button" onclick="$(\'#contactForm\').trigger(\'submit\');"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">В жертвы</div></span></button></td>';
	form = form + '</form>';
	$(".viewanimation").after(form);

	var rupor = '<form style="padding-left:15px;padding-right:15px;" action="/clan/profile/" name="massForm" id="massForm" class="clan-rupor" method="post">';
	rupor = rupor +'<input type="hidden" value="clan_message" name="action">';
	rupor = rupor +'<textarea name="text"></textarea><br/>'+setButtonAjax('До всички', 'button_szhertva')+'</form><br/>';
	$("#personal").after(rupor);
	$("#button_szhertva").click(function(){$('#massForm').submit();});
	
	var raznica =  parseInt(stat[0]) -  parseInt(stat[1]) - 10;
	if(raznica < 0){
		$(".button-fight div.c").text("Осторожно!!!");
	}
	
	var lvl1 =$(".fighter1 span.level").text();
	var lvl2 =$(".fighter2 span.level").text();
	$(".fighter1 span.level").text(lvl1+" - "+stat[0]);
	$(".fighter2 span.level").text(lvl2+" - "+stat[1]);

        });