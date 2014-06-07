// ==UserScript==
// @name           WooYun Zone Emot
// @namespace      0x0F's Zone Emotions
// @description    Emotions In WooYun Zone 
// @version 1.0.0
// @match        http://zone.wooyun.org/content/*
// @match        https://zone.wooyun.org/content/*
// ==/UserScript==
//create by zimengqian(@aimeexu)  

function proxy(fn) {
	var script = document.createElement('script');
	script.textContent = '(' + fn.toString() + ')(window);';
	document.body.appendChild(script);
}
function main(){
    var emot=document.createElement("A");
    var emottext=document.createElement("span");
    emot.href="javascript:void(0)";
    emottext.innerHTML="表情";
    emot.appendChild(emottext);
    emotContainer=document.createElement("div");
    emotContainer.className="Container";
    emotContainer.id="emotCont";
    emot.appendChild(emotContainer);
    editor_tools.appendChild(emot);
    emottext.onclick=function(){
    	emotContainer.style.display="block";
    };
    
    for(var i=100;i<204;i++){
    	var imgs=document.createElement("img");
    	imgs.src="http://cnc.qzonestyle.gtimg.cn/qzone/em/e"+i+".gif";
    	imgs.onclick=function(){
    		if(typeof(editor_content)!== 'undefined')
    			InsertAtCursor(editor_content,'[img src="'+this.src+'"/]');
    		else
    			InsertAtCursor(comment_content,'[img src="'+this.src+'"/]');
    		document.getElementById("emotCont").style.display="none";
    	};
    	var br=document.createElement("br");
    	if((i-100)%13==0&&i!=100) emotContainer.appendChild(br);
    	emotContainer.appendChild(imgs);
    }
    
    var imgBtnCancel=document.createElement("input");
    imgBtnCancel.type="button";
    imgBtnCancel.value="取消";
    imgBtnCancel.onclick=function(){document.getElementById("emotCont").style.display="none";};
    var btndiv=document.createElement("div");
    btndiv.align="center";
    btndiv.appendChild(imgBtnCancel);
    emotContainer.appendChild(btndiv);
    
    function InsertAtCursor(obj,value,endValue,rangeData){
    		if(document.selection){
    			obj.focus();
    			var sel=document.selection.createRange();
    			if(rangeData!=null && rangeData.bookmark!=null) sel.moveToBookmark(rangeData.bookmark);
    			sel.text=endValue ? value+sel.text+endValue : sel.text+value;
    			sel.select();
    		}else if(obj.selectionStart||obj.selectionStart=="0"){
    			var startPos=obj.selectionStart;
    			var endPos=obj.selectionEnd;
    			var restoreTop=obj.scrollTop;
    			var sel=obj.value.substring(startPos,endPos);
    			obj.value=obj.value.substring(0,startPos)+(endValue ? value+sel+endValue : sel+value)+obj.value.substring(endPos,obj.value.length);
    			if(restoreTop>0) obj.scrollTop=restoreTop;
    			obj.focus();
    			obj.selectionStart=startPos+value.length;
    			obj.selectionEnd=startPos+value.length;
    		}else{
    			obj.value+=value;
    			obj.focus();
    		}
    	}
}
proxy(main);