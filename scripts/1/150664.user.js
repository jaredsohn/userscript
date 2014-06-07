// ==UserScript==
// @name			Google Translator Tooltip Expanded
// @namespace		my.tooltip.namespace
// @description		Translates the selected text into a tooltip automatically. Based on Google Translation Tooltip MLiteKeysOn.
// @version			1.12
// @include			http*
// @include			https*
// @include			chrome*
// ==/UserScript==


// Flexi color picker http://www.daviddurman.com/flexi-color-picker/#
(function(p,q,s){var t=(p.SVGAngle||q.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML"),picker,slide,hueOffset=15,svgNS='http://www.w3.org/2000/svg';var u=['<div class="picker-wrapper">','<div class="picker"></div>','<div class="picker-indicator"></div>','</div>','<div class="slide-wrapper">','<div class="slide"></div>','<div class="slide-indicator"></div>','</div>'].join('');function mousePosition(a){if(p.event&&p.event.contentOverflow!==s){return{x:p.event.offsetX,y:p.event.offsetY}}if(a.offsetX!==s&&a.offsetY!==s){return{x:a.offsetX,y:a.offsetY}}var b=a.target.parentNode.parentNode;return{x:a.layerX-b.offsetLeft,y:a.layerY-b.offsetTop}}function $(a,b,c){a=q.createElementNS(svgNS,a);for(var d in b)a.setAttribute(d,b[d]);if(Object.prototype.toString.call(c)!='[object Array]')c=[c];var i=0,len=(c[0]&&c.length)||0;for(;i<len;i++)a.appendChild(c[i]);return a}if(t=='SVG'){slide=$('svg',{xmlns:'http://www.w3.org/2000/svg',version:'1.1',width:'100%',height:'100%'},[$('defs',{},$('linearGradient',{id:'gradient-hsv',x1:'0%',y1:'100%',x2:'0%',y2:'0%'},[$('stop',{offset:'0%','stop-color':'#FF0000','stop-opacity':'1'}),$('stop',{offset:'13%','stop-color':'#FF00FF','stop-opacity':'1'}),$('stop',{offset:'25%','stop-color':'#8000FF','stop-opacity':'1'}),$('stop',{offset:'38%','stop-color':'#0040FF','stop-opacity':'1'}),$('stop',{offset:'50%','stop-color':'#00FFFF','stop-opacity':'1'}),$('stop',{offset:'63%','stop-color':'#00FF40','stop-opacity':'1'}),$('stop',{offset:'75%','stop-color':'#0BED00','stop-opacity':'1'}),$('stop',{offset:'88%','stop-color':'#FFFF00','stop-opacity':'1'}),$('stop',{offset:'100%','stop-color':'#FF0000','stop-opacity':'1'})])),$('rect',{x:'0',y:'0',width:'100%',height:'100%',fill:'url(#gradient-hsv)'})]);picker=$('svg',{xmlns:'http://www.w3.org/2000/svg',version:'1.1',width:'100%',height:'100%'},[$('defs',{},[$('linearGradient',{id:'gradient-black',x1:'0%',y1:'100%',x2:'0%',y2:'0%'},[$('stop',{offset:'0%','stop-color':'#000000','stop-opacity':'1'}),$('stop',{offset:'100%','stop-color':'#CC9A81','stop-opacity':'0'})]),$('linearGradient',{id:'gradient-white',x1:'0%',y1:'100%',x2:'100%',y2:'100%'},[$('stop',{offset:'0%','stop-color':'#FFFFFF','stop-opacity':'1'}),$('stop',{offset:'100%','stop-color':'#CC9A81','stop-opacity':'0'})])]),$('rect',{x:'0',y:'0',width:'100%',height:'100%',fill:'url(#gradient-white)'}),$('rect',{x:'0',y:'0',width:'100%',height:'100%',fill:'url(#gradient-black)'})])}else if(t=='VML'){slide=['<DIV style="position: relative; width: 100%; height: 100%">','<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>','</v:rect>','</DIV>'].join('');picker=['<DIV style="position: relative; width: 100%; height: 100%">','<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>','</v:rect>','<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>','</v:rect>','</DIV>'].join('');if(!q.namespaces['v'])q.namespaces.add('v','urn:schemas-microsoft-com:vml','#default#VML')}function hsv2rgb(a){var R,G,B,X,C;var h=(a.h%360)/60;C=a.v*a.s;X=C*(1-Math.abs(h%2-1));R=G=B=a.v-C;h=~~h;R+=[C,X,0,0,X,C][h];G+=[X,C,C,X,0,0][h];B+=[0,0,X,C,C,X][h];var r=Math.floor(R*255);var g=Math.floor(G*255);var b=Math.floor(B*255);return{r:r,g:g,b:b,hex:"#"+(16777216|b|(g<<8)|(r<<16)).toString(16).slice(1)}}function rgb2hsv(a){var r=a.r;var g=a.g;var b=a.b;if(a.r>1||a.g>1||a.b>1){r/=255;g/=255;b/=255}var H,S,V,C;V=Math.max(r,g,b);C=V-Math.min(r,g,b);H=(C==0?null:V==r?(g-b)/C+(g<b?6:0):V==g?(b-r)/C+2:(r-g)/C+4);H=(H%6)*60;S=C==0?0:C/V;return{h:H,s:S,v:V}}function slideListener(d,e,f){return function(a){a=a||p.event;var b=mousePosition(a);d.h=b.y/e.offsetHeight*360+hueOffset;d.s=d.v=1;var c=hsv2rgb({h:d.h,s:1,v:1});f.style.backgroundColor=c.hex;d.callback&&d.callback(c.hex,{h:d.h-hueOffset,s:d.s,v:d.v},{r:c.r,g:c.g,b:c.b},s,b)}};function pickerListener(d,e){return function(a){a=a||p.event;var b=mousePosition(a),width=e.offsetWidth,height=e.offsetHeight;d.s=b.x/width;d.v=(height-b.y)/height;var c=hsv2rgb(d);d.callback&&d.callback(c.hex,{h:d.h-hueOffset,s:d.s,v:d.v},{r:c.r,g:c.g,b:c.b},b)}};var v=0;function ColorPicker(f,g,h){if(!(this instanceof ColorPicker))return new ColorPicker(f,g,h);this.h=0;this.s=1;this.v=1;if(!h){var i=f;i.innerHTML=u;this.slideElement=i.getElementsByClassName('slide')[0];this.pickerElement=i.getElementsByClassName('picker')[0];var j=i.getElementsByClassName('slide-indicator')[0];var k=i.getElementsByClassName('picker-indicator')[0];ColorPicker.fixIndicators(j,k);this.callback=function(a,b,c,d,e){ColorPicker.positionIndicators(j,k,e,d);g(a,b,c)}}else{this.callback=h;this.pickerElement=g;this.slideElement=f}if(t=='SVG'){var l=slide.getElementById('gradient-hsv');var m=slide.getElementsByTagName('rect')[0];l.id='gradient-hsv-'+v;m.setAttribute('fill','url(#'+l.id+')');var n=[picker.getElementById('gradient-black'),picker.getElementById('gradient-white')];var o=picker.getElementsByTagName('rect');n[0].id='gradient-black-'+v;n[1].id='gradient-white-'+v;o[0].setAttribute('fill','url(#'+n[1].id+')');o[1].setAttribute('fill','url(#'+n[0].id+')');this.slideElement.appendChild(slide.cloneNode(true));this.pickerElement.appendChild(picker.cloneNode(true));v++}else{this.slideElement.innerHTML=slide;this.pickerElement.innerHTML=picker}addEventListener(this.slideElement,'click',slideListener(this,this.slideElement,this.pickerElement));addEventListener(this.pickerElement,'click',pickerListener(this,this.pickerElement));enableDragging(this,this.slideElement,slideListener(this,this.slideElement,this.pickerElement));enableDragging(this,this.pickerElement,pickerListener(this,this.pickerElement))};function addEventListener(a,b,c){if(a.attachEvent){a.attachEvent('on'+b,c)}else if(a.addEventListener){a.addEventListener(b,c,false)}}function enableDragging(b,c,d){var e=false;addEventListener(c,'mousedown',function(a){e=true});addEventListener(c,'mouseup',function(a){e=false});addEventListener(c,'mouseout',function(a){e=false});addEventListener(c,'mousemove',function(a){if(e){d(a)}})}ColorPicker.hsv2rgb=function(a){var b=hsv2rgb(a);delete b.hex;return b};ColorPicker.hsv2hex=function(a){return hsv2rgb(a).hex};ColorPicker.rgb2hsv=rgb2hsv;ColorPicker.rgb2hex=function(a){return hsv2rgb(rgb2hsv(a)).hex};ColorPicker.hex2hsv=function(a){return rgb2hsv(ColorPicker.hex2rgb(a))};ColorPicker.hex2rgb=function(a){return{r:parseInt(a.substr(1,2),16),g:parseInt(a.substr(3,2),16),b:parseInt(a.substr(5,2),16)}};function setColor(a,b,d,e){a.h=b.h%360;a.s=b.s;a.v=b.v;var c=hsv2rgb(a);var f={y:(a.h*a.slideElement.offsetHeight)/360,x:0};var g=a.pickerElement.offsetHeight;var h={x:a.s*a.pickerElement.offsetWidth,y:g-a.v*g};a.pickerElement.style.backgroundColor=hsv2rgb({h:a.h,s:1,v:1}).hex;a.callback&&a.callback(e||c.hex,{h:a.h,s:a.s,v:a.v},d||{r:c.r,g:c.g,b:c.b},h,f);return a};ColorPicker.prototype.setHsv=function(a){return setColor(this,a)};ColorPicker.prototype.setRgb=function(a){return setColor(this,rgb2hsv(a),a)};ColorPicker.prototype.setHex=function(a){return setColor(this,ColorPicker.hex2hsv(a),s,a)};ColorPicker.positionIndicators=function(a,b,c,d){if(c){b.style.left='auto';b.style.right='0px';b.style.top='0px';a.style.top=(c.y-a.offsetHeight/2)+'px'}if(d){b.style.top=(d.y-b.offsetHeight/2)+'px';b.style.left=(d.x-b.offsetWidth/2)+'px'}};ColorPicker.fixIndicators=function(a,b){b.style.pointerEvents='none';a.style.pointerEvents='none'};p.ColorPicker=ColorPicker})(window,window.document);




const HREF_NO = 'javascript:void(0)';

initCrossBrowserSupportForGmFunctions();

var languagesGoogle = '<option value="auto">Detect language</option><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Aerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bn">Bengali</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese (simplified)</option><option value="zh-TW">Chinese (traditional)</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="ht">Haitian Creole</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option  value="ja">Japanese</option><option value="ko">Korean</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="ms">Malay</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option  value="sl">Slovenian</option><option value="es">Spanish</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option>';
var body = getTag('body')[0];
var imgLookup;
var txtSel = encodeURIComponent(txtSel); // text selected
var translation2Element = document.createElement('span');
var currentURL;

var initialized = false;

images();
css();

document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);


function mousedownCleaning(evt)
{
    var divDic = getId('divDic');
    var divLookup = getId('divLookup');

    if(divDic)
    {
        if(!clickedInsideID(evt.target,'divDic'))
            divDic.parentNode.removeChild(divDic);
    }      

    if(divLookup)
        divLookup.parentNode.removeChild(divLookup);
}


function showLookupIcon(evt)
{
    if(evt.ctrlKey && evt.altKey && (!GM_getValue('ctrl') || !GM_getValue('alt')))
        return;
    // XOR http://www.howtocreate.co.uk/xor.html
    if(evt.ctrlKey ? !GM_getValue('ctrl') : GM_getValue('ctrl'))
        return;
    if(evt.altKey ? !GM_getValue('alt') : GM_getValue('alt'))
        return;		

    if(!initialized){
        images();
        css();
        initialized = true;
    }

    var divDic = getId('divDic');
    var divLookup = getId('divLookup');
    txtSel = getSelection();

    // Exit if no text is selected
    if(!txtSel || txtSel=="")
    {
        if(divDic)
        {
            if(!clickedInsideID(evt.target,'divDic'))
                divDic.parentNode.removeChild(divDic);
        }
        if(divLookup)
            divLookup.parentNode.removeChild(divLookup);

        return;
    }


    // Possible cleanup
    if(divDic)
    {
        if(!clickedInsideID(evt.target,'divDic'))
            divDic.parentNode.removeChild(divDic);

        return;
    }


    // Remove div if exists
    if(divLookup)
    {
        divLookup.parentNode.removeChild(divLookup);
    }      


    // Div container
    divLookup = createElement('div', {id:'divLookup', style:'background-color:transparent; color:#000000; position:absolute; top:'+(evt.clientY+window.pageYOffset+10)+'px; left:'+(evt.clientX+window.pageXOffset+10)+'px; padding:0px; z-index:10000; border-radius:2px;'});
    divLookup.appendChild(imgLookup.cloneNode(false));
    divLookup.addEventListener('mouseover', lookup, false);
    body.appendChild(divLookup);   
}


// Create the tooltip and launch the Google Translate request to get the translation
function lookup(evt)
{
    var divResult = null;
    var divDic = getId('divDic');
    var divLookup = getId('divLookup');
    var top = divLookup.style.top;
    var left = divLookup.style.left;


    // No text selected
    if(!txtSel || txtSel=="")
    {

        if(divDic = getId('divDic'))
			divDic.parentNode.removeChild(divDic);
		return;
    }      


    // Cleanup divs
    if(divDic = getId('divDic'))
    {
        divDic.parentNode.removeChild(divDic);
    }      
    divLookup.parentNode.removeChild(divLookup);


    // Div container
    divDic = createElement('div', {id:'divDic', style:'opacity: 0.9; font-size: '+GM_getValue('fontsize', 'small')+'; background-color: '+GM_getValue('backgroundColor', '#EDF4FC')+'; color: '+GM_getValue('textcolor', 'Gray')+'; position:absolute; top:'+top+'; left:'+left+'; min-width:250px; min-height:50px; max-width:50%; padding:5px; text-align:left; z-index:10000; border-radius:4px; box-shadow: -2px 0px 9px 5px #898D91'});
    divDic.addEventListener('mousedown', dragHandler, false);
    body.appendChild(divDic);

	
    // Div result
	// This awfull wall of text is the "+" image
    divResult = createElement('div', {id:'divResult', style:'overflow:auto; padding:3px;'}, null, '<img src="data:image/gif;base64,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'+
																																		'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'+
																																		'SX8jiuicMMBFd2OmKwQFs2tjXpDfnPE1j30V3c7iRHlrzBD2HONzODyZtsQJMI4r0AUNaE3XNHQw95c9GC001MpIxDacFQ+ulTNTZlU3O1eWVHa6vb/pnQUUrgHHSBKIuwG+bCPyEqbAg25gMVV1iOB/IGh5YOKLKIQ6xBAcUHmzjIcIqgajZ+Ro42DcvXl7j0U4WOUd+2IGu7DWjI1pt4DYq8BPm0entuGSQY/4tBi9Ss0HqfwngBQtHbCH88MQXb/zxyFfRRRHMN+/889BHL/301Fdv/fXYZ39CCAAh+QQJCgAAACwAAAAA3AATAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgECAaEpHLJbDqf0Kh0Sq1ar9isdjoQtAQFh2fAKXsKm7R6Q+Y43vABep0mGwwOPH7w2CT+gHZ3d3lyagl+CQNvg4yGh36LcHoGfHR/ZYOElQ9/a4ocmoRygIiRk5p8pYmZjXePaYBujHoOqp5qZHBlHAUFXitddg8PBg8KGsgayxvGkAkFDwgICtPTzX2mftHW3QnOpojG3dbYkNjk1waxsdDS1N7ga9zw1t/aifTk35fu6Qj3numL14fOuHTNECHqU4DDgQEsCCwidiHBAwYQMmpcUOCAhI8gJVzUuLGThAQnP/9abEAyI4MCIVOKZNnyJUqUJxNcGNlywYOQgHZirGkSJ8gHNEky+AkS58qWEJYC/bMzacmbQHkqNdlUJ1KoSz2i9COhmQYCEXtVrCBgwYS3cCf8qTcNQ9u4cFFOq2bPLV65Cf7dxZthbjW+CgbjnWtNgWPFcAsHdoxgWWK/iyV045sAc2S96SDn1exYw17REwpLQEYt2eW/qtPZRQAB7QoC61RW+GsBwYZ/CXb/XRCYLsAKFizEtUAc+G7lcZsjroscOvTmsoUvx15PwccJ0N8yL17N9PG/E7jv9S4hOV7pdIPDdZ+ePDzv2qMXn2b5+wTbKuAWnF3oZbABZY'+
																																		'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'+
																																		'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"/><br/>Loading...');
    divDic.appendChild(divResult);         

	
    // Options link
    var optionLink = createElement('a', {id:'optionsLink', href:HREF_NO, style:'opacity:0.2; position:absolute; bottom:3px; right:13px; font-size:18px; text-decoration:none!important;background:#528DDF;padding:1px;color:#fff;border-radius:6px 6px 6px 6px;border:2px solid #EEEEEE;font-weight:bold;width:20px;text-align:center;display:block;'}, 'click openCloseOptions false', '+');
	divDic.appendChild(optionLink);
	optionLink.addEventListener('mouseover', function(e) {e.target.style.opacity =1.0});
	optionLink.addEventListener('mouseout', function(e) {e.target.style.opacity =0.2});
	
    // Send the Google Translate request
    if( (txtSel+" ").search(/^\s*https?:\/\//) > -1 )
    {
        divResult.innerHTML = '<a href="'+txtSel+'" target="_blank" >'+txtSel+'</a>';
    }
    else if( (txtSel+" ").search(/^\s*\S+(\.\S+)+/) > -1 ) // site.dom
    {
        divResult.innerHTML = '<a style="color:#888;" href="http://'+txtSel+'" target="_blank" >'+txtSel+'</a>';
    }
    else
    {
		var sl, tl, lang;
		sl = GM_getValue('from') ? GM_getValue('from') : "auto";
		tl = GM_getValue('to') ? GM_getValue('to') : "auto";
		lang = sl + "|" + tl;
		//currentURL = "http://www.google.com/translate_t?text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // Basic address, for web page parsing
		//currentURL = "http://translate.google.fr/translate_a/t?client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // URL for GET request. This adress return an array as answer
		currentPostData = "client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // Data for a POST request, for handling long requests
		GM_xmlhttpRequest({
            /*method: 'GET',
            url: currentURL,*/
			method: 'POST',
			url : 'http://translate.google.fr/translate_a/t',
			data: currentPostData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
            onload: function(resp) {
                try{
                    extractResult(resp.responseText);
                }catch(e){
                    GM_log(e);
                }
            }
        });
		
		if( GM_getValue('to2', 'Disabled') != 'Disabled' ) {
			sl = GM_getValue('from') ? GM_getValue('from') : "auto";
			tl = GM_getValue('to2') ? GM_getValue('to2') : "auto";
			lang = sl + "|" + tl;
			currentPostData = "client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // Data for a POST request, for handling long requests
			GM_xmlhttpRequest({
				method: 'POST',
				url : 'http://translate.google.fr/translate_a/t',
				data: currentPostData,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				onload: function(resp) {
					try{
						extractResult2(resp.responseText);
					}catch(e){
						GM_log(e);
					}
				}
			});
		}
		else {
			translation2Element.innerHTML = '';
		}
    }
}


// Lanched when we select an other language in the setup menu
function quickLookup()
{
    getId('divDic').style.fontSize = getId('optFontSize').value;
    getId('divDic').style.color = getId('optTextColor').value;
	getId('divResult').innerHTML = 'Loading...';
	
	var sl, tl, lang;
	sl = getId('optSelLangFrom').value;
	tl = getId('optSelLangTo').value;
	lang = sl + "|" + tl;
	currentPostData = "client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // Data for a POST request, for handling long requests
	GM_xmlhttpRequest({
		method: 'POST',
		url : 'http://translate.google.fr/translate_a/t',
		data: currentPostData,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
        onload: function(resp) {
            try{
                extractResult(resp.responseText);
            }catch(e){
                GM_log(e);
            }
        }
    });
	
	if(getId('optSelLangTo2').value != 'Disabled') {
		var sl, tl, lang;
		sl = getId('optSelLangFrom').value;
		tl = getId('optSelLangTo2').value;
		currentPostData = "client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // Data for a POST request, for handling long requests
        GM_xmlhttpRequest({
			method: 'POST',
			url : 'http://translate.google.fr/translate_a/t',
			data: currentPostData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			onload: function(resp) {
				try{
					extractResult2(resp.responseText);
				}catch(e){
					GM_log(e);
				}
			}
		});
	}
	else {
		translation2Element.innerHTML = '';
	}
}






function extractResult(gTradStringArray)
{
	var arr = eval(gTradStringArray); // eval is used to transform the string to an array. I alse made a custom parsing function, but it doesn't handle antislashed characters, so I prefer using eval()
	
	/*
		Content of the gTrad array :
		0 / 0:Translation 1:Source text
		1 / i:Grammar / 0:Types (word, verb, ...) 1: Other translations
		5 / Array of other translations
	*/
	
	var translation = '';
	
	// 0 - Full translation
	translation += '<small><a href="https://translate.google.com/#'+GM_getValue('from', 'auto')+'/'+GM_getValue('to', 'auto')+'/'+txtSel+'">['+arr[2]+'] ';
	for(var i=0; i < arr[0].length ; i++) translation += arr[0][i][1];
	translation += '</a> <span id="texttospeachbuttonfrom"></span></small><br/>';
	translation += '['+GM_getValue('to', 'auto')+']<em> ';
	for(var i=0; i < arr[0].length ; i++) translation += arr[0][i][0];
	translation += '</em> <span id="texttospeachbuttonto"></span><br/><span id="translation2Element"></span><br/>';
	
    
    translation += '<a id="toggleShowDetails" '+ (!GM_getValue('details', 'false') ? 'style="display:none"':'')+'>Show details</a>';
    translation += '<span id="divDetails" '+ (GM_getValue('details', 'false') ? 'style="display:none"':'')+'><a id="toggleHideDetails">Hide details</a><br/>';
    // 1 - Grammar
    if(typeof arr[1] != 'undefined') {
        for(var i=0; i < arr[1].length ; i++) {
            translation += '<strong>' + arr[1][i][0] + ' : </strong>';
            for(var j=0 ; j < arr[1][i][1].length ; j++) {
                translation += ((j==0)?'':', ') + arr[1][i][1][j];
            }
            translation+='<br/>';
        }
        translation+='<br/>';
    }
    
    // 5 - Alternative parts
    if(typeof arr[5] != 'undefined') {
        for(var i=0; i < arr[5].length ; i++) {
            if(typeof arr[5][i][2] != 'undefined') { // 5/i/2 array of alternatives, 5/i/0 the part of the text we are studying
                translation += '<strong>' + arr[5][i][0] + ' : </strong>';
                for(var j=0 ; j < arr[5][i][2].length ; j++) {
                    translation += ((j==0)?'':', ') + arr[5][i][2][j][0];
                }
                translation+='<br/>';
            }
        }
    }
    translation += '</span>'; // Detail end
    
    
    getId('divResult').innerHTML = '<p style="margin:0px">'+ translation + '</p>';
	getId('translation2Element').appendChild(translation2Element); // Optional second translation
    
    getId('toggleShowDetails').addEventListener('click', function() {
        getId('toggleShowDetails').style.display = 'none';
        getId('divDetails').style.display = 'block';
    }, false);
    getId('toggleHideDetails').addEventListener('click', function() {
        getId('toggleShowDetails').style.display = 'inline';
        getId('divDetails').style.display = 'none';
    }, false);
	
    // Create the Text to Speach
	var fromText = '';
	var toText = '';
	for(var i=0; i < arr[0].length ; i++) fromText += arr[0][i][1];
	for(var i=0; i < arr[0].length ; i++) toText += arr[0][i][0];
	addTextToSpeachLink(getId('texttospeachbuttonfrom'), arr[2], fromText); // arr[2] contains the detected input language
	addTextToSpeachLink(getId('texttospeachbuttonto'), GM_getValue('to', 'auto') == 'auto' ? 'en' : GM_getValue('to', 'auto'), toText); // I cannot find a way to get the detected destination language, so if the requested destination is 'auto', I use the english Text to Speach language
}

function extractResult2(gTradStringArray)
{
	var arr = eval(gTradStringArray);
	
	var translation = '';
	translation += '#['+GM_getValue('to2', 'auto')+']<em> ';
	for(var i=0; i < arr[0].length ; i++) translation += arr[0][i][0];
	translation += '</em># <span id="texttospeachbuttonto2"></span>';
	
	translation2Element.innerHTML = translation;
	
	var toText2 = '';
	for(var i=0; i < arr[0].length ; i++) toText2 += arr[0][i][0];
	addTextToSpeachLink(getId('texttospeachbuttonto2'), GM_getValue('to2', 'auto') == 'auto' ? 'en' : GM_getValue('to2', 'auto'), toText2); 
}


function addTextToSpeachLink(element, lang, text) {
    if(GM_getValue('tts', false) == false) return;
	var speachLink = document.createElement('a');
	speachLink.href = 'http://translate.google.com/translate_tts?tl='+lang+'&q='+text.replace(/[«»'"]/g,' ');
	speachLink.target = '_blank';
	speachLink.innerHTML = '<img src="http://www.trace-de-son.com/images/sound-icon.png" height="16" width="16"/>';
	element.appendChild(speachLink);
}



function getSelection()
{
    var txt = null;
    //get selected text
    if (window.getSelection && !window.opera) // window.getSelection() bugs with Opera 12.16 and ViolentMonkey
    {
        txt = window.getSelection();
    }
    else if (document.getSelection)
    {
        txt = document.getSelection();
    }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
    }
    return txt;
}



function openCloseOptions(evt)
{
    var divOptions = getId('divOpt');

    if(!divOptions) //Show options
    {
        divOptions = createElement('div', {id:'divOpt', style:'border-top:2px solid #5A91D8;position:relative; padding:5px;'});
        getId('divDic').appendChild(divOptions);
        getId('optionsLink').style.visibility = 'hidden';
		
		// color picker, the library doesn't work on Opera
		try {
			if(!window.divColorPicker) {			
				window.divColorPicker = createElement('div', {id:'optPicker', class:'cp-small'});
				
				window.colorPicker = ColorPicker(
					window.divColorPicker,
					function(hex, hsv, rgb) {
						getId('divDic').style.backgroundColor = hex;
					}
				);
				
			}
			window.colorPicker.setHex(GM_getValue('backgroundColor', '#EDF4FC'));
			divOptions.appendChild(window.divColorPicker);
		} catch(err) {
			divOptions.innerHTML += '<p>Error : Cannot load color picker (Known issue on Opera)</p>';
		}
		//fields container
		divOptionsFields = createElement('p');
		divOptions.appendChild(divOptionsFields);
		
        //from
        divOptionsFields.appendChild(createElement('span', null, null,'From :'));
        divOptionsFields.appendChild(createElement('select', {id:'optSelLangFrom'}, null, languagesGoogle));
        getId('optSelLangFrom').value = GM_getValue('from') ? GM_getValue('from') : 'auto';
        getId('optSelLangFrom').addEventListener('change', quickLookup, false);

        //to
		divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('span', null, null,' To :'));
        divOptionsFields.appendChild(createElement('select', {id:'optSelLangTo'}, null, languagesGoogle));
        getId('optSelLangTo').value = GM_getValue('to') ? GM_getValue('to') : 'auto';
        getId('optSelLangTo').addEventListener('change', quickLookup, false);
		
		//to2
		divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('span', null, null,' To 2 :'));
        divOptionsFields.appendChild(createElement('select', {id:'optSelLangTo2'}, null, '<option value="Disabled">Disabled</option>'+languagesGoogle));
        getId('optSelLangTo2').value = GM_getValue('to2') ? GM_getValue('to2') : 'Disabled';
        getId('optSelLangTo2').addEventListener('change', quickLookup, false);

        //use text to speach 
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('input', {id:'checkTTS', type:'checkbox'}));
        divOptionsFields.appendChild(createElement('span', null, null,'<span title="The feature has many issues. You often have to refresh the page to launch the .mp3 file. If you use the langage auto-detection, you have to change the langage in the url of the new tab." style="border-bottom:1px dashed">Display Text To Speach</span>'));
        getId('checkTTS').checked = GM_getValue('tts');
        
        //hide details
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('input', {id:'checkDetails', type:'checkbox'}));
        divOptionsFields.appendChild(createElement('span', null, null,'Hide details by default'));
        getId('checkDetails').checked = GM_getValue('details');
        
        //font size
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('span', null, null,'Font size :'));
        divOptionsFields.appendChild(createElement('select', {id:'optFontSize'}, null, '<option value="x-small">Extra small</option><option value="small">Small (default)</option><option value="medium">Medium</option><option value="large">Large</option>'));
        getId('optFontSize').value = GM_getValue('fontsize') ? GM_getValue('fontsize') : 'small';
        getId('optFontSize').addEventListener('change', quickLookup, false);
        
        //text color
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('span', null, null,'Text color :'));
        divOptionsFields.appendChild(createElement('select', {id:'optTextColor'}, null, '<option value="Gray">Gray (default)</option><option value="Black">Black</option><option value="White">White</option><option value="CadetBlue">CadetBlue</option><option value="ForestGreen">ForestGreen</option><option value="FireBrick">FireBrick</option>'));
        getId('optTextColor').value = GM_getValue('textcolor') ? GM_getValue('textcolor') : 'Gray';
        getId('optTextColor').addEventListener('change', quickLookup, false);
        
        //use ctrl 
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('input', {id:'checkCtrl', type:'checkbox'}));
        divOptionsFields.appendChild(createElement('span', null, null,'Use Ctrl key'));
        getId('checkCtrl').checked = GM_getValue('ctrl');

        //use alt 
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('input', {id:'checkAlt', type:'checkbox'}));
        divOptionsFields.appendChild(createElement('span', null, null,'Use Alt key'));
        getId('checkAlt').checked = GM_getValue('alt');

        //save
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click saveOptions false', 'Save'));
		
		//reset
		divOptionsFields.appendChild(createElement('span', null, null,' - '));
        divOptionsFields.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click resetOptions false', 'Reset'));

        //cancel
        divOptionsFields.appendChild(createElement('span', null, null,' - '));
        divOptionsFields.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click openCloseOptions false', 'Cancel'));

    }
    else// Hide options
    {
        divOptions.parentNode.removeChild(divOptions);
        getId('optionsLink').style.visibility = 'visible';
    }
}


