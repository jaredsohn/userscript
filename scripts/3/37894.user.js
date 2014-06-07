// ==UserScript==
// @name            Cy Monkey
// @namespace   thenow.yo2.cn
// @description	  改善澄缘似海的版块界面，提高阅读效率
// @version		  2.0.3
// @author         枉然不供
// @include        http://*.z888.net/forum*
// @include        http://z888.net/forum*
// ==/UserScript==
var NextPageLink;
var pageCount = 1; // 翻页计数
var IsLoadingNext; // 是否正在加载下一页
var ResultCellsDiv = matchNode('//table[@class="datatable"]').snapshotItem(0);
NextPageLink = matchNode('//a[@class="next"]').snapshotItem(0);
IsLoadingNext = false;

var iframeIndex = 0;
// 自动加载下一页
function watch_scroll(){
    // 如果剩余页面高度小于一倍窗口高度
    if (document.body.scrollHeight - window.scrollY < window.innerHeight * 2 && NextPageLink && !IsLoadingNext) {
        IsLoadingNext = true;
        //翻页分隔符
        var splitTbody = document.createElement('tbody');
        splitTbody.innerHTML = '<tr><td colspan="6"><center><img src="http://www.ceo.gov.hk/gh/images/loading.gif"/></center></td></tr>';
        ResultCellsDiv.appendChild(splitTbody);
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: String(NextPageLink.href),
            overrideMimeType: 'text/xml; charset=gb2312',
            onload: function(d){
            	   splitTbody.setAttribute('style','background-color:#0099CC');
            	   splitTbody.innerHTML = '<tr><td colspan="6"><center>Cy Monkey 自动翻页。当前(<a href="' + NextPageLink.href + '">第 ' + (++pageCount) + ' 页</a>)。作者：<a href="http://thenow.yo2.cn" target="_blank">枉然不供</a>&nbsp;&nbsp;&nbsp;&nbsp;<a herf="javascript:void(0)" onclick="scrollTo(0,0);">回到顶部</a></center></td></tr>';
                var ContainerDiv = document.createElement('div');
                ContainerDiv.innerHTML = d.responseText;
                var resTables = matchNode('//table[@class="datatable"]/tbody', ContainerDiv);
                preView(ContainerDiv);
                if (resTables.snapshotLength > 0) {
                    for (i = 0; i < resTables.snapshotLength; i++) {
                        var resTable = resTables.snapshotItem(i);
                        ResultCellsDiv.appendChild(resTable);
                    }
                }
                
                NextPageLink = matchNode('//a[@class="next"]', ContainerDiv).snapshotItem(0);
                delete ContainerDiv;
                IsLoadingNext = false;
            }
        });
    }
}

var showPre = '<font color="#F00">【预览】</font>';
var hidePre = '<font color="#00F">【取消预览】</font>';
//添加预览按钮
function preView(title){
	var titleSubjects = matchNode('//span[@id]',title);
	if(titleSubjects.snapshotLength <= 0) return false;
	for(i = 0; i < titleSubjects.snapshotLength; i++){
		var titleSpan = titleSubjects.snapshotItem(i);
		if(titleSpan.id.indexOf('thread') <= -1) continue;
		var preViewButton = document.createElement('a');
		preViewButton.setAttribute('href','javascript:void(0)');
		preViewButton.innerHTML = showPre;
		preViewButton.addEventListener('click',function(event){
			var thisTb = document.getElementById(this.nextSibling.getAttribute('href'));
			if(!thisTb){
				var preViewLine = document.createElement('tbody');
				preViewLine.setAttribute('id',this.nextSibling.getAttribute('href'));
				preViewLine.setAttribute('class','showPre');
				preViewLine.innerHTML = '<tr><td colspan="6"><img src="http://www.ceo.gov.hk/gh/images/loading.gif"/></td></tr>';
				this.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(preViewLine,this.parentNode.parentNode.parentNode.parentNode.nextSibling);
				makePreView(this.nextSibling.href,preViewLine);
				this.innerHTML = hidePre;
				return false;
			}
			
			if(thisTb.getAttribute('class') == 'showPre'){
				this.innerHTML = showPre;
				thisTb.setAttribute('class','hidePre');
				thisTb.style.display = 'none';
			} else {
				this.innerHTML = hidePre;
				thisTb.setAttribute('class','showPre');
				thisTb.style.display = '';
			}
		},true);
		titleSpan.insertBefore(preViewButton,titleSpan.lastChild);
	}
}

