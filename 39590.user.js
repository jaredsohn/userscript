// ==UserScript==
// @name           TraumachickenBlogImageViewer
// @namespace      http://blog.livedoor.jp/traumachicken/
// @include        http://blog.livedoor.jp/traumachicken/
// ==/UserScript==
(function(){
	
	//サムネイルのサイズ
	var imgw = 50;
	var imgh = 36;
	//サムネイルの最大数
	var imgMaxN = 20;
	
	getImg();
	
	function getImg(){
		
		GM_xmlhttpRequest({
			method : "GET",
			url : document.URL + "index.rdf",
			onload : function (res) {
				
				var imgN = 0;
				
				var thumbnail = document.createElement("div");
				thumbnail.style.display = "block";
				
				var rdf = document.createElement("div");
				rdf.innerHTML = res.responseText;
				
				Array.slice.call([], rdf.getElementsByTagName("rdf:li")).forEach(function(t){
				
					GM_xmlhttpRequest({
						method : "GET",
						url : t.getAttribute("rdf:resource"),
						onload : function (resres) {
							
							var r = document.createElement("div");
							r.innerHTML = resres.responseText;
							
							Array.slice.call([], r.getElementsByClassName("pict")).forEach(function(image){
								if(image.parentNode.getAttribute("class")=="main"){
									image.setAttribute("width",imgw);
									image.setAttribute("height",imgh);
									//thumbnail.appendChild(image.cloneNode(true));
									
									imgN ++;
									
									if(imgN <= imgMaxN){
										thumbnail.appendChild(image.cloneNode(true));
									}
									
								}else{
									image.setAttribute("width",imgw);
									image.setAttribute("height",imgh);
									//thumbnail.appendChild(image.parentNode.cloneNode(true));
									
									imgN ++;
									
									if(imgN <= imgMaxN){
										thumbnail.appendChild(image.parentNode.cloneNode(true));
									}
									
								}
							});
						}
					});
				});
				
				$X("//div[@class='description']")[0].appendChild(thumbnail);
			}
		});
	}
	
	
	function $X (exp, context) {
		context || (context = document);
		var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
			return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
				context.namespaceURI || document.documentElement.namespaceURI || "";
		});

		var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
			switch (result.resultType) {
				case XPathResult.STRING_TYPE : return result.stringValue;
				case XPathResult.NUMBER_TYPE : return result.numberValue;
				case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
				case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
					// not ensure the order.
					var ret = [], i = null;
					while (i = result.iterateNext()) ret.push(i);
					return ret;
			}
		return null;
	}
	
})();

