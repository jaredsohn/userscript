// ==UserScript==
// @name           fix button action
// @include        http://www.toandto.com/quickservice/sentence/senttran.aspx*
// ==/UserScript==

location.assign("javascript:(" + encodeURI(uneval(function()
{
	OnTranButton = function()
	{
		bTran=true;
		__doPostBack('TranButton','');
	};
}))+ ")();");