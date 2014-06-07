// ==UserScript==
// @name            vrs
// @version    1.1.1
// @description     标引系统自动识别
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         http://code.jquery.com/ui/1.9.0/jquery-ui.js
// @require         http://craigsworks.com/projects/qtip2/packages/latest/jquery.qtip.min.js
// @match          http://*/candidate_list.php
// ==/UserScript==
(function(unsafeWindow) {
  // 你的代码被放在了这里
   //以下代码增加一键全选操作
   var op = $('.tableborder .header ~ tr:first');
   op.children().attr('colspan',1);
   var opb = $('<td colspan="9"><input type="button" value="一键操作" id="op" class="button"/></td>');
   op.append(opb);

   $('#op').click(function(){
   		$('.opClass').each(function(){
   			if ($(this).data('select')) {
   				$(this).click();
   			}
   		});
   });



   //以下代码开始遍历标引自动到百科查询
   var t = $('.category ~ tr');
   $('head').append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" />').append('<link rel="stylesheet" href="http://craigsworks.com/projects/qtip2/packages/latest/jquery.qtip.min.css" />');
   t.each(function(){
        var tr = $(this);
        var nameColumn = $(this).children('td:eq(1)');
        var linkColumn = $(this).children('td:eq(2)');
        var selectColumn = $(this).children('td:eq(3)');
        selectColumn.addClass('opClass');
        var dropColumn = $(this).children('td:eq(4)');
        dropColumn.addClass('opClass');
        var name = nameColumn.text();
        //console.debug(linkColumn.children()[0])//.attr('href','http://baike.baidu.com/search/word?word="+name+"&pic=1&sug=1')
   		
   		//console.debug(name);
   		if (name != '') {
            $(linkColumn.children()[0]).attr('href','http://baike.baidu.com/search/word?word='+name+'&pic=1&sug=1');
            linkColumn.append('[<a href="http://www.baidu.com/s?wd='+name+'" target="_blank">百度</a>]');
   			$.get("http://baike.baidu.com/search/word?word="+name+"&pic=1&sug=1", function(data){
                
				if (data.indexOf(name.toLocaleLowerCase()+'_百度百科') > 0) {
					selectColumn.data('select',true);
					var inner = $('<a id="tip'+name+'"><font color="red"></font></a>');
					nameColumn.wrapInner(inner);
                        //console.debug($(data).find('div'));
                        //console.debug('========================================================');
						$('#tip'+name).qtip(
						{
							content: {
								// Set the text to an image HTML string with the correct src URL to the loading image you want to use
								text: name,
                                
								title: {
									text: '百度百科 - '+name, // Give the tooltip a title using each elements text
									button: true
								}
							},
							position: {
								at: 'bottom center', // Position the tooltip above the link
								my: 'top center',
								viewport: $(window), // Keep the tooltip on-screen at all times
								effect: false // Disable positioning animation
							},
							show: {
								event: 'mouseover',
								solo: true // Only show one tooltip at a time
							},
							hide: 'unfocus',
							style: {
								classes: 'ui-tooltip-wiki ui-tooltip-light ui-tooltip-shadow'
							}
						});
				} else {
					dropColumn.data('select',true);
				}
			});
   		}
   });
})(window);

