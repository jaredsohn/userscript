// ==UserScript==
// @name           Disable Word Filter on ST Chat
// @namespace      simmaster07
// @description    This is NOT a workaround to swear freely, but to allow you to see other users' swears.
// ==/UserScript==

var option  = prompt('Type 1 if you want swears in red. Type 2 if you don\'t want swears highlighted. Type 3 if you want swears censored. The default is option 1.', '');
switch(option)
{
	case 1:
		rcLn.filter = function(_41,_42){
			for(var i=0;i<_41.length;i++){
				_42='<strong style="color:#ff0000;">' + _42 + '</strong>';
			}
			return _42;
		}
		break;
	case 2:
		// As hackerish as this workaround is, it's necessary.
		rcLn.filter = function(_41,_42){
			for(var i=0;i<_41.length;i++){
				_42=_42;
			}
			return _42;
		}
	case 3:
		rcLn.filter = function(_41,_42){
			for(var i=0;i<_41.length;i++){
				_42=_42.replace(new RegExp(_41[i],"gi"),"---");
			}
			return _42;
		}
		break;
	default:
		rcLn.filter = function(_41,_42){
			for(var i=0;i<_41.length;i++){
				_42='<strong style="color:#ff0000;">' + _42 + '</strong>';
			}
			return _42;
		}
		break;
}