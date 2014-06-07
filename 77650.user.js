// ==UserScript==
// @name           Travian: Villages list sorter
// @author	       ww_start_t
// @namespace      Travian
// @version	   	   1.0
// @description    Allows you to sort your village list in travian.
// @include 	   http://*.travian*.*/*
// @exclude 	   http://*.travian*.*/
// ==/UserScript==
function XPathQ(query,resultType,context){if(typeof(context) == 'undefined'){context = document; }
	var rt;switch(resultType){
	case 'int': case 'num' : case 'number' :rt = XPathResult.NUMBER_TYPE;
	break;
    case 'str': case 'string' :rt = XPathResult.STRING_TYPE;
	break;
	case 'bool': case 'boolean':rt = XPathResult.BOOLEAN_TYPE;
	break;
	case 'unordered_node_iterator': case 'uo_iter':rt = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	break;
	case 'ordered_node_iterator': case 'o_iter': case 'iter':rt = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
	break;
	case 'unordered_node_snapshot': case 'uo_snap':rt = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	break;
	case 'ordered_node_snapshot': case 'o_snap': case 'snap':rt = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	break;
	case 'any_unordered_node': case 'any_node':rt = XPathResult.ANY_UNORDERED_NODE_TYPE;
	break;
	case 'first_ordered_node': case 'first_node': case 'node':rt = XPathResult.FIRST_ORDERED_NODE_TYPE;
    break;
	default :
	rt = XPathResult.ANY_TYPE;}
	return document.evaluate(query,context,null,rt,null);}
    var TVReorder_moveIconsDisplayed = 0;
    function main(){TVReorder_reorderVillages();TVReorder_addVillageControl();}
	function TVReorder_reorderVillages() {
	var order = GM_getValue('TVReorder_order','').split(',');var villsa = []; var villsn = {};
	// Parse Village List
	var vill = XPathQ("//table[@id='vlist']/tbody/tr",'iter');var np = vill.iterateNext();while (np) {
	var coords = XPathQ("td[@class='aligned_coords']/div[@class='cox']",'str',np).stringValue + '|' + 
	XPathQ("td[@class='aligned_coords']/div[@class='coy']",'str',np).stringValue;villsa.push(coords);
	villsn[coords] = np;np = vill.iterateNext();}var neworder = [];vill = XPathQ("//table[@id='vlist']/tbody",'node').singleNodeValue;
	// Remove the villages
	while(vill.childNodes[0]){vill.removeChild(vill.childNodes[0]); }
	//Re-Add the villages we have in order.
	for(var i=0;i<order.length;i++){var coords = order[i];
	if(typeof(villsn[coords]) == 'undefined') continue; // Village has been remove (destroyed... 0poped)
	vill.appendChild(villsn[coords]);villsa.splice(villsa.indexOf(coords),1);neworder.push(coords);}
	//Add the villages that we don't have in our list
	for (var i = 0; i < villsa.length; i++) {vill.appendChild(villsn[villsa[i]]); neworder.push(villsa[i]);
	// Add the village to the order list.
    }GM_setValue('TVReorder_order',neworder.join(','));}
    function TVReorder_addVillageControl() {
	// Add the Reorder Villages Icon
	var vill = XPathQ("//table[@id='vlist']/thead/tr/td",'node').singleNodeValue;
	var a = document.createElement('a');a.href = "javaScript:void(0)";var img = document.createElement('img');img.alt = 'Reorder Villages';img.title = 'Reorder Villages';
	img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAXEQAAFxEByibzPwAAABl0RVh0U29mdHdhcmUATWljcm9zb2Z0IE9mZmlj" +
	"ZX/tNXEAAAH0SURBVDhPY2AgD7ASq41FRV0x1CfYsdAj0KbQ1c+i0NHHuJCdi90dyQA2ITn+UCBfnhhDWRKzwjq2npzzf8uJaf9XH+z637s497+0kmgQVDOLlKpghHeh+V99f+XpQDEZQoaCDdxzYdH/3Rfm/N90csL/Ccvy" +
	"YQYyi8nwB0ZU2f9JneH537PG7L+yq1Q/0EBJfIZiN1BRNFhQkMsrpdHjd+mikP8gA0P77f5bFWr9l7ARbgMaKIbLUAwD+5fm/ReVEGzNbfH9XT03/H/p4lC4gXY1ev/VE+X+85vxNgENFMFmKIqBG4/3/8+uDv5vYKE0y9xZ" +
	"PS+6xOEasoEmaWr/hfR487g1OfOAhrkCsTC6ofjCkDuy0O40uoFAA3RJD0NILI8aaPcfFCnYwhCULxWgWAlrwpYHh6FWWK7NJWIjRSa7OKVz8vz2ZxPnNr5HzikTlxf8L2oLeZFS6f48JMfmEbEGgmJerqo5f+nGg3P/H76+" +
	"Ap71Vh1u/t80Pf6/vpViYXie7QVSDAQZKl/emLls9Z4pcAM752T+s3TVyAbKiZOTDsGGFtenrFi6vfN//6KSf9ae+jlAMV5y0yEs0SvkV0evcvY1zYUaBhLnjiiwOxNWbvffq8Dsv12W7n/DRFWssYwr54BiHuQyGGAHMnSwYJQyEQBkIpahv4HLcAAAAABJRU5ErkJggg%3D%3D";
	a.appendChild(img);vill.appendChild(a);a.addEventListener('click', TVReorder_toggleUpDown, false);}
	function TVReorder_toggleUpDown() {
	// If we are showing our icons, hide them
	if(TVReorder_moveIconsDisplayed){
	var vill = XPathQ("//table[@id='vlist']/tbody/tr/td/div[@id='TVReorder_button']",'snap');
	for(var i=0;i<vill.snapshotLength;i++){var np = vill.snapshotItem(i);np.parentNode.removeChild(np);}
	TVReorder_moveIconsDisplayed = 0;return;}
	// Add the Icons.
	var vill = XPathQ("//table[@id='vlist']/tbody/tr/td[@class='dot'] | //table[@id='vlist']/tbody/tr/td[@class='dot hl']",'snap');
	for(var i=0;i<vill.snapshotLength;i++){var np = vill.snapshotItem(i);
	var d = document.createElement('div');d.id = 'TVReorder_button';d.style.display = 'inline';
	// Create the Up Arrow
	var a = document.createElement('a');a.href = "javaScript:void(0)";var img = document.createElement('img');img.alt = 'Move Up';img.title = 'Move Up';
	img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAATCAYAAABLN4eXAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAXEQAAFxEByibzPwAAABl0RVh0U29mdHdhcmUATWljcm9zb2Z0IE9mZml"+
	"jZX/tNXEAAAFpSURBVDhPY2DADZjwyGGVYrKwNTICyogSq5HRxtHIePvRlb8XrJ08F6hJiJBGRh0dRb0N++f9PHd/5/9Dl9b/n7qkvR+oSQCnRmFJYY2VOyZ/P3Zz3f/jtyB456lF/7tmVDUCNfFiaOQV4VVbuLnz69YTs/"+
	"7vv7IIjnecnvN/5Z4J/xv6c8uBmniQNSpFJnt4pRSHhvUtKF21/ey0/zC8YEvzf5A4CAM1qAExN7qNzE1T0ietP971H4Znrqv8D1Qkiy8wmGsmxE1afrDuPwxPWplPWFNZZ+ik+buK/8Nw9+JUwpryWnwmTd6U8R+GG+ZEE"+
	"9aUWO86qWll7H8YLpoSSFhTaJntpKIFQf9hOKXHg7Amz3yTSUnTPf7DcFiLPWFNtlm6k4L7bP7DsEeNCWFNBokqk5xaDP/DsFWxNmFNKlHSkwyr1f7DsHaOImFNEqHCk+SzJP/DsGySOGFNwOSizsDGoIGC0ZIRACtRzWLNI1OsAAAAAElFTkSuQmCC";
	a.appendChild(img);d.appendChild(a);a.addEventListener('click', TVReorder_moveUp, false);	
	// Create the Down Arrow
	var a = document.createElement('a');a.href = "javaScript:void(0)";var img = document.createElement('img');img.alt = 'Move Down';img.title = 'Move Down';
	img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAATCAYAAACgADyUAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAXEQAAFxEByibzPwAAABl0RVh0U29mdHdhcmUATWljcm9zb2Z0IE9mZmljZX/"+
	"tNXEAAAIKSURBVDhPjdPvT1JhFAfwW5PV1jvfVZbrRXPNtcZomVxSN3B6V2zCmiNaEZNsyMyUFjAtQgq9+INo3GVXHGAEGoKKiVFoWc5izbX1T/AvODf89rDkTcG4z3benHM+z9menecQ9f85ViJXSO2SyJepUZS8TdoYSXlzoWU"+
	"2Nx135Lg5a27Ub1ojoNyFf+9ilDI6ucVj/XcQqR0Oi9/HwM4YsxVhK4GJTQ7pXzySWQ9iWy485w0CIHOZjm148P6nD4ltFtFNO4andMJgNOPGcnaCTHMivGHDE05bGbaQieH0M8S3RxD98hjBT2bYvJ1CoIQOpuyY/zqMN+tWTH+4D/"+
	"OkujKUMRLav2LD289DCHwcgG/FCJNbKQC2XqBfLz1EKGMBv9aL8UUDukcYIbCe5hb6MJPuhzd5D853t6FzKoTBl7EevFo1wR3XYzCigeZpc0l4mGzFCRLHC3HxSp10Ys4Az9JdOOZvwhxSQz1EF+Cpg55Cb3VxZ0XN7RLZ2Kxxlw3p90"+
	"YjergW7sAa7kSPXwmVg87LLeK9S711OwSc/nfRqzq0DYwroNsfT3TBHtXiQUCFrql2qNwySPvqs9QR6ky53yG6dkOsHPCp9y2z12Hkr0Iz2YKm/vM/qKNUbdkvdVAQNXScY3SsIn/rhQJys/gbyddUQsV61dnGmqa2R5IMSZwUiop9xdcu6f4AGX/r4El2T9AAAAAASUVORK5CYII%3D";
	a.appendChild(img);d.appendChild(a);a.addEventListener('click', TVReorder_moveDown, false);
	// Add the div before the little dot.
	np.insertBefore(d,np.firstChild);}
	TVReorder_moveIconsDisplayed = 1;}
	function TVReorder_moveUp(e) {
	TVReorder_move(0,e); }
	function TVReorder_moveDown(e) {
	TVReorder_move(1,e); }
	function TVReorder_move(dir, e) {
	var a = e.currentTarget;
	var tr = a.parentNode.parentNode.parentNode;
	var coords = XPathQ("td[@class='aligned_coords']/div[@class='cox']",'str',tr).stringValue + '|' + 
	XPathQ("td[@class='aligned_coords']/div[@class='coy']",'str',tr).stringValue;
	var order = GM_getValue('TVReorder_order','').split(',');
	var pos = order.indexOf(coords);
	// Check for boundary conditions
	if( (dir == 0 && pos == 0) ||
	(dir == 1 && pos == order.length-1))return;
	order.splice(pos,1);if(dir == 0)
	order.splice((pos-1),0,coords);else
	order.splice((pos+1),0,coords);
	GM_setValue('TVReorder_order',order.join(','));
	TVReorder_reorderVillages();}
	main();
