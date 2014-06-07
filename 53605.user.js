// ==UserScript==
// @name          Technorati Multiple Word Tags for Blogger version 1.0 beta
// @description	  Changes the Edit Post Blogger form to include a tags field.
// @namespace     magicalsheeptagger

// @include       http://*.blogger.com/post-create.g*
// @include       http://*.blogger.com/post-edit.g*
// @include       http://*draft.blogger.com/post-create.g*
// @include       http://*draft.blogger.com/post-edit.g*
// @include       http://*.draft.blogger.com/post-create.g*
// @include       http://*.draft.blogger.com/post-edit.g*
// @include       http://draft.blogger.com/post-create.g*
// @include       http://draft.blogger.com/post-edit.g*
// @include       http://.draft.blogger.com/post-create.g*
// @include       http://.draft.blogger.com/post-edit.g*


// Based on the original tagger by Fabricio Zuardi (http://idomyownstunts.blogspot.com)
// Modified by Bryan Price (http://www.bytehead.org/) to make it conducive to being XHTML compliant
// Modified again by KRS (http://phydeaux3.blogspot.com) to get multiple word tag support - tags separated by commas
// Ugh - tweaked to work with Greasemonkey 0.6.4 and Firefox 1.5 (until something else breaks) and added constant me-tags and user defined separators (Magical Sheep version) -KRS
// Implemented bugfix from (http://clamatius.blogspot.com/2006/02/tech-technorati-tagging-part-2.html) - KRS, March 2006
// Rewritten with Verbose DOMScripting because I need the practice / added fuTags, customizable heading, somewhat better error checking - KRS, April 2006
// Small fix for Blogger post editor change 12-17-07 krs
// Ok, the last fix Blogger changed the toggle on the post options, and theirs doesn't keep the current state
// Rather than fight it, overriding the postoptions style to always keep it open. Grrrr.  Jan 2, 2008.

// Updated instructions & tutorial by Improbulus (http://www. consumingexperience.com) at http://www.consumingexperience.com/2005/12/updated-multiple-word-technorati-tag.html
// Improbulus also claims credit for standing over KRS cracking her whip, and for pedantic proofreading - April 2006

// Includes updated so it works with Blogger in Beta August 2006

// The Magical Sheep team are KRS and Improbulus. In case anyone's interested.


// FEATURES
// Works in both Edit HTML/Compose modes
// Supports multiple word tags
// Tags area given classes for styling with CSS
// Tag heading and separator both customizable
// User defined MeTags to append to every post
// User defined list of 'frequently used tags' (FUTags) for easy access
// Tags are read back in from draft or previously published post
// Option to open tag links in new window
// Option to point tag links at a user's Technorati account
// Also keeps Blogger posting options open all the time
// Integrates nicely (hopefully) into the Blogger post editor
// Tag box and settings now hidden in Preview view


