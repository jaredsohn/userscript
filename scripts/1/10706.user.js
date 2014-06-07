// ==UserScript==
// @name		HSBC Security Key Prompt
// @namespace		http://www.bradkent.com/
// @description		That "virtual keyboard" sucks
// @include		https://www.us.hsbc.com/1/2/*
// @include		https://www.hsbcdirect.com/1/2/*
// ==/UserScript==

(function() {
	var pp = document.getElementById('password');
	if ( pp )
	{
		nodePW = document.getElementById('memorableAnswer');
		nodePW.setAttribute('tabindex',2);
		/*
		var newNode = document.createElement('tr');
		var cells = [
			'<label for="password"><em>Security Key</em></label>',
			'<input id="password" type="password" name="password" value="" tabindex="2" />',
			'<a class="assist" href="https://www.hsbcdirect.com/1/2/?idv_cmd=idv.OnlineCAMReset&OLRLink=CAM30ForgotPasswordLink">Forgot your Security Key?</A>'
		];
		for ( var i=0; i<cells.length; i++ )
		{
			cell = newNode.insertCell(i);
			cell.innerHTML = cells[i];
			if ( i == 2 )
				cell.setAttribute('class','txt_small');

		}
		parentNode = nodePW.parentNode.parentNode.parentNode;
		*/
		var newNode = document.createElement('fieldset');
		newNode.innerHTML =
			'<label for="password"><em>Security Key</em></label>'
			+'<input id="password" type="password" name="password" value="" tabindex="2" />'
			+'<a class="assist" href="https://www.hsbcdirect.com/1/2/?idv_cmd=idv.OnlineCAMReset&OLRLink=CAM30ForgotPasswordLink">Forgot your Security Key?</a>';
		parentNode = nodePW.parentNode.parentNode;
		parentNode.appendChild(newNode);

		// now remove the keys n whatnot
		table_node = document.getElementsByClassName('VKSectionBgColor')[0];
		fieldset_node = table_node.parentNode;
		fieldset_node.parentNode.removeChild(fieldset_node);
		keys_on = document.getElementsByClassName('id_on');
		for ( var i=0; i<keys_on.length; i++ )
			keys_on[i].style.display = 'none';
		keys_off = document.getElementsByClassName('id_off');
		for ( var i=0; i<keys_off.length; i++ )
			keys_off[i].style.display = 'none';
	}
})();

document.getElementsByClassName = function(cl)
{
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if ( myclass.test(classes) )
			retnode.push(elem[i]);
	}
	return retnode;
};
