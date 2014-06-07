// ==UserScript==
// @name           Related post script for blogger
// @description    Related post script for blogger
//

// ==/UserScript==

&lt;!--related post started--&gt;
&lt;b:if cond=&#039;data:blog.pageType == &amp;quot;item&amp;quot;&#039;&gt;
&lt;div class=&#039;similiar&#039;&gt;
&lt;div class=&#039;widget-content&#039;&gt;
&lt;h2&gt;Related post&lt;/h2&gt;
&lt;span style=&quot;font-size: xx-small;&quot;&gt;&lt;a href=&quot;http://imsanz.net/&quot; target=&quot;_blank&quot;&gt;get more&lt;/a&gt;&lt;/span&gt;
&lt;div id=&#039;data2007&#039;/&gt;&lt;br/&gt;&lt;br/&gt;
&lt;script type=&#039;text/javascript&#039;&gt;
var homeUrl3 = &amp;quot;&lt;data:blog.homepageUrl/&gt;&amp;quot;;

var maxNumberOfPostsPerLabel = 5;
var maxNumberOfLabels = 3;
maxNumberOfPostsPerLabel = 5;
maxNumberOfLabels = 3;

function listEntries10(json) {
var ul = document.createElement(&amp;#39;ul&amp;#39;);
var maxPosts = (json.feed.entry.length &amp;lt;= maxNumberOfPostsPerLabel) ?
json.feed.entry.length : maxNumberOfPostsPerLabel;
for (var i = 0; i &amp;lt; maxPosts; i++) {
var entry = json.feed.entry[i];
var alturl;
for (var k = 0; k &amp;lt; entry.link.length; k++) {
if (entry.link[k].rel == &amp;#39;alternate&amp;#39;) {
alturl = entry.link[k].href;
break;
}
}
var li = document.createElement(&amp;#39;li&amp;#39;);
var a = document.createElement(&amp;#39;a&amp;#39;);
a.href = alturl;
if(a.href!=location.href) {
var txt = document.createTextNode(entry.title.$t);
a.appendChild(txt);
li.appendChild(a);
ul.appendChild(li);
}
}
&lt;!--Bloggertrix.com--&gt;
for (var l = 0; l &amp;lt; json.feed.link.length; l++) {
if (json.feed.link[l].rel == &amp;#39;alternate&amp;#39;) {
var raw = json.feed.link[l].href;
var label = raw.substr(homeUrl3.length+13);
var k;
for (k=0; k&amp;lt;20; k++) label = label.replace(&amp;quot;%20&amp;quot;, &amp;quot; &amp;quot;);
var txt = document.createTextNode(label);
var h = document.createElement(&amp;#39;b&amp;#39;);
h.appendChild(txt);
var div1 = document.createElement(&amp;#39;div&amp;#39;);
div1.appendChild(h);
div1.appendChild(ul);
document.getElementById(&amp;#39;data2007&amp;#39;).appendChild(div1);
}
}
}
function search10(query, label) {
var script = document.createElement(&amp;#39;script&amp;#39;);
script.setAttribute(&amp;#39;src&amp;#39;, query + &amp;#39;feeds/posts/default/-/&amp;#39;
+ label +
&amp;#39;?alt=json-in-script&amp;amp;callback=listEntries10&amp;#39;);
script.setAttribute(&amp;#39;type&amp;#39;, &amp;#39;text/javascript&amp;#39;);
document.documentElement.firstChild.appendChild(script);
}
var labelArray = new Array();
var numLabel = 0;
&lt;b:loop values=&#039;data:posts&#039; var=&#039;post&#039;&gt;
&lt;b:loop values=&#039;data:post.labels&#039; var=&#039;label&#039;&gt;
textLabel = &amp;quot;&lt;data:label.name/&gt;&amp;quot;;
var test = 0;
for (var i = 0; i &amp;lt; labelArray.length; i++)
if (labelArray[i] == textLabel) test = 1;
if (test == 0) {
labelArray.push(textLabel);
var maxLabels = (labelArray.length &amp;lt;= maxNumberOfLabels) ?
labelArray.length : maxNumberOfLabels;
if (numLabel &amp;lt; maxLabels) {
search10(homeUrl3, textLabel);
numLabel++;
}
}
&lt;/b:loop&gt;
&lt;/b:loop&gt;
&lt;/script&gt;
&lt;/div&gt;
&lt;/div&gt;
&lt;/b:if&gt;