function saveOptions(evt){

	var backgroundColor = getId('divDic').style.backgroundColor;
    var from = getId('optSelLangFrom').value;
    var to = getId('optSelLangTo').value;
	var to2 = getId('optSelLangTo2').value;
    var tts = getId('checkTTS').checked;
    var details = getId('checkDetails').checked;
    var fontsize = getId('optFontSize').value;
    var textcolor = getId('optTextColor').value;
    var ctrl = getId('checkCtrl').checked;
    var alt = getId('checkAlt').checked;
	
	GM_setValue('backgroundColor', backgroundColor);
    GM_setValue('from', from);
    GM_setValue('to', to);
	GM_setValue('to2', to2);
    GM_setValue('tts', tts);
    GM_setValue('details', details);
    GM_setValue('fontsize', fontsize);
    GM_setValue('textcolor', textcolor);
    GM_setValue('ctrl', ctrl);
    GM_setValue('alt', alt);

    quickLookup();
    getId('divDic').removeChild(getId('divOpt'));
    getId('optionsLink').style.visibility = 'visible';
}


function resetOptions(evt){
	
	GM_deleteValue('backgroundColor');
    GM_deleteValue('from');
    GM_deleteValue('to');
	GM_deleteValue('to2');
    GM_deleteValue('tts');
    GM_deleteValue('fontsize');
    GM_deleteValue('textcolor');
    GM_deleteValue('ctrl');
    GM_deleteValue('alt');

    getId('divDic').parentNode.removeChild(getId('divDic'));
}