// ==/UserScript==
             

  // Add Styles for GM Created Content

        GM_addStyle('#tagsField {background-color:rgb(238,238,238);width:700px; padding:5px 0 5px 5px;}');
        GM_addStyle('#f-tags {float:left;margin-bottom:10px;}');
        GM_addStyle('#t-submit {background-color:rgb(15,174,45);color:rgb(255,255,255);font-size:105%;font-weight:bold;margin:0 0 0 15px!important;text-decoration:none;border-left:1px solid rgb(1,217,42);border-top:1px solid rgb(1,217,42);border-right:2px solid rgb(8,154,35);border-bottom:2px solid rgb(8,154,35);padding:0.5em 1em 0.5em 1em;cursor:pointer;float:right;}');
        GM_addStyle('#t-submit:hover {background-color:rgb(240,240,240);color:rgb(15,174,45);}');
        GM_addStyle('#tagSettingsDiv {background:rgb(245,237,227);width:100%;border-bottom:2px solid rgb(204,204,204);padding:5px 0;}');        
        GM_addStyle('#tagOptionDiv {margin:10px 0 0 0;background-color:rgb(225,212,192); color:rgb(85,85,85); font-size:80%; text-align:left;width:100%;border-top:solid 2px rgb(204,204,204);border-bottom:solid 2px rgb(204,204,204);}');
        GM_addStyle('#toggleTagOptions {text-align:left;font-size:105%;font-weight:bold;padding-left: 1.7em;cursor:pointer;cursor:hand;display:inline;background:transparent url(http://www.blogger.com/img/triangle.gif) no-repeat .4em .1em;}');	
        GM_addStyle('#toggleTagOptions.expanded {background-image:url(http://www.blogger.com/img/triangle_open.gif);}');
        GM_addStyle('#postoptions {border-bottom:2px solid rgb(204,204,204);border-left:2px solid rgb(204,204,204);border-right:2px solid rgb(204,204,204);width:707px;display:block!important}');     
        GM_addStyle('#tdiv {font-size:100%;float:left;margin-left:10px;width:220px;height:40px;}');
        GM_addStyle('#futDiv {width:550px; margin:10px 0 0 15px; text-align:left;}');
        GM_addStyle('#futDiv ul li {display:inline;}');
        GM_addStyle('#futDiv ul {display:inline;margin:0; padding:0;}');
        GM_addStyle('#futDiv a {padding:0 5px 0 0;cursor:pointer;font-weight:normal;text-decoration:underline;white-space: nowrap;}');
        GM_addStyle('#userDefined a {cursor:pointer;font-weight:normal;text-decoration:underline;padding:5px 10px 5px 0;}');
        GM_addStyle('#myTechnorati {float:right;width:125px;}');
        GM_addStyle('#optionsTriangle {display:none!important;}');

  // Add everything onload

  window.addEventListener("load", function(e) {

  // Global variables
        var d = document;
	var separator = ', ';
        var displayHead = 'Tags: ';
        var techUser = '';
        var myTechSet = false;
        var newWindow = false;
        var theSplit=/\s*,\s*/g;
	var post_options = dge("postoptions");

  // Check for UserDefined variables, load if they are present

	if (GM_getValue( 'tag-separator')) {
            separator = GM_getValue( 'tag-separator');
	   }
        if (GM_getValue( 'tag-head')){
            displayHead = GM_getValue('tag-head');
           }
        if (GM_getValue('windowTarget')){
             newWindow = GM_getValue('windowTarget');
           }
        if (GM_getValue('techUser')){
            techUser = GM_getValue('techUser');
           }
        if (GM_getValue('myTechSet')){
            myTechSet = GM_getValue('myTechSet');
           }
        if (GM_getValue('newWindow')){
            newWindow = GM_getValue('newWindow');
           }

  // Open The Post Options Field 

      //  post_options.style.display = 'block';
      //  dge('togglePostOptions').className = 'expanded';
      //  dge('optionsTriangle').display = 'none';

  // Create the Tags Area

        var tagsHider = dce('div');
        tagsHider.id = 'tagsHider';       
	var tags_field = dce('div');
	tags_field.id = 'tagsField';
        var input = dce('textarea');
  
  // Technorati Logo

        inputIMG = 'data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEAyADIAAD%2F2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj%2F2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj%2FwAARCAAjACcDASIAAhEBAxEB%2F8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL%2F8QAtRAAAgED';
        inputIMG += 'AwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4%2BTl5ufo6erx8vP09fb3%2BPn6%2F8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL%2F8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJB';
        inputIMG += 'UQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3%2BPn6%2F9oADAMBAAIRAxEAPwDpPHPjG%2B13UZoYZ3i09HKxxocbsdz617H4V0228NeFYlIC7IvPuH7lsZJr5uBwQa%2Bl9LuIPEfhSNkcGO6tzG%2BP4SVwR%2BBr5bJq';
        inputIMG += 'rr1qlSbvO2n9fceLl9R1ak5y1l0PE%2FFfjfVNcu5BHcSW1lkhIY228f7RHU1zcF5cwSiSG4mjkBzuVyD%2BdXvEWg32gX7219CygH5JMfK49Qaya8GvOrKo3Vb5vM8yrOo5t1HqewfC3xtdX95%2FZWryea5QtDM33jjqp9eP5UVj%2FCXwvdz6qmrXMbw2kKsIywwZGII49sE0V9flE68sMnU%2BV%2Bx7%2BBlVlRTn%2FSPN69G%2BDGqXsevNpqSbrKVGkZD%2FAAkdx6Vwur2E2malcWdypWWFypBHX0NWNB1u70KeafTyqXEkZjEhGSoP';
        inputIMG += 'XFfJ4Wq8NXjOV1Z6%2FwCR4VCfsaqk9LH0bq91pMYS31aW0HmfdjnK8%2FgayltfCNmTOE0mMjndlK%2Bery6nvbhp7uZ5pmOS7nJNQYFevUz1Tlf2Sfa%2B53SzO7vyI%2BiYvHGjT6vbaZp8puZZdw3RD5FAUnr%2BHaivKPhRp0174shljU%2BVbo7u3YZUqB%2BtFetl2Lr4qk6kl109NDvwlepWg5tdT0f4q6VY3GjG7mto2uUOFl6Nj0yOteDmiivCz2KWJ0XQ83NElVVhKnsUWW7iRxlScEUUV4yPOjuj6T8J6bZ6botuljbpCrqGbaOW';
        inputIMG += 'PqT1NFFFfpFCKjTikraH11NJRSR%2F%2F9k%3D';
        
        input.style.backgroundImage = 'url('+inputIMG+')';
        input.style.backgroundRepeat = 'no-repeat';
        input.style.backgroundPosition = '1px 2px';
        input.addEventListener('focus', focusTags, true);
        input.id = 'f-tags';
        input.style.width = '550px';
        input.style.height = '35px';
        input.className = 'text';
        sa(input,'tabindex','4');
        ac(tags_field,input);

        appAnchor = dce('input');
        appAnchor.id = 't-submit';
        appAnchor.className = 'btn';
        sa(appAnchor,'tabindex','5');
        appAnchor.addEventListener('click', appendTags, true);
        sa(appAnchor,'value','Append Tags');
        sa(appAnchor,'type', 'button');
        ac(tags_field,appAnchor);
        ac(tagsHider,tags_field);

        ftDiv = dce('div');

        ftDiv.id = 'futDiv';
        ftDiv.style.clear = 'both';
        ac(tagsHider,ftDiv);

  // insert into postoptions field

        var dvTarget = post_options.getElementsByTagName('div');
	post_options.insertBefore(tagsHider,dvTarget[0]);

  // FUTAGS insert

        insertFUTAGS();

  // Tag Options & Settings Content

        tagOptionDiv = dce('div');
        tagOptionDiv.id = 'tagOptionDiv';
        span = dce('span');
        span.id = 'toggleTagOptions';
        text = dct('Tag Settings and Options');
        ac(span,text);
        span.addEventListener('click', toggleTagOptions, true);
        ac(tagOptionDiv,span);
        ac(tagsHider,tagOptionDiv);

        tagSettingsDiv = dce('div');
        tagSettingsDiv.id = 'tagSettingsDiv';
        sa(tagSettingsDiv,'style','display:none');

        tdiv = dce('div');
        tdiv.id = 'tdiv';
               
        targText = dct('Tag Links Open in New Window');
        ac(tdiv,targText);
        br = dce('br');
        ac(tdiv,br);

        input = dce('input');
        input.id = 'targYes';
       
        sa(input,'type', 'radio');
        sa(input,'name', 'targSelect');
        sa(input,'value', 'targYes');
        input.addEventListener('click', targSelectTrue, true);
        ac(tdiv,input);
        label = dce('label');
        sa(label,'for','targYes');
        txt = dct(' Yes ');
        ac(label,txt);
        ac(tdiv,label);

        input = dce('input');
        input.id = 'targNo';
        sa(input,'type', 'radio');
        sa(input,'name', 'targSelect');
        sa(input,'value', 'targNo');
        input.addEventListener('click', targSelectFalse, true);
        ac(tdiv,input);
        label = dce('label');
        sa(label,'for','targNo');
        txt = dct(' No ');
        ac(label,txt);
        ac(tdiv,label);
        
        ac(tagSettingsDiv,tdiv);

        mt = dce('div');
        mt.id = 'myTechnorati';
        mtTxt = dct('Point Links to Your Technorati Account');
        br = dce('br');
        ac(mt,mtTxt);
        ac(mt,br);
        input = dce('input');
        sa(input,'type','checkbox');
        sa(input,'value','user');
        input.id = 'myTech';
        input.addEventListener('click', setMyTech, true);
        ac(mt,input);
        label = dce('label');
        sa(label,'for','myTech');

        lbTxt = dct(' My Technorati ');
        ac(label,lbTxt);
        ac(mt,label);
        ac(tagSettingsDiv,mt);
 
  //  User Defined Options

        ud = dce('div');
        ud.id = 'userDefined';
        txt = dct('Change User Defined Settings');
        ac(ud,txt);
        br = dce('br');
        ac(ud,br);

        fuTags = dce('a');
        fuTags.id = 'set-FUT';
        fuTags.title = 'Set Frequently Used Tags';
        fuTags.addEventListener('click', FUTags, true);
        fTxt = dct(' Set FUTags ');
        ac(fuTags,fTxt);
        ac(ud,fuTags);
 
        mTags = dce('a');
        mTags.id = 'set-Constant';
        mTags.title = 'Set Tags to Append to every post';
        mTags.addEventListener('click', meTags, true);
        mTxt = dct(' Set MeTags ');
        ac(mTags,mTxt);
        ac(ud,mTags);
       
        sep = dce('a');
        sep.id = 'set-Separator';
        sep.title = 'Set Visual Separator';
        sep.addEventListener('click', seParator, true);
        sepTxt = dct(' Set Separator ');
        ac(sep,sepTxt);
        ac(ud,sep);
      
        hd = dce('a');
        hd.id = 'set-Heading';
        hd.title = 'Set Displayed Tag Heading';
        hd.addEventListener('click', setHeading, true);
        hdTxt = dct(' Set Heading ');
        ac(hd,hdTxt);
        ac(ud,hd);

        ac(tagSettingsDiv,ud);

        clear = dce('div');
        sa(clear,'style','clear:both');
        ac(tagSettingsDiv,clear);
        ac(tagsHider,tagSettingsDiv);


  // set MyTechnorati Option

        if (myTechSet){
             myTech = dge('myTech');
             myTech.setAttribute('checked', 'true');
          }

  // set new window option

        if (newWindow){
             targYes = dge('targYes');
             targYes.setAttribute('checked', 'true');
          }
        else {
             targNo = dge('targNo');
             targNo.setAttribute('checked', 'true');
          }
 // Read the tags back in from a previous post - Kinda messy I know

       if(document.getElementById('textarea')){
         tagback = document.getElementById('textarea');
         ft = document.getElementById('f-tags');
         dv = document.createElement('div');
         dv.innerHTML = tagback.value;
         tagSpan = dv.getElementsByTagName('span');
         for(i=0;i < tagSpan.length;i++){
             if(tagSpan[i].className == 'tags'){
                tagText = tagSpan[i].getElementsByTagName('a');
                ft.value = '';
                for(p=0; p<tagText.length; p++){
                    ft.style.background = '#fff';
                    ft.value += tagText[p].innerHTML;
                    if(p == tagText.length-1){
                      break;
                       }
                    ft.value += ', ';
                    }
                if (GM_getValue( 'me-tags')) {
                    var meStrip = GM_getValue('me-tags');
                    var ftstrip = ft.value;
                    ft.value = ftstrip.replace(', '+meStrip,' ');
                    }
                 }
              }
           }

  // Copied from Blogger Script to emulate Post Settings Options for Tag Options

        function toggleTagOptions() {
                 var div = dge('tagSettingsDiv');
                 var toggleNode = dge('toggleTagOptions');
                 if (div.style.display == 'none') {
                      div.style.display = 'block';
                      toggleNode.className = 'expanded';
                     } else {
                       div.style.display = 'none';
                       toggleNode.className = '';
                       }	
                   }

  // Shorthand functions

        function dct(str) {
	         return d.createTextNode(str);
                  }
        function dce(obj) {
	         return d.createElement(obj);
                 }
        function dge(objID) {
	         return d.getElementById(objID);
                 }
        function sa(obj,attr,val) {
	         obj.setAttribute(attr,val);
                 }
        function ac(pNode,cNode) {
	         pNode.appendChild(cNode);
                 }

  //  Script Functions

        function focusTags(){
                 ftags = dge('f-tags');
                 ftags.style.background = '#fff';
                 return true;
                 }

  // Create FUTs

        function insertFUTAGS(){
                var ftd = dge('futDiv');
                ftd.innerHTML = '';
                if (GM_getValue( 'fu-tags')){
                    fuSplit = GM_getValue( 'fu-tags');
                    fSplit = fuSplit.split(theSplit);
                    fSplit.sort();
                    tabCount = 6;
                    ul = dce('ul');
                    ul.style.display = 'inline';
                    ul.style.listStyle = 'none';
                    for( i = 0; i < fSplit.length; i++){
                        li = dce('li');
                        a = dce('a');
                        a.title = 'Insert '+fSplit[i];
                 // Just to make tabbed enters work easily
                        a.href = 'javascript:void(0)';
                        sa(a,'tabindex',tabCount);
                        a.id = 'selFUT'+i;
                        a.rel = fSplit[i];
                 // Not sure why the rel bit is needed, but putting the array into the passed function only works on the first loop :-(
                        a.addEventListener('click', function() { insertFUT(this.rel)}, true);
                        at = dct(fSplit[i]);
                        ac(a,at);
                        ac(li,a);
                        ac(ul,li);
                        as = dct(' ');
                        ac(ul,as);
                        tabCount++;
                       }
                     ac(ftd,ul);
                     reTab = dge('t-submit');
                     sa(reTab,'tabindex',tabCount);
                    }
                 }

        function insertFUT(selFUT){
                 ftinsert = dge('f-tags');
                 ftinsert.style.background = '#fff';
                 ftvalue = ftinsert.value;
                 ftlength = ftvalue.length;
                 if(ftlength == 0){
                    ftinsert.value += selFUT+', ';
                    }
                 else {   
                    ftcheck = ftinsert.value.substring(ftlength-2,ftlength);  
                    if(ftcheck.indexOf(',') == -1){
                       ftinsert.value += ', '+selFUT+', ';
                       }
                    else {                   
                       ftinsert.value += selFUT+', ';
                       } 
                    bottomPos = ftinsert.scrollHeight;
                    ftinsert.scrollTop = bottomPos; 
                    }
                 }

        function FUTags(){
                 var setFUTags = '';
                 if (GM_getValue( 'fu-tags')){
                        setFUTags +=GM_getValue( 'fu-tags');
			}
                 var futs = prompt( 'Input your frequently used tags (separate tags by comma):', setFUTags);
                 if(futs.charAt(futs.length-1) == ','){
                    futs = futs.substring(0, futs.length-1);
                    }
                 GM_setValue( 'fu-tags', futs );
                 alert( 'These are your frequently used tags: '+futs );
                 insertFUTAGS();
                 }

        function targSelectTrue(){
                 GM_setValue('newWindow', true);
                 newWindow = true;
                 }
        function targSelectFalse(){
                 GM_setValue('newWindow', false);
                 newWindow = false;
                 }
        function setMyTech(){
                 myTech = dge('myTech');
                 if(myTech.checked){
                     prevUser = techUser;
                     techUser = prompt(' Set your Technorati UserName ', prevUser);
                     if(techUser == null){
                        techUser = prevUser;
                        myTech.checked = false;
                        return;
                        }
                     GM_setValue( 'techUser', techUser);
                     GM_setValue('myTechSet', true);
                     myTechSet = true;
                    }
                 else {
                    GM_setValue('myTechSet', false);
                    myTechSet = false;
                    return;
                    }
                 }

        function setHeading(){
                 prevHead = displayHead;
                 displayHead = prompt(' Set displayed heading next to tag field - default is "Tags: "', prevHead);
                 if(displayHead == null){
                    displayHead = prevHead;
                    }
                 GM_setValue( 'tag-head', displayHead);
                 }

        function seParator() {
                 prevSep = separator;
                 separator = prompt(' Set displayed separator for tags - default is the comma space:',prevSep);
                 if(separator == null){
		    separator = prevSep;
                    }
                 GM_setValue('tag-separator', separator);
                 }

        function meTags() {
                 var setMeTags = '';
                 if (GM_getValue( 'me-tags')){
                        setMeTags +=GM_getValue( 'me-tags');
			}
                 var constantTags = prompt( 'Tags on all blog posts (separate tags by comma):', setMeTags);
                 GM_setValue( 'me-tags', constantTags );
                 alert( 'These Tags will be added automatically with the Append Tags button: '+constantTags );
                  }

	function appendTags() {
		var tags_str = dge('f-tags').value;

                if (GM_getValue( 'me-tags')) {
			if (tags_str){
				tags_str += ', '+GM_getValue( 'me-tags');
				}
			else {
			      tags_str += GM_getValue( 'me-tags');
				}
			}
		var tags_arr = tags_str.split(theSplit)
		var tags_html = '<div class="tag_list">'+displayHead+'<span class="tags">'
		for(var i=0;i<tags_arr.length;i++){
                        if(tags_arr[i] == ''){
                           continue;
                           }
			if(i > 0){tags_html+=separator;}
                        addplus = tags_arr[i].replace(/(\s)+/g,'+');
                        tags_arr[i] = tags_arr[i].replace(/(\s){1,}/g, ' ');
                        tags_html += '<a href="http://technorati.com/tag/'+addplus+'" rel="tag"';
                        if(newWindow){
                           tags_html += ' target="_blank"';
                           }
                        if(myTechSet){
                           tags_html += ' onmouseover="this.href=\'http://technorati.com/tag/'+addplus+'?user='+techUser+'\'"';
                            }
                        tags_html +='>'+tags_arr[i]+'</a>';
		       }
		tags_html += "</span></div>"
		var text_area = dge('textarea')
		var div_index = text_area.value.indexOf('<div class="tag_list">');

                var rich_edit = dge('richeditorframe');
                var rich_body = rich_edit.contentDocument.getElementsByTagName('body');
                div_index2 = rich_body[0].innerHTML.indexOf('<div class="tag_list">');
                var rich_head = rich_edit.contentDocument.getElementsByTagName('head');
                
                var blink = rich_edit.contentDocument.createElement('style');
                blink.id = 'blinkid';
                var blinkid = rich_edit.contentDocument.getElementById('blinkid');
                theSearch = /<div class="tag_list">([^`]*?)<span class="tags">/;
                if(theSearch.exec(text_area.value) != null){
                   errorcheck = theSearch.exec(text_area.value)[1];
                   if(theSearch.exec(rich_body[0].innerHTML) != null){
                      errorcheck2 = theSearch.exec(rich_body[0].innerHTML)[1];
                      }
                   else {
                      errorcheck2 = errorcheck;
                      }
                 if(errorcheck != displayHead || errorcheck2 != displayHead){
                     errresponse = confirm( 'Rut Roh! You have chosen to overwrite an existing set of tags, but the Tagger has noted a discrepancy that may overwrite some needed content.\n\n This is usually casued by moving the "Tags Field" around. It could also be caused by changing the displayed Tag Heading from your previous append. \n\n Do you want the tagger to stop and give you a chance to fix the problem? \n Choose OK to let the tagger attempt to show you the problem. \n Choose OK if you are unsure. \n Choose Cancel to go ahead and overwrite.');
                     if(errresponse) {
                        alert('You have chosen to try and fix the problem. Good for you.\n\n The tagger will attempt to highlight the suspect text in the COMPOSE mode window with a yellow background. To resolve move any text in the highlighted area that you want to save above the yellow zone, then append the tags again. If all the content is above the yellow zone (except the tags) then it\'s safe to finish appending the tags.\n\n If you are in Edit HTML mode look for the start tag of \<div class="tag_list"\> and move any needed text above that tag.\n\n If you can\'t find any suspect text, it most likely is only blank space causing this notice and it\'s safe to proceed.');
                        blink.innerHTML = '.tag_list {background-color: #ff9;}';
                        ac(rich_head[0],blink);
                        return false;
                       }                 
                     }
                   }
		if(div_index > 0){
			text_area.value = text_area.value.substr(0,div_index)+tags_html;
                   if(blinkid){blinkid.innerHTML = '.tag_list {background-color: #fff;}';}
		}else{
			text_area.value += '\n'+tags_html;
                  if(blinkid){blinkid.innerHTML = '.tag_list {background-color: #fff;}';}
		}

                if(div_index2 > 0){
			rich_body[0].innerHTML = rich_body[0].innerHTML.substr(0,div_index2)+tags_html;
                  if(blinkid){blinkid.innerHTML = '.tag_list {background-color: #fff;}';}
		}else{
			rich_body[0].innerHTML += tags_html;
                  if(blinkid){blinkid.innerHTML = '.tag_list {background-color: #fff;}';}
		}
	}
	
 }, false);



