// ==UserScript==
// @name           批量打开&保存到微盘
// @namespace      http://ishare.iask.sina.com.cn
// @version	       0.2.1
// @namespace      http://userscripts.org/users/useridnumber/dfifcw
// @include		   http://ishare.iask.sina.com.cn/f/*
// @include		   http://ishare.iask.sina.com.cn/*
// @include		   http://iask.sina.com.cn/u/*
// @include		   http://iask.sina.com.cn/*
// ==/UserScript==

function book_download()
{
	var book = document.getElementById("save_to_vidsk");
	
	if(book)
	{
		//alert(book.href);
		book.click();
        setTimeout("window.close()",3000);
	}
}	

function open_book(book_html)
{
    var w = document.open(book_html,'','width=1024,height=768');
}

function sleep(n)
{
    var start=new Date().getTime();
    while(true) if(new Date().getTime()-start>n) break;
}

function open_all_books_html()
{
	//alert("open_all_books_html");

	var books = document.getElementsByClassName("heading3");
    
    var interval = 0;
	
	for(var i=0; i<books.length; i++)
	{
		//alert(books[i].innerHTML);
		
		if(books[i].childNodes.length >= 2)
		{
			var book_html = books[i].childNodes[1].href;
            
			if(book_html)
            {
                setTimeout("open('"+book_html+"','','width=1024,height=768')",interval);
                interval += 3000;
				//open_book(book_html);
            }
		}
	}
}

function insert_download_button()
{
	var title = document.getElementsByClassName("v1_mydoc_tit");
	var html = "<input value='批量打开&保存到微盘' id='downthemall' onclick='' type='button'/>";
	if(title[0])
		title[0].insertAdjacentHTML("afterEnd",html);
			
	var button = document.getElementById("downthemall");
	if(button)
	{
		if(button.addEventListener)
		{
			//alert("addEventListener");
			button.addEventListener("click",open_all_books_html,false);
		}
		else if(button.attachEvent)
		{ 
			//alert("attachEvent");
			button.attachEvent("onclick",open_all_books_html);
		}
		else
		{
			alert("no event bind");
		}
	}
}


if(document.getElementById("save_to_vidsk"))
    book_download();
else if(document.getElementsByClassName("v1_mydoc_tit"))
    insert_download_button();