// ==UserScript==
// @name           douban_xmlib
// @namespace      douban_xmlib
// @include        http://www.douban.com/subject/*
// @include        http://www.douban.com/isbn/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @author		   	PatrickZhang/k@z-pk.com
//
// ==/UserScript==

var douban_xmlib=function(){

	var bookInfo={bookData:''};
	var timeOut= {'max':8000,'elapsed':0,'interval':100} //超时时间(ms)
	
	var ParseBookInfo =function(){
		var datas= bookInfo.bookData;
		bookInfo.bookRecNo = $(datas).find('BOOKRECNO').text(); //书号
		bookInfo.bookCountInLib = $(datas).find('ROWSET1 > ROW').length; //馆藏数目
		bookInfo.bookStates = function(){
															var arr=[];//GM_log("book "+bookInfo.bookCountInLib);
															for(var i=1;i<=bookInfo.bookCountInLib;i++){
																GM_log("book "+i);
																var bookState={};
																$(datas).find('ROWSET1 > ROW[num='+i+']').children().each(function(i){bookState[$(this).attr("tagName").toLowerCase()]=$(this).text()});
																bookState.state = $(datas).find("HOLDSTATE > ROWSET > ROW > STATETYPE").filter(function() {  return $(this).html() == bookState['state'];}).siblings('STATENAME').text();
																bookState.curlib = $(datas).find("ROWSET3 > ROW > LIBCODE").filter(function() {  return $(this).html() == bookState['curlib'];}).siblings('SIMPLENAME').text();
																bookState.curlocal = $(datas).find("ROWSET4 > ROW > LOCALCODE").filter(function() {  return $(this).html() == bookState['curlocal'];}).siblings('NAME').text();

																arr.push(bookState);
																delete bookState;
															}
															return arr;
													}();
	};


	var GetBookByISBN=function(isbn){ //get book search page (xml) by ISDN
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://interweb.xmlib.net:8080/webopac/websearch/bookSearch?pageNo=1&filter=%28isbn%3A'+isbn+'%29+AND+%28hasholding%3Ay%29&cmdACT=list&xsl=BOOK_list.xsl&mod=oneXSL&columnID=1&searchSign=&bookType=all%3Aundefined&marcType=undefined%3A%E5%85%A8%E9%83%A8&libNUM=7&ISFASTSEARCH=true&hasholding=y&col1=isbn&val1='+isbn+'&matching=radiobutton&marcformat=all&booktype=all&startPubdate=&endPubdate=&sortSign=score_sort&orderSign=true&raws=10&hasholdingCheckbox=y',
				headers: {
				'User-agent': "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; GTB0; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; InfoPath.2)",
				'Accept': '*/*',
				},
				onload: function(responseDetails) {
					
											var GetBookInfoByRecNo=function(recNo){ //get book page (xml) by book record id
													GM_xmlhttpRequest({
														method: 'GET',
														url: 'http://interweb.xmlib.net:8080/webopac/websearch/bookSearch?cmdACT=detailmarc&xsl=listdetailmarc.xsl&bookrecno='+recNo,
														headers: {
														'User-agent': "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; GTB0; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; InfoPath.2)",
														'Accept': '*/*',
														},
														onload: function(responseDetails) {
															bookInfo.bookData = responseDetails.responseText||'';
														}
													});
											}($(responseDetails.responseText).find('BOOKRECNO').text());
									
								}
			}
			);

	};
	
	///////////////////
	var isbn=function(){return $('span:contains("ISBN:")').parent().text().replace(/^ISBN: ((\d|-){10,13}) .+$/,"$1")||"No ISBN Found!";}();
	if(isbn!="No ISBN Found!"){	
		GetBookByISBN( isbn );
	
		var waitResponse=function(){
			var intvervalId=window.setInterval(
				function(){
					timeOut.elapsed+=timeOut.interval;
					//GM_log(timeOut.elapsed+'/intval:'+timeOut.interval);
					if(bookInfo.bookData!=''){
						ParseBookInfo();
						$(".gray_ad").after("<div id='xmlib-link' class='indent'><h2>厦门图书馆馆藏 · · · · · ·<span class='pl'>(<a target='_blank' href='http://interweb.xmlib.net:8080/webopac/websearch/bookSearch?cmdACT=detailmarc&xsl=listdetailmarc.xsl&bookrecno="+bookInfo.bookRecNo+"'>"+ bookInfo.bookCountInLib +"本</a>)</span></h2>"+
																	function(){
																		var htmlStr="<ul class='bs'>";
																		
																		$.each(bookInfo.bookStates,function(i,n){htmlStr+="<li>[<span style='color:red'>"+n.state+"</span>] "+n.callno+" / "+n.curlib+" / "+n.curlocal+"</li>"});
																		return htmlStr+"</ul>";
																		}()+"</div>"
																);
						window.clearInterval(intvervalId);
						
					}
					if(timeOut['elapsed'] >= timeOut['max']){
						GM_log("Request to XMLIB timeout!");
						window.clearInterval(intvervalId);
					}
				},timeOut.interval);
		}();
	}
	
	function var_dump(obj) {
  if(typeof obj == "object") {
     return "Type: "+typeof(obj)+((obj.constructor) ? "\nConstructor: "+obj.constructor : "")+"\nValue: " + obj;
  } else {
     return "Type: "+typeof(obj)+"\nValue: "+obj;
  }
	}

}();