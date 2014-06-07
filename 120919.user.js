// ==UserScript==
// @name          Space 
// @namespace     http://dobroserver.ru
// @description	  Альтернативный подход к созданию и редактированию постов на gamer.ru.
// @include       http://*.gamer.ru/*
// @include       http://gamer.ru/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

(function($) {

jQuery(document).ready(function() {

	$('#post_body').after('<div id="preview">test</div>');


	$.fn.emulate = function() {
		str = $(this).val();
		
		
		//str = str.replace(/\n+<\/div>/g, '</div>');
		
		

		// Markdown
		str = str.replace(/<strong>([\s\S]*?)<\/strong>/g, "*$1*");
		str = str.replace(/<em>([\s\S]*?)<\/em>/g, "_$1_");
		str = str.replace(/<del>([\s\S]*?)<\/del>/g, "--$1--"); 
		str = str.replace(/\n?<ul>([\s\S]*?)<\/ul>/g, ul);
		function ul(y, x) {
			x = x.replace(/\s*<li>([\s\S]*?)<\/li>/g, "\n* $1");
			return x+"\n";
		}
		
		
		str = str.replace(/\n?<ol>([\s\S]*?)<\/ol>/g, ol);
		function ol(y, x) {
			i = 1;
			x = x.replace(/\s*<li>([\s\S]*?)<\/li>/g, olli);			
			function olli(y, x) {x = x.replace(x, "\n"+ i++ +". $&");	return x;}
			
			return x+"\n";

		}
		
		// ссылки
		str = str.replace(/<a href=["'](.+?)["']>(.+?)<\/a>/g, "[$2]($1)");
		// картинки
		//str = str.replace(/<img.*?src=["'](.+)["']alt=>(.+)<\/a>/g, "($2)($1)"); />
		
		// заголовки
		str = str.replace(/<h([23])>(.*?)<\/h\1>/g, headers);
		function headers(x,y,text) {
			
			if (y == 2)   { hmark ='='; }
			else          { hmark ='-'; }
			
			mark='';
			
			for (var i = 1; i <= text.length; i++) {mark=mark+hmark;}
			
			return text+"\n"+mark+"\n\n";}
			
		str = str.replace(/<h4>(.*?)<\/h4>/g, "#### $1\n\n");	
		str = str.replace(/<h5>(.*?)<\/h5>/g, "##### $1\n\n");
		str = str.replace(/<h6>(.*?)<\/h6>/g, "###### $1\n\n");	
		
		// цитата >слово -> <blockquote>слово</blockquote>
		str = str.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, ">$1");
		
		// таблицы
		str = str.replace(/<table>([\s\S]*?)<\/table>/g, "$1");
		str = str.replace(/<tr>(.*?)<\/tr>/g, "$1|\n");
		str = str.replace(/<td>(.*?)<\/td>/g, "|$1");
		
		// спойлер
		str = str.replace(/\n+<\/div>/g, '</div>');
		str = str.replace(/<div class='spoiler_title plus'>(.+?)<\/div><div class='spoiler_body'>([\s\S]*?)<\/div>/g, "+$1\n$2\n+\n\n");
		
		
		blocks = /<(h[1-6]|pre|ul|ol|table|blockquote)>([\s\S]*?)<\/\1>/gi;		
		str = str.replace(/<(h[1-6]|pre|ul|ol|table|blockquote)>([\s\S]*?)<\/\1>/gi, '$&\n\n');
		
		$(this).val(str);

	}
	
		$.fn.markdown = function() {
		str = $(this).val();


		//+ Wordpress
		//str = str.replace(/\<!--more--\>/g, "<div class='more'>more</div>");

		// Markdown
		
		// ссылки
		str = str.replace(/\[([^\]]+?)\]\(((#|\.?\.?\/|https?:\/\/)[^\)]+)\)/g, "<a href='$2'>$1</a>");
		str = str.replace(/\((https?:\/\/(\S+?))\)/g, "<a href='$1'>$2</a>");
		
		// картинки 
		str = str.replace(/\[([^\]]+?)\]\[((\/|https?:\/\/)[^\)]+)\]/g, "<img src='$2' alt='$1' >");
		str = str.replace(/\[((\/|https?:\/\/)[^\)]+)\]/g, "<img src='$1' alt='' >");
		
		ignore = /(https?:\/\/[^"')\s]+|[^\S]@[\s\S]*?@[^\S])/gi;
				
		//ignore = /<a.*?>([\s\S]*?)<\/a>?/gi;
		//ignore = /sorb/gi;		

		// 1. Сохраняем в массив блочные элементы и заменяем их на «пустышки», чтобы исключить их обработку парсером.
		i = 0; md_buffer = new Array();
		str = str.replace(ignore, storeignores);

		function storeignores(x) {
			//x.replace(/[^\S]@[\s\S]*?@[^\S]/, "\n$&");
			//x.match(/[^\S]@[\s\S]*?@[^\S]/);
			md_buffer[i] = x;
			
			if (x.match(/[^\S]@[\s\S]*?@[^\S]/g)) { return '\nmd_buffer_'+i++; }
			
						
			return 'md_buffer_'+i++;
		}
		
		// заголовки
		str = str.replace(/(.*?)\n===+/g, "<h2>$1</h2>");
		str = str.replace(/(.*?)\n---+/g, "<h3>$1</h3>");
		
				
		str = str.replace(/###### (.*?)( ######)?\n/g, "<h6>$1</h6>");
		str = str.replace(/##### (.*?)( #####)?\n/g, "<h5>$1</h5>");
		str = str.replace(/#### (.*?)( ####)?\n/g, "<h4>$1</h4>");
		str = str.replace(/### (.*?)( ###)?\n/g, "<h3>$1</h3>");

		// *слово*   -> <strong>слово</strong>
		str = str.replace(/\*(\S.*?\S|[^*])\*/g, "<strong>$1</strong>");

		// -слово-   -> <del>слово</del>, если слово не цифра
		str = str.replace(/(\s)-(\S+)-(\s)/g, "$1<del>$2</del>$3");
		// --слово-- -> <del>слово</del>
		str = str.replace(/--(.+?)--(?!>)/g, "<del>$1</del>");

		// _слово_ -> <em>слово</em>
		str = str.replace(/(\s)_([\s\S]+?)_(\s)/g, "$1<em>$2</em>$3");
		
		// __слово__ -> <em>слово</em>
		//str = str.replace(/__(\S+)__/g, "<em>$1</em>");
		



		// элементы списков	

		// ненумерованные списки
		str = str.replace(/^(\* )((.+\n)+)/gm, "<ul><li>$2</li></ul>");
		// нумерованные списки
		str = str.replace(/^([0-9]*\. )((.+\n)+)/gm, "<ol><li>$2</li></ol>");
		
		str = str.replace(/\n([0-9]*\.|\*) /g, "</li><li>");
		
		str = str.replace(/<li>([\s\S]*?)<\/li>/g, br);
		function br(x) {
			x = x.replace(/\n(?!<\/li>)/g, '<br />');
			return x;
		}
				
		// таблицы
		// столбцы
		str = str.replace(/\|([^|\n]+)/g, "<td>$1</td>");
		// строки
		str = str.replace(/\n?(<td>(.*)<\/td>)\|/g, "<tr>$1</tr>");
		// обёртка
		str = str.replace(/(<tr>(.+)<\/tr>\n)+/g, "<table>$&</table>");

		// цитата >слово -> <blockquote>слово</blockquote>
		str = str.replace(/\n>(.+\n)/g, "<blockquote>$1</blockquote>");

		// спойлер
		str = str.replace(/(\n)\+(.*)\n([\s\S]*?)\+(\n)/g, "$1</p><div class='spoiler_title plus'>$2</div><div class='spoiler_body'><p>$3</p></div><p>$4");
		
		// 2. Заменяем «пустышки» на сохранённые в массив блочные элементы.
		i = 0;

		str = str.replace(/md_buffer_[0-9]+/g, returnignores);
		function returnignores(x) {
			return md_buffer[i++];
		}

		// код
		str = str.replace(/[^\S]@([\s\S]+?)@[^\S]/g, "<pre><div class='select_all'>Выделить код</div><code>$1</code></pre>");
		
		
		//$('#contentpreview').html(str);
		//$('#htmlpreview').text(str);

	}

	//$('#content').emulate();
	

	$.fn.preview = function() {
		//str = $(this).val();	
		
		blocks = /<(h[1-6]|pre|ul|ol|table|blockquote)>([\s\S]*?)<\/\1>/gi;
		//blocks = /<pre>([\s\S]*?)<\/pre>/gi;	

		// 1. Сохраняем в массив блочные элементы и заменяем их на «пустышки», чтобы исключить их обработку парсером.
		i = 0;
		preview_buffer = new Array();
		str = str.replace(blocks, storeblocks);

		function storeblocks(x) {
			preview_buffer[i] = x;
			return "preview_buffer_"+i++;
		}
		
		// Формируем абзацы.
		str = ('<p>' + str.replace(/\n\s*\n+/g, '</p><p>') + '</p>');

		// Вытаскиваем из них блочные элементы.
		
		str = str.replace(/preview_buffer_[0-9]+/g, '</p>$&<p>');

		// Чистка от "<p></p>".
		str = str.replace(/<p>(\s*)<\/p>/gi, "");

		// Формируем преводы строк (<br />)  игнорируя "/n<p/>"...
		str = str.replace(/\n(?!(\<\/p\>))/g, "<br />");
		// ... и "<p>/n".
		str = str.replace(/<p>\s*<br \/>/g, "<p>");
		
		//str = str.replace(/\n+/g, "");

		// 2. Заменяем «пустышки» на сохранённые в массив блочные элементы.
		i = 0;

		str = str.replace(/preview_buffer_[0-9]+/g, returnblocks);
		function returnblocks(x) {
			return preview_buffer[i++];
		}


		$('#preview').html(str);
		//$('#htmlpreview').text(str);

	}
	
	$('#content').emulate();
	$('#content').markdown();
	$('#content').preview();
	$('#content').keyup(function() {
		$(this).markdown();
		$(this).preview();
	});

	$.fn.addtag = function(before, after) {
		var textArea = $('#content');
		var start = textArea[0].selectionStart;
		var end = textArea[0].selectionEnd;
		var replacement = before + textArea.val().substring(start, end) + after;
		textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, textArea.val().length));
	}

	$('#toolbar #bold').click(function() {
		$(this).addtag('*', '*')
		$('#content').preview()
	});

	$.fn.list = function(type) {
		var textArea = $('#content');
		var start = textArea[0].selectionStart;
		var end = textArea[0].selectionEnd;
		var replacement = textArea.val().substring(start, end).replace(/^(.*)$/gm, type + " " + "$&");
		textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, textArea.val().length));
	}

	$('#toolbar #ul').click(function() {
		$(this).list('*')
		$('#content').preview()
	});

	$('#toolbar #ol').click(function() {
		$(this).list('.')
		$('#content').preview()
	});

	$.fn.table = function(rows, columns) {

		//for i=1 to rows {}

		var textArea = $('#content');
		var start = textArea[0].selectionStart;
		var end = textArea[0].selectionEnd;		
		
		//var column = '<td>+1+</td>';
		column ='';
		for (var i = 1; i <= columns; i++) {
   			column +='<td>'+i+'</td>';
		}
		
		//var row = '<tr>+column+</tr>';
		row = '';
		for (var i = 1; i <= rows; i++) {
   			row += '\n' + '<tr>'+column+'</tr>';
		}
		
		table ='<table>'+row+'\n'+'</table>'		
		
		textArea.val(textArea.val().substring(0, start) + table + textArea.val().substring(end, textArea.val().length));
	}

	$('#toolbar #table').click(function() {		
		$('#toolbar').after('<div id="modal"><input id="rows" type="text" /><input id="columns" type="text" /><input id="tablebutton" type="button" value="Go" /></div>');
		
	});
	
	$('#modal #tablebutton').live("click", function() {
		rows    = $('#modal #rows').val();
		columns = $('#modal #columns').val();
		$('#modal').remove()		
		$(this).table(rows, columns);
		$('#content').preview();
	});
	
	$.fn.url = function(href) {

		//for i=1 to rows {}

		var textArea = $('#content');
		var start = textArea[0].selectionStart;
		var end = textArea[0].selectionEnd;		
		var replacement = '(' + textArea.val().substring(start, end) + ')('+href+')';
		textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, textArea.val().length));
	}

	$('#toolbar #url').click(function() {		
		$('#toolbar').after('<div id="modal"><input id="href" type="text" value="http://" /><input id="urlbutton" type="button" value="Go" /></div>');
		
	});
	
	$('#modal #urlbutton').live("click", function() {
		href    = $('#modal #href').val();
		$('#modal').remove()		
		$(this).url(href);
		$('#content').preview();
	});
	
	// Превращаем md в html по наведению на кнопку отправки
	$('#publish').mouseover(function() {		
	
	stra = $('#content').val();
	
	$('#content').markdown();
	$('#content').preview();
	
	$('#content').val(str);
		
	});
	
	$('#publish').mouseout(function() {		
	
	$('#content').val(stra);
		
	});		
	
});

})(jQuery)
