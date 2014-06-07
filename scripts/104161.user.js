// ==UserScript==
// @name           hideThreads
// @namespace      tmb
// @include        http*://*tmb.dj/forum/view/*
// @include        http*://*themixingbowl.org/forum/view/*
// @include        http*://*tmb.dj/forum/
// @include        http*://*themixingbowl.org/forum/
// ==/UserScript==


function hideThreads(){

	if(!document.getElementById('hideThreadsInput')){
		//create button and input field which contains the threads to be hidden
		editBtn = document.createElement('button');
		editBtn.appendChild(document.createTextNode('Edit hidden threads'));
		editBtn.addEventListener('click', function() {
			if(window.editmode){
				window.editmode = false;
				GM_setValue('tmbHiddenThreads',document.getElementById('hideThreadsInput').value);
				this.childNodes[0].nodeValue= 'Edit hidden threads';
				document.getElementById('hideThreadsInput').setAttribute('style','display:none'); //hide input
				hideThreads();
			}else{
				window.editmode = true;
				this.childNodes[0].nodeValue= 'Save changes';
				document.getElementById('hideThreadsInput').setAttribute('style',''); //clear hidden
			}

		},false );
		editInput = document.createElement('input');
		editInput.setAttribute('id','hideThreadsInput');
		editInput.setAttribute('style','display:none');
		editInput.value = GM_getValue('tmbHiddenThreads','');
	}
	
	if(editInput.value.length > 25)
		editInput.setAttribute('size',editInput.value.length);
	else
		editInput.setAttribute('size','');
	
	table = document.getElementsByClassName('forumviewtable')[0];
	table.appendChild(editBtn);
	table.appendChild(editInput);

	rows = table.getElementsByTagName('tr');
	patt = new RegExp("thread\/view\/("+GM_getValue('tmbHiddenThreads','')+")$","i");
	//patt = /thread\/view\/(4779|9691|103214|110)$/i; 

	for (var i = 0, rl = rows.length; i < rl; i++)
	{
		links = rows[i].getElementsByTagName('a');
		for (var j = 0, ll = links.length; j < ll; j++)
		{
			if(links[j].href.match(patt))
			{
				rows[i].setAttribute('class','hideThread')
				rows[i].setAttribute('style','display: none;  visibility: hidden;');
				break;
			}
			else if(rows[i].getAttribute('class') == 'hideThread') //unhide if previously hidden but not any more
			{
				rows[i].setAttribute('class','');
				rows[i].setAttribute('style','');
			}
		}
	}
}

function modIcons(){
	table = document.getElementsByClassName('forumtable')[0];
	rows = table.getElementsByTagName('tr');
	patt = new RegExp("thread\/view\/("+GM_getValue('tmbHiddenThreads','')+")\/\\?page=last","i");
	//patt = /thread\/view\/(4779|9691|103214|110)/?page=last/i; 
	
	for (var i = 0, rl = rows.length; i < rl; i++)
	{
		links = rows[i].getElementsByTagName('a');
		for (var j = 0, ll = links.length; j < ll; j++)
		{
			if(links[j].href.match(patt))
			{
				links[j].getElementsByTagName('img')[0].src="/static/img/tiny_post.gif";
				rows[i].getElementsByClassName('state')[0].src="/static/styles/tmb/buttons/nounread.png";
				
				break;
			}
		}
	}

}

if(document.URL.match(new RegExp("forum\/view\/")))
	hideThreads();
else 
	modIcons();