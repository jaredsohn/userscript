// ==UserScript==
// @name        DARVA EDI to CSV
// @require		http://code.jquery.com/jquery-2.0.3.min.js
// @namespace   http://userscripts.org/users/523948
// @include     https://pro.darva.com/autoweb/toEdi.do*
// @version     1.1
// ==/UserScript==

var regexpId = /^.+_(.+)_.+$/;

function getTree(node)
{
	var tree = '';
	
	var nodes = node.parents('tr');

	if(nodes.length > 2)
	{
		nodes = $(nodes[1]).prev();
		
		if(nodes.length > 0)
		{
			nodes = nodes.find('span');
			
			if(nodes.length > 0)
			{
				var code = $(nodes[0]).attr('title');
				
				if(code.match(/^DC/))
				{
					if(tree != '')
					{
						tree = '_'+tree;
					}
					
					tree = code+tree;
				}
			}
		}
	}
	
	node.parents('div').each(function()
	{
		if(tree != '')
		{
			tree = '_'+tree;
		}
		
		var id = $(this).attr('id');
		var matchId = regexpId.exec(id);
		tree = matchId[1]+tree;
	});
	
	return tree;
}

var csv = ''

$('span').each(function()
{
	var code = $(this).attr('title');

	if(code.match(/^D[ET]/) && !$(this).parent().hasClass('txt-grisbleu-10--bd-b'))
	{
		var tree = getTree($(this));
		csv += tree+'_'+$(this).attr('title');
		csv += ';';
		csv += $(this).parent().next().html();
		csv += '<br/>';
	}
});

$('body').html(csv);
