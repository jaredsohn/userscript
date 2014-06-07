// ==UserScript==
// @name           fetchRawScans
// @namespace      http://rawscans.com
// @include        http://rawscans.com/forum/viewtopic.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://mcpub.googlecode.com/files/jquery.blockUI.js
// @require		   http://mcpub.googlecode.com/files/jquery.shiftclick.js
// ==/UserScript==

if (document.title.length == 0) return; 
if(unsafeWindow.console)
{
GM_log=unsafeWindow.console.log;
}

(function() 
	{	
	var load = function() {
		if(typeof(jQuery) == 'undefined' && typeof(jQuery.blockUI) == 'undefined' ) { 
		alert('GM版本过低或脚本加载有误，请尝试重新安装脚本') 
		//return load();
		}
		else { main(); }
	}();
  

function main() {
if(!mcAtom)
{
var mcAtom={
	layerPos:localStorage.getItem('layerPos')==null ? 'left' : localStorage.getItem('layerPos'),
	ALLCHECKED:false,
	downLinks:[],
	mcQueue:[],
	toraQueue:[],
	$:jQuery,
	downlst:"",
	checkboxs:[],
	lastAddedCheckbox:0,
	lastChecked:0,
requestMC:function(requestFiles)
{
	if(requestFiles.length>0)
	{
	setTimeout(
	function()
	{
	  GM_xmlhttpRequest({
	  method: "GET",
	  headers: {
			'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Cookie': document.cookie
		},
	  url: requestFiles[0]['Addr'],
	  onreadystatechange:function(responseDetails){
		if (responseDetails.readyState == 2)
				{
					var name=requestFiles[0]['Addr'];
					var popText='正在提取'+ name +'中，请稍候';
					GM_log(popText);
					mcAtom.popUpLoading(popText);
				}
		else if (responseDetails.readyState == 4)
				{	$.unblockUI(); }
		},
	  onload: function(response) {
		//GM_log(response.responseText);
		var mcInfo=mcAtom.analyzeMC(response.responseText);
		mcAtom.downLinks.push({
							'fileName':'',
							'Addr':response.responseText ,
							'waitTime':'0',
							'requestAddr':requestFiles[0]['Addr'],
							'size':'0',
							'hash':'0',
							});
		requestFiles.shift();
		mcAtom.requestMC(requestFiles);
	  }  
	});
	},
	0);
	}
	else
	{
		mcAtom.$.growlUI('MCFETCH：', '提取完成'); 
		mcAtom.showAddress();
	}
},
analyzeMC:function(page)
{
	try{
	var XPH=page.match(/xph\ =\ \'(.*?)\';/)[1];
	var CPH=page.match(/cph\ =\ \'(.*?)\';/)[1];
	var NPH=page.match(/nph\ =\ \'(.*?)\';/)[1];
	var CPP=page.match(/cpp\ =\ \'(.*?)\';/)[1];
	var NPU=page.match(/npu\ =\ \'(.*?)\';/)[1];
	var filename=page.match(/dl-text.*[\s\S]*?<p>([\s\S]*?)<span/)[1].trim();
	var hash=page.match(/dl-hashcode\">SHA-1:(.*?)<\/span>/);
	var size=page.match(/dl-stats><var>(.*?)<\/var>/)[1];
	var waitTime=page.match(/var\ cpc\ =\ parseInt\(\'(.*)\'\)/);
	var fileO=page.match(/\+npu\+\"\/\"\+\"(.*?)\"\);/)[1];
	var outputUrl="http://www.jsharer.com/download/mc/"+CPH+"/"+XPH+"/"+NPH+"/"+CPP+"/"+NPU+"/"+fileO;
	return {'size':size,
	'hash':hash ? hash[1].trim() : null ,
	'filename':filename,'url':outputUrl,
	'waitTime':waitTime ? waitTime[1] : '0'};
	}
	catch(err)
	{
		GM_log(err);
		var outputUrl="文件提取失败，可能被锁定或者被删除";
		var waitTime="-1";
		return {'url':outputUrl,'waitTime':waitTime };
	}
},
scanBlog:function()
{
	var pageFiles=$('.postlink');
	if (pageFiles.length>0)
	{
			for(i=0;i<pageFiles.length;i++)
		{
			var archor=$(pageFiles[i]);
            var addr=archor.attr('href');
            var pAddr=addr.match(/http:\/\/rawscans.com\/forum\/protect.*/);
            if(pAddr!=null)
            {
                var lid=addr.match(/http:\/\/rawscans\.com\/forum\/protect\.php\?id=(.*)/)[1]
                var span=archor.parent();
                var checkbox=$('<input type="checkbox" class="mcCheck"/>');
                checkbox.attr('id','checkbox-#'+mcAtom.lastAddedCheckbox);
                span.prepend(checkbox);
				//prependPoint.prepend(checkbox);
                mcAtom.checkboxs.push({'lid':lid, 'checkbox':checkbox,'id':mcAtom.lastAddedCheckbox});
				mcAtom.lastAddedCheckbox+=1;              
            }
		}
	}
},
checkAll:function()	
{
	if(mcAtom.ALLCHECKED)
	{
		$(':checkbox').attr('checked',false);
		mcAtom.ALLCHECKED=false;
	}
	else
	{
		$(':checkbox').attr('checked',true);
		mcAtom.ALLCHECKED=true;
	}
},
fetchChecked:function()
{
	mcAtom.downLinks=[];
	mcAtom.mcQueue=[];
	var checkedBox=$(':checked');
	$.each(checkedBox,function(i,n){
		className=n.className;
		if(className=='mcCheck')
		{
			var addr=$(n).siblings('a').attr('href');
            //alert(addr)
			mcAtom.mcQueue.push({'fileName':'','Addr':addr});
		}
	});
	if(mcAtom.mcQueue.length>0)
	{
	mcAtom.requestMC(mcAtom.mcQueue);
	}	    
},
showAddress:function()
{
	mcAtom.addrBox=$('<div id="batchPublish"></div>')
					.append('<div id="batchHeader"></div>')
					.append('<div id="batchBar"><ul style="float:left;list-style=none"></ul></div>')
					.append('<div id="batchContent" style="float:left;clear:both"><textarea></textarea></div>')
	
	mcAtom.addrBox.find('.mcTab').css('display','none');
	
	mcAtom.addrBox.find('#batchHeader')
	.append('<a style="float:right" id="close_btn" href="javascript:mcAtom.closeBox();">Close</a>');
	
	batchContent=mcAtom.addrBox.find('#batchContent');	
	
	mcAtom.addrBox.find('#batchBar ul li:first a').css('color','red');
	
	mcAtom.addrBox.find('#batchBar ul li a').click(function(e){
		$('#batchBar ul li a').css('color','black');
		$(this).css('color','red');
		e.stopPropagation();
		var catchId=$(this).attr('href').split('#')[1];
		$.each($('.mcTab'),function(i,n){
			if(n.id==catchId)
			{
				$(n).css('display','block');
			}
			else
			{
				$(n).css('display','none');
			}
		});
		//GM_log(catchId);
		//batchContent.empty();
		//batchContent.append($(catchId).clone().css('display','block'));

	});
	
	var tempString_instant="";
	var count_instant=0;
	
	for (i=0;i<mcAtom.downLinks.length ;i++ )
	{
		tempString_instant += mcAtom.downLinks[i]['fileName']+":\n"+mcAtom.downLinks[i]['Addr']+"\n";	
		count_instant += 1;		
	}
	//mcAtom.addrBox.find('#instant_archor').html('Links('+count_instant+')');
	
	mcAtom.addrBox.find('#batchContent textarea').val( tempString_instant );
	
	mcAtom.addrBox.find('textarea').css({'width':'500px','height':'250px'});
	mcAtom.$.blockUI({message:mcAtom.addrBox,css:{width:"520px",height:"300px"}});

},
popUpLoading:function(popInfo)
{
	mcAtom.loadingBar.find('#popupMessage').html(popInfo);
	mcAtom.$.blockUI({message:mcAtom.loadingBar});
},
closeBox:function()
{
	mcAtom.$.unblockUI();
},

createButton:function(archor)
{
	archor.css('display','block');
	var controlButton=$('<div class="controlButton"></div>');
		controlButton.css({
		'border-radius':'8px',
		'border':'#ccc solid 1px',
		'line-height':'18px',
		'margin':'4px 2px',
		'float':'left',
		'width':'110px',
		'height':'20px',
		'text-align':'center',
		'background-color':'transparent'
		});	
	return controlButton.append(archor);
},
appendButton:function(layer,button)
{
	layer.append(button);
},
changePos:function(pos)
{
	var layer=$('#btLayer');
	var layerWidth=layer.width();
	if(pos=='left')
	{
		$('#btLayer').css('left',0);
		localStorage.setItem('layerPos','left');
	}
	else
	{
		$('#btLayer').css('left',document.width - layerWidth - 5 );
		localStorage.setItem('layerPos','right');
	}
},
initButton:function()
{
	var top=document.documentElement.clientHeight/2;
	var buttonLayer=$('<div id="btLayer"></div>');
		buttonLayer.css({
		'position':'fixed',
		'top':top,
		'width':'120px',
		'height':'88px',
		'z-index':'9999',
		'background-color':'transparent',
		'border':'#F3F9FF solid 2px',
		});	
	var fetchChecked=mcAtom.createButton($('<a href="javascript:mcAtom.fetchChecked();">fetch checked</a>'));
	var selectAll=mcAtom.createButton($('<a href="javascript:mcAtom.checkAll();">(Un)Select All</a>'));
	var showAddr=mcAtom.createButton($('<a href="javascript:mcAtom.showAddress();">Show Result</a>'));
	
	
	mcAtom.appendButton(buttonLayer,selectAll);
	mcAtom.appendButton(buttonLayer,fetchChecked);
	mcAtom.appendButton(buttonLayer,showAddr);	
	
	$('body').prepend(buttonLayer);
	
	$('.layerPos[value='+mcAtom.layerPos+']')[0].checked=true;
	mcAtom.changePos(mcAtom.layerPos);
	
	$('.layerPos').click(function()
	{
		this.value=='left' ? mcAtom.changePos('left') : mcAtom.changePos('right');
		GM_log($('#btLayer').css('right'));
	});
},
getPopWindow:function(content)
{     
    var my_window = window.open("", "flashgot", "status=1,width=400,height=450,scrollbars=1");
     my_window.document.write(content);
     return my_window;
},
initPage:function()
{
	unsafeWindow.mcAtom=mcAtom;
	mcAtom.scanBlog();
	mcAtom.initButton();	
}
};
}

$(document).ready(function(){
mcAtom.initPage(); 
});
}
})();
