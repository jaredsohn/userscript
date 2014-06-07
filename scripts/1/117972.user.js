// ==UserScript==
// @name           phpMyAdmin UTF8
// @namespace      liu.wanfang
// @include        *sql.php*
// ==/UserScript==

var allData, thisData;
allData = document.evaluate("//td[@class]",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);

for (var i = 0; i < allData.snapshotLength; i++)
{
	thisData = allData.snapshotItem(i);
	if(thisData.className.indexOf("data")>=0)
	{
		otr = thisData.innerHTML;
		ntr = "";
		for (var j=0;j<otr.length;j = j+2)
		{
			ch1 = otr.charAt(j);
			ch2 = otr.charAt(j+1);
			if(((ch1>="0"&&ch1<="9")||(ch1>="a"&&ch1<="f"))&&
				((ch2>="0"&&ch2<="9")||(ch2>="a"&&ch2<="f")))
			{
				ntr = ntr + "%" + ch1 + ch2;
			}
			else
			{
				ntr = "";
				j=otr.length;
			}
		}
		thisData.innerHTML = thisData.innerHTML + "<br />" + decodeURIComponent(ntr);
	}
}