function css()
{
    var style = createElement('style',{type:"text/css"},null,""+
        'a.gootranslink:link {color: #0000FF !important; text-decoration: underline !important;}'  +  
        'a.gootranslink:visited {color: #0000FF !important; text-decoration: underline !important;}'+
        'a.gootranslink:hover {color: #0000FF !important; text-decoration: underline !important;}'  +
        'a.gootranslink:active {color: #0000FF !important; text-decoration: underline !important;}'+
		'.picker-wrapper,.slide-wrapper{position:relative;float:left}.picker-indicator,.slide-indicator{position:absolute;left:0;top:0;pointer-events:none}.picker,.slide{cursor:crosshair;float:left}.cp-default{background-color:gray;padding:12px;box-shadow:0 0 40px #000;border-radius:15px;float:left}.cp-default .picker{width:200px;height:200px}.cp-default .slide{width:30px;height:200px}.cp-default .slide-wrapper{margin-left:10px}.cp-default .picker-indicator{width:5px;height:5px;border:2px solid darkblue;-moz-border-radius:4px;-o-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;opacity:.5;-ms-filter:"alpha(opacity=50)";filter:alpha(opacity=50);filter:alpha(opacity=50);background-color:white}.cp-default .slide-indicator{width:100%;height:10px;left:-4px;opacity:.6;-ms-filter:"alpha(opacity=60)";filter:alpha(opacity=60);filter:alpha(opacity=60);border:4px solid lightblue;-moz-border-radius:4px;-o-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;background-color:white}.cp-small{padding:5px;background-color:white;float:left;border-radius:5px}.cp-small .picker{width:100px;height:100px}.cp-small .slide{width:15px;height:100px}.cp-small .slide-wrapper{margin-left:5px}.cp-small .picker-indicator{width:1px;height:1px;border:1px solid black;background-color:white}.cp-small .slide-indicator{width:100%;height:2px;left:0;background-color:black}.cp-fancy{padding:10px;background:-webkit-linear-gradient(top,#aaa 0,#222 100%);float:left;border:1px solid #999;box-shadow:inset 0 0 10px white}.cp-fancy .picker{width:200px;height:200px}.cp-fancy .slide{width:30px;height:200px}.cp-fancy .slide-wrapper{margin-left:10px}.cp-fancy .picker-indicator{width:24px;height:24px;background-image:url(http://cdn1.iconfinder.com/data/icons/fugue/bonus/icons-24/target.png)}.cp-fancy .slide-indicator{width:30px;height:31px;left:30px;background-image:url(http://cdn1.iconfinder.com/data/icons/bluecoral/Left.png)}.cp-normal{padding:10px;background-color:white;float:left;border:4px solid #d6d6d6;box-shadow:inset 0 0 10px white}.cp-normal .picker{width:200px;height:200px}.cp-normal .slide{width:30px;height:200px}.cp-normal .slide-wrapper{margin-left:10px}.cp-normal .picker-indicator{width:5px;height:5px;border:1px solid gray;opacity:.5;-ms-filter:"alpha(opacity=50)";filter:alpha(opacity=50);filter:alpha(opacity=50);background-color:white;pointer-events:none}.cp-normal .slide-indicator{width:100%;height:10px;left:-4px;opacity:.6;-ms-filter:"alpha(opacity=60)";filter:alpha(opacity=60);filter:alpha(opacity=60);border:4px solid gray;background-color:white;pointer-events:none}'
       );
    getTag('head')[0].appendChild(style);
}