//显示预览信息
function makePreView(tipLink,preViewLine){
	iframeIndex++;
	GM_xmlhttpRequest({
		method: 'GET',
		url: String(tipLink),
		overrideMimeType: 'text/xml; charset=gb2312',
		onload: function(content){
			var con = document.createElement('div');
			con.innerHTML = content.responseText;
			var fastPostIframe = document.createElement('iframe');
			fastPostIframe.setAttribute('width','0');
			fastPostIframe.setAttribute('height','0');
			fastPostIframe.setAttribute('name','fastPostIframe'+iframeIndex);
			
			var fastPostForm = matchNode('//form[@id="fastpostform"]',con).snapshotItem(0);//获取表单
			fastPostForm.appendChild(fastPostIframe);
			fastPostForm.setAttribute('target',fastPostIframe.getAttribute('name'));
			var fastPostTable = matchNode('//form[@id="fastpostform"]/table',con).snapshotItem(0);//获取表单内部表格
			fastPostTable.style.marginBottom = '0';
			fastPostTable.style.borderStyle = 'none';
			var fastAuthorTd = matchNode('//form[@id="fastpostform"]/table/tbody/tr/td',con).snapshotItem(0);//获取作者头像框
			var fastPostP = matchNode('//form[@id="fastpostform"]/table/tbody/tr/td/p',con).snapshotItem(0);//获取发表回复按钮框
				
			var fastPostButton = matchNode('//button[@id="fastpostsubmit"]',con).snapshotItem(0);//获取发布回复按钮
			var fastPostTr = matchNode('//form[@id="fastpostform"]/table/tbody/tr',con).snapshotItem(0);//获取表单所在表格中的行
			var fastPostNewTd = document.createElement('td');
			fastPostNewTd.setAttribute('align','center');
			fastPostNewTd.appendChild(fastPostButton);
			fastPostTr.appendChild(fastPostNewTd);
			
			var fastPostTextArea = matchNode('//textarea[@id="fastpostmessage"]',con).snapshotItem(0);//获取表单中的文件框
			fastPostTextArea.setAttribute('rows','1');
			var fastPostEditorTd = matchNode('//div[@class="editor_tb"]',con).snapshotItem(0);//获取表单工具栏
			fastPostEditorTd.style.width = '100%';
			fastPostTextArea.style.width = '99%';
			fastAuthorTd.parentNode.removeChild(fastAuthorTd);//删除作者头像框
			fastPostP.parentNode.removeChild(fastPostP);//删除原有回复按钮
			
			var firstPost = matchNode('//div[@class="t_msgfontfix"]',con).snapshotItem(0);
			preViewLine.innerHTML = '<tr><td colspan="6" class="preTd">'+firstPost.innerHTML+'</td></tr>';

			var postTr = document.createElement('tr');//放置回复行
			var postTdForm = document.createElement('td');//放置回复表单
			postTdForm.setAttribute('colspan','6');
			postTdForm.appendChild(fastPostForm);
			postTr.appendChild(postTdForm);
			preViewLine.appendChild(postTr);
		}
	});
}

function fastPost(form,fastPostTextArea){
	var formInputs = matchNode('//input',form);
	var newCon = fastPostTextArea.value;
	var strUrl = form.getAttribute('action')+'&formhash='+matchNode('//input[@name="formhash"]',form).snapshotItem(0).value+'&usesig='+matchNode('//input[@name="usesig"]',form).snapshotItem(0).value+'&message='+newCon+'&subject='+matchNode('//input[@name="subject"]',form).snapshotItem(0).value;
	alert(strUrl);
	GM_xmlhttpRequest({
		method: 'GET',
		url:String(strUrl),
		onload:function(d){
			alert('回复成功！');
		}
	});
}

// 用 XPath 匹配元素
function matchNode(xpath, root){
    var type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
    var doc = root ? root.evaluate ? root : root.ownerDocument : document;
    return doc.evaluate(xpath, root || doc, null, type, null);
}

//添加CSS
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.preTd table {border-width:0px ! important;} .preTd td {border-width:0px ! important;}');
preView(document);
window.addEventListener('load', watch_scroll, true);
window.addEventListener('scroll', watch_scroll, true);