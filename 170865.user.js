// ==UserScript==
// @name           vu_gyogyit
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/index.php?m=allatok
// ==/UserScript==

var inscript = "\n<!--\nfunction tobb_allat_gyogyit_noconfirm() "+
"  {"+
"  cbk=$$('.gyogyitani_jelol input');"+
"  var kijelolt_allat_nevek=new Array();"+
"  var kijelolt_allat_idk=new Array();"+
"  for (i=0;i<cbk.length;i++)"+
"    if (cbk[i].type=='checkbox' && cbk[i].id.indexOf('gyogyit_')!=-1 && cbk[i].checked)"+
"      {"+
"      allat_id=cbk[i].id.substring(8);"+
"      if (allat_nevek[allat_id]!=null)"+
"        {"+
"        kijelolt_allat_nevek.push(allat_nevek[allat_id]);"+
"        kijelolt_allat_idk.push(allat_id);"+
"        }"+
"      }"+
"  if (kijelolt_allat_nevek.length==0)"+
"    {"+
"    $('allatok_gyogyit').value='';"+
"    return false;"+
"    } "+
"  else"+
"    {"+
"    valasz=true;"+
"    $('allatok_gyogyit').value=valasz ? kijelolt_allat_idk.toString() : '';"+
"    document.getElementById('tobb_gyogyitasform').submit();"+
"    return valasz;"+
"    }"+
"  }\n//-->\n";

var cs = document.createElement('script');
cs.type='text/javascript';
cs.appendChild(document.createTextNode(inscript));
document.getElementsByTagName("head")[0].appendChild(cs);


function getByRegexRoot(doc, tag, name){
	items = [];
	elems = doc.getElementsByTagName(tag);
	eval('var nameregex = /'+name+'/;');
	for (i=0; i<elems.length; i++){
		if (elems[i].innerHTML.match(nameregex)) items.push(elems[i]);
	}
	return items;
}

function getFirstByRegex(tag, classname){
	items = getByRegexRoot(document, tag, classname);
	return items[0];
}

function getFirstByRegexRoot(doc, tag, classname){
	items = getByRegexRoot(doc, tag, classname);
	return items[0];
}

var obj = getFirstByRegex('span','^Az .sszes s.r.lt .llatomat kijel.l.m gy.gy.t.sra$');
if (obj)
	{
		location.assign('javascript:tobb_allat_gyogyit_kijelol();void(0);');
		location.assign('javascript:tobb_allat_gyogyit_noconfirm();void(0);');
	}