/*
 * Short functions to replace the document.createElement document.getElementById and document.getElementsByTagName
 */
function createElement(type, attrArray, evtListener, html)
{
    var node = document.createElement(type);

    for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
        node.setAttribute(attr, attrArray[attr]);
    }

    if(evtListener){
        var a = evtListener.split(' ');
        node.addEventListener(a[0], eval(a[1]), eval(a[2]));
    }

    if(html)
        node.innerHTML = html;

    return node;
}

function getId(id, parent){
    if(!parent)
        return document.getElementById(id);
    return parent.getElementById(id);      
}

function getTag(name, parent){
    if(!parent)
        return document.getElementsByTagName(name);
    return parent.getElementsByTagName(name);
}
















/*
 * Drag and drop support adapted from http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
 */
var savedTarget=null;                           // The target layer (effectively vidPane)
var orgCursor=null;                             // The original mouse style so we can restore it
var dragOK=false;                               // True if we're allowed to move the element under mouse
var dragXoffset=0;                              // How much we've moved the element on the horozontal
var dragYoffset=0;                              // How much we've moved the element on the verticle

var didDrag=false;                                                              // Set to true when we do a drag


function moveHandler(e){
    if (e == null) return;// { e = window.event }
if ( e.button<=1 && dragOK ){
    savedTarget.style.left = e.clientX - dragXoffset + 'px';
    savedTarget.style.top = e.clientY - dragYoffset + 'px';
    return false;
}
}

