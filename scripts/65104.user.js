<script>
<!--
/*
Random link button- By JavaScript Kit (http://javascriptkit.com)
Over 300+ free scripts!
This credit MUST stay intact for use
*/
// ==UserScript==
// @name            Bath and body works random scent generator
// @namespace       http://www.bathandbodyworks.com/  
// @description     Opens a random scent from B&B.com
// @include         *bathandbodyworks.com/*
// ==/UserScript==

//specify random links below. You can have as many as you want
var randomlinks=new Array()

randomlinks[0]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314702"
randomlinks[1]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2077815"
randomlinks[2]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3451308"
randomlinks[3]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3525200"
randomlinks[4]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314703"
randomlinks[5]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2174688"
randomlinks[6]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2174685"
randomlinks[7]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2077818"
randomlinks[8]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314705"
randomlinks[9]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2073259"
randomlinks[10]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314706"
randomlinks[11]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314707"
randomlinks[12]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2470872"
randomlinks[13]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2289849"
randomlinks[14]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2217134"
randomlinks[15]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314708"
randomlinks[16]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314709"
randomlinks[17]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2077824"
randomlinks[18]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314710"
randomlinks[19]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314711"
randomlinks[20]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314712"
randomlinks[21]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2077823"
randomlinks[22]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3765530"
randomlinks[23]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2077827"
randomlinks[24]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2445977"
randomlinks[25]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2077829"
randomlinks[26]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314713"
randomlinks[27]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2077831"
randomlinks[28]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314714"
randomlinks[29]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2967375"
randomlinks[30]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=3314715"
randomlinks[31]="http://www.bathandbodyworks.com/family/index.jsp?categoryId=2077832"
randomlinks[32]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[33]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[34]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[35]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[36]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[37]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[38]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[39]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[40]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[41]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[42]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[43]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[44]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[45]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[46]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[47]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[48]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[49]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[50]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[51]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[52]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[53]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[54]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[55]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[56]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[57]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[58]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[59]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[60]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[61]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[62]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[63]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[64]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="
randomlinks[65]="http://www.bathandbodyworks.com/family/index.jsp?categoryId="


function randomlink(){
window.location=randomlinks[Math.floor(Math.random()*randomlinks.length)]
}
//-->
</script>
<form>
<p><input type="button" name="B1" value="Random Link >>" onclick="randomlink()"></p> </form>

<!--Uncomment below to use a regular text link instead
<a href="javascript:randomlink()">Random Link</a>
-->