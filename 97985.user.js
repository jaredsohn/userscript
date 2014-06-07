// ==UserScript==
// @name              U-15
// @namespace         album.blog.yam.com
// @include           http://album.blog.yam.com/oolontea&coc=*
// ==/UserScript==

var insertID = document.getElementById('albumList');
var insertDiv = document.createElement('div');
insertDiv.id = 'add';

var ta = document.createElement('textarea');
ta.id = 'taText';
ta.readOnly = 'true';
ta.rows = '8';
ta.cols = '80';

var allBtn = document.createElement('button');
allBtn.addEventListener('click',function(event){
    getAll();
},true);
allBtn.innerHTML = 'all';

var clearBtn = document.createElement('button');
clearBtn.addEventListener('click',function(event){
    d.value = '';
},true);
clearBtn.innerHTML = 'clear';

insertDiv.appendChild(ta);
insertDiv.appendChild(allBtn);
insertDiv.appendChild(clearBtn);

insertID.insertBefore(insertDiv, insertID.firstChild);

var insertBtn = document.getElementsByClassName('album');

for(var i=0; i<insertBtn.length; i++){
    var addBtn = document.createElement('button');
    addBtn.addEventListener('click',function(event){	
	getSet(this);	
    },true);
    addBtn.id = i.toString();
    addBtn.innerHTML = 'add';

    insertBtn[i].appendChild(addBtn);
}

var d = document.getElementById('taText');

function getAll(){
    d.value = '';
    var jpg_set = document.evaluate('//div[@class="albumList_info"]/a',document,null,7,null);

    for(var count=0; count<jpg_set.snapshotLength; count++){
	var link = jpg_set.snapshotItem(count).toString();
	getUrlList(link);
    }
}

function getSet(obj){
    var link = document.getElementById(obj.id).parentNode.childNodes[7].childNodes[1].toString();
    getUrlList(link);
}

function getUrlList(url){
    GM_xmlhttpRequest({
	    method:'GET', 
	    url:url,
	    onload:function(x){
		var parser = document.createElement('div'); 
		parser.innerHTML = x.responseText;
		var jpg = document.evaluate('//img[@src and @title and not(@width)]/@src', parser, null, 7, null);

		for(j=0; j<jpg.snapshotLength; j++){
		    d.value += jpg.snapshotItem(j).textContent.replace(/t_/, "");
		    d.value += '\n';
		}
	    
		var pageID = parser.getElementsByClassName('pageCtrl');
	 
		if(pageID[0].childNodes.length != 1){
		    var pageURL = document.evaluate('//div[@class="pageCtrl"][1]/a', parser, null, 7, null);   
		    for(var k=0; k<pageURL.snapshotLength-2; k++){
			GM_xmlhttpRequest({
			    method:'GET', 
			    url:pageURL.snapshotItem(k).toString(),
			    onload:function(y){
				var parser2 = document.createElement('div');
				parser2.innerHTML = y.responseText;
				var jpg2 = document.evaluate('//img[@src and @title and not(@width)]/@src', parser2, null, 7, null);
				for(l=0; l<jpg2.snapshotLength; l++){
				    d.value += jpg2.snapshotItem(l).textContent.replace(/t_/, "");
				    d.value += '\n';
				}
				parser2.innerHTML = '';
			    }
			});
		    }
		}
		parser.innerHTML = '';
	    }
	});
}