function dragCleanup(e) {
    document.removeEventListener('mousemove',moveHandler,false);
    document.removeEventListener('mouseup',dragCleanup,false);
    savedTarget.style.cursor=orgCursor;

    dragOK=false; // Its been dragged now
    didDrag=true;

}

function dragHandler(e){

    var htype='-moz-grabbing';
    if (e == null) return;// { e = window.event;}  // htype='move';}
    var target = e.target;// != null ? e.target : e.srcElement;
    orgCursor=target.style.cursor;

    if(target.nodeName!='DIV' && target.nodeName!='P')
    return;

    if (target = clickedInsideID(target, 'divDic')) {
        savedTarget=target;      
        target.style.cursor=htype;
        dragOK=true;
        dragXoffset = e.clientX-target.offsetLeft;
        dragYoffset = e.clientY-target.offsetTop;

        // Set the left before removing the right
        target.style.left = e.clientX - dragXoffset + 'px';
        target.style.right = null;


        document.addEventListener('mousemove',moveHandler,false);
        document.addEventListener('mouseup',dragCleanup,false);
        return false;
    }
}

function clickedInsideID(target, id) {

    if (target.getAttribute('id')==id)
        return getId(id);

    if (target.parentNode) {
        while (target = target.parentNode) {
            try{
                if (target.getAttribute('id')==id)
                    return getId(id);
            }catch(e){
            }
        }
    }

    return null;
}
// End drag code





/*
 * Images
 */
function images()
{
	imgLookup = createElement('img',{border:0});
	imgLookup.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC';
}

if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}

/*
 * Cross browser support for GM functions
 * http://userscripts.org/topics/41177
 */
 function initCrossBrowserSupportForGmFunctions() {
	if (typeof GM_deleteValue == 'undefined') {

		GM_addStyle = function(css) {
			var style = document.createElement('style');
			style.textContent = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}

		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}

		GM_log = function(message) {
			console.log(message);
		}

		GM_openInTab = function(url) {
			return window.open(url, "_blank");
		}

		GM_registerMenuCommand = function(name, funk) {
		//todo
		}

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}
	}
}


