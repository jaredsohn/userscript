// ==UserScript==
// @name          Darckr Add Comment Above
// @description	  Add a duplicate textarea and form to post comments right below the picture
// @namespace     http://www.flickr.com/photos/lo1/
// @include       http://*flickr.com/photos/*
// @exclude       http://*flickr.com/messages_write.gne*
// ==/UserScript==

/*
    @author=Laurent Henocque  
    @copyright=Laurent Henocque  
*/

var comments = document.evaluate("//div[@id='DiscussPhoto']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (comments.snapshotLength ==0) return;

var element=comments.snapshotItem(0);
var theH3=element.getElementsByTagName('h3');
if(theH3.length ==1) exit;
var titleComments=theH3[0];
var titleAdd=theH3[1];

var forms=element.getElementsByTagName('form');
var formAdd=forms[forms.length-1];
var formAux;
if (forms.length>1){
    formsAux=forms[forms.length-2];
    //element.removeChild(formsAux);
}
//var formAdd2=element.getElementsByTagName('form')[1];// in case there is quick comment around
//if(formAdd2) GM_log("found span section");
//else GM_log("not found!!!");
/*element.removeChild(titleComments);
element.removeChild(tableComments);
element.removeChild(titleAdd);
element.removeChild(formAdd);
if(formAdd2)element.removeChild(formAdd2);*/
/*var h3= document.createElement('h3');
var a= document.createElement('a');
a.setAttribute('name','reply');
h3.appendChild(a);
h3.innerHTML="Add your comment";
element.appendChild(h3);
//element.appendChild(titleAdd);
*/
//
var title2=titleAdd.cloneNode(true);
var form2=formAdd.cloneNode(true);
var formAux2;
if (forms.length>1){
    formsAux2=formsAux.cloneNode(true);
}

/*var theps=form2.getElementsByTagName('p');
theps[0].removeChild(theps[0].getElementsByTagName('small')[0]);
var textarea=theps[0].getElementsByTagName('textarea')[0];
textarea.setAttribute('rows',4);
*/


element.insertBefore(title2, titleComments);
if (forms.length>1){
    element.insertBefore(formsAux2, titleComments);
}
element.insertBefore(form2, titleComments);

//element.appendChild(titleAdd.cloneNode(true));
/*element.appendChild(form21);
if(formAdd2)element.appendChild(form22);
element.appendChild(titleComments);
element.appendChild(tableComments);
element.appendChild(titleAdd);
element.appendChild(formAdd);
if(formAdd2)element.appendChild(formAdd2);
*/

/*var topbarx = document.evaluate("//div[@class='TopBar']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var topbar=topbarx.snapshotItem(0);
var parent = topbar.parentNode;
parent.removeChild(topbar);
*/



