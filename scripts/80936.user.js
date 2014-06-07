;
// ==UserScript==
// @name             FastScroll
// @author           Yolk
// @version          0.0.0.1
// @description    Make Scroll faster in Opera (leprosorium)
// @include          *leprosorium.ru/comments/*
// ==/UserScript==

var FastScrollVars = {
    //=============Настройки========================
    startRegionPixels     : 1000,   // Превышение верхнего порога отображаемой области
    //(500 + видимая часть + 500)
    endRegionPixels       : 1500,   // Превышение нижнего порога отображаемой области
    minComments           : 500,    // Минимальное кол-во комментариев, при котором скрипт начинает работать
    scrollTimeout         : 10      // В милисекундах, задержка по скролу
    //==============================================
};

function fsAllowScript(){
    FastScrollVars.commentsEls = $$('#js-commentsHolder>div');
    if (FastScrollVars.commentsEls.length<FastScrollVars.minComments){ return false;}
    else return true;
}
function fsInit(){//запускается по DOMContentLoaded
    var aScreen = screen.availHeight;
    var commentRegion = FastScrollVars.startRegionPixels + aScreen + FastScrollVars.endRegionPixels;
    if(!fsAllowScript()){return;}
    var commentsEls = FastScrollVars.commentsEls;
    //window.scrollTo(0,0);
    
    var cacheArray = {};
    var jsCommentsHolder = $('js-commentsHolder');
    var anchorCoords = jsCommentsHolder.getPosition().y;
    var start = new Date();
    jsCommentsHolder.style.height =  jsCommentsHolder.clientHeight + 'px';
    for (var i=0;i<commentsEls.length;i++){
       cacheArray[commentsEls[i].offsetTop + anchorCoords] = [commentsEls[i], commentsEls[i].offsetHeight];
    }
        for (var j=0;j<commentsEls.length;j++){commentsEls[j].style.display = 'none';}//нельзя в том же цикле
    
    var end = new Date();
    var MainResultTime = ((end.getTime() - start.getTime())/1000)+' с';
    if(!$('ldelm'))fsDomLoad('load');
    var offButton = '<input style="background:-o-skin(\'Stop\'); width:-o-skin;height:-o-skin; border:none;cursor:pointer;" type="button" title="выключить быстрый скролл" id="rmFastScroll"/>';
    $('ldelm').innerHTML = 'Готово('+MainResultTime+')<input type="text" id="mstime" /><br/>';

     var inputMs = $('mstime');
     var cacheforhide = {};
     var scrollCache = (document.documentElement.scrollTop - anchorCoords)>commentRegion?anchorCoords:false;
     var maxEndCoordsCache = 0;
     
     this.fsMainFunc = function (progressTime){
        
        var starts = new Date();
        var scrlTop = document.documentElement.scrollTop;
        var stCoords = scrlTop>FastScrollVars.startRegionPixels?scrlTop-FastScrollVars.startRegionPixels:0;
        var enCoords = scrlTop + aScreen + FastScrollVars.endRegionPixels;//500 doljno hvatiti, pri jelanii mojno uvelichiti)
        
        if(scrollCache && stCoords>scrollCache){//Проверяю длинный прыжок скроллом вниз
            inputMs.value = "Подождите";
            stCoords = scrollCache;//устанавливаю предыдущие конечные координаты области в качестве начальных координат
            var longFlag = true;//устанавливаю флаг для последующих проверок
        }
        
        if (cacheforhide.notEmpty){
            var z = 0;
            var longCommentCache = [];
            for (var k in cacheforhide){
                if(k<stCoords || k>enCoords){//-0+(cacheforhide[k][1])
                    
                    if(cacheforhide[k][0].style.height =='') {
                        cacheforhide[k][0].style.height = cacheforhide[k][1]-39;//.offsetHeight-39;
                    }
                    if(k<stCoords && (cacheforhide[k][1]>FastScrollVars.startRegionPixels)){//(k-0+cacheforhide[k][1]>scrlTop)
                        longCommentCache[z] = [cacheforhide[k],k];
                        z++;
                        continue;
                    }
                    cacheforhide[k][0].style.visibility='hidden';
                    cacheforhide[k][0].children[0].style.display = 'none';
                    cacheforhide[k][0].children[1].style.display = 'none';
                }
                /*else if(k>enCoords){
                    cacheforhide[k][0].style.display = 'none';
                }*/
            }
            cacheforhide = {};
            /* Кэширую длинные комментарии, отправляю на 2ой круг*/
            for (var d=0;d<longCommentCache.length;d++){
                cacheforhide[longCommentCache[d][1]] = longCommentCache[d][0];
            }
        }
        
        for (var i = stCoords;i<enCoords;i++){
            if(cacheArray[i]){
                cacheforhide[i] = cacheArray[i];
                cacheforhide.notEmpty = true;
                 cacheArray[i][0].style.display = 'block';
                if(cacheArray[i][0].className.indexOf('shrinked')==-1){//проверить класс shrinked(отриц рейтинг)
                    cacheArray[i][0].children[0].style.display = 'block';
                }
                cacheArray[i][0].children[1].style.display = 'block';
                cacheArray[i][0].style.visibility='visible';
            }
        }
        scrollCache =  enCoords>maxEndCoordsCache?maxEndCoordsCache = enCoords:maxEndCoordsCache;
        var ends = new Date();
        /* Шаманский код стартед хиа */
        if(!progressTime)progressTime=0;
        var result = ((ends.getTime() - starts.getTime())/1000)+progressTime.toFloat();
        result = result.toFixed(3);
        if(longFlag){
            fsMainFunc(result);
            return;
        }
        /* Шаманский код ендет хиа(мэйби) */
        inputMs.value = result + ' сек +('+FastScrollVars.scrollTimeout+'мс)';
    }

    var scrollDelay;
    function scrollEventFn(){
        if(scrollDelay)clearTimeout(scrollDelay);
        scrollDelay = setTimeout("this.fsMainFunc()",FastScrollVars.scrollTimeout);
    }
    window.addEventListener('scroll',scrollEventFn,false);
    /*$('rmFastScroll').addEventListener('click',function(){
        //window.stop();
    
        window.removeEventListener('scroll',scrollEventFn,false);
        for (var i=0;i<commentsEls.length;i++){
            commentsEls[i].children[0].style.display = 'block';
            commentsEls[i].children[1].style.display = 'block';
        }
    },false);*/
  /*  $('ldelm').addEventListener('click',function(e){
        $('ldelm').style.display = 'none';
    },false);*/
    fsMainFunc();//firstRun
}
function fsDomLoad(eventType){
    if(!fsAllowScript()) return;
    
    commentsHandler.refreshAll =  function (id, params) {
        
		if (params.plaincomments) {
			commentsHandler.plainComments = true;
		}
		if ($(params.button).hasClass('js-loading')) {
			return false;
		} else {
			$(params.button).addClass('js-loading');
			$(params.button).innerHTML = 'работаем';
		}
		
		commentsHandler.prepareToSendCommentForm();
		
		var data = 'wtf=' + commentsHandler.wtf + '&pid=' + id;
		
		ajaxLoadPost('/commctl/', data, function (ajaxObj) {
			$(params.button).removeClass('js-loading');
			$(params.button).innerHTML = 'обновить комментарии';
			if ($('reply_form')) {
				$('reply_form').getElement('.comments_form_loading').addClass('hidden');
			}
			var val = ajaxObj.responseText;
			//val = val.replace(/\\\\"/g,'\\"');
			//val = val.replace(/%/g,'\%');
			//val = val.replace(/\\/g,'\\\\"');
			var response = ajaxHandler.checkResponse(val, true);
			if (response) {
				commentsHandler.refreshJSON(response,id);
                fsInit();
			} else {
				commentsHandler.clearCommentForm();
			}
		});
	};
    var stopButtonHTML = '<input id="stopBut" style="background:-o-skin(\'Stop\'); width:-o-skin;height:-o-skin; border:none;cursor:pointer;" type="button" title="Остановить"/>';
    var textHTMLString = eventType=='load'?'Потерпите, разогреваю процессор':'Загрузка фотографий';
    var loadElm = document.createElement('div');
    loadElm.setAttribute('style',
        'background:-o-skin("Addressbar Button Skin.hover");'+
        //'width:200px;'+
        'padding:5px 9px;'+
        'position:fixed;'+
        'bottom:0px;'+
        'left:0px;'+
        'background-color:#E8E8FF;'+
        'z-index:150;'
    );//border:1px solid #B4B4ED;
    loadElm.id = 'ldelm';
    loadElm.innerHTML = textHTMLString;
    document.body.appendChild(loadElm);
}
document.addEventListener('DOMContentLoaded',fsDomLoad,false);
window.addEventListener('load',fsInit,false);