// ==UserScript==
// @name           Solr admin page Sort field extended
// @namespace      net.anoncom.greasemonkey.
// @include        http://*/solr/admin/form.jsp
// ==/UserScript==

// qq
//document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<strong>Start Row<\/strong>\n\s*<\/td>\n/g, "<td><strong>qq</strong></td>\n<td><input type=\"text\" name=\"qq\" value=\"\" /></td>\n</tr>\n<tr>\n  <td>\n\t<strong>Start Row</strong>\n  </td>\n");


// XSLT Response Writer
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<strong>Debug\: enable<\/strong>\n\s*<\/td>\n/g, "<td><strong>Template Filename</strong></td>\n<td><input type=\"text\" name=\"tr\" value=\"\" size=\"40\" /></td>\n</tr>\n<tr>\n  <td>\n\t<strong>Debug: enable</strong>\n  </td>\n");

// Sort
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>Sort</strong></td>\n<td><input type=\"text\" name=\"sort\" value=\"score desc\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");


// 
// SpellCheckComponent
// 
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>SpellCheckComponent</strong> <a href=\"http://wiki.apache.org/solr/SpellCheckComponent\" title=\"Open with new window\" style=\"margin:0px;\" onclick=\"window.open('http://wiki.apache.org/solr/SpellCheckComponent');return false;\" onkeypress=\"if(window.event.keyCode==13){window.open('http://wiki.apache.org/solr/SpellCheckComponent');return false;}\">&#10063;</a></td>\n<td><input type=\"checkbox\" name=\"spellcheck\" value=\"on\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    spellcheck query
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>query</em></strong></td>\n<td><input type=\"text\" name=\"spellcheck.q\" value=\"\" />&nbsp;&nbsp;</td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    accuracy
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>accuracy</em></strong></td>\n<td><input type=\"text\" name=\"spellcheck.accuracy\" value=\"\" size=\"4\" />&nbsp;&nbsp;<em><font size=\"-1\">Please input by float value if you specified. (default: 0.5)</font></em></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    onlyMorePopular
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>onlyMorePopular</em></strong></td>\n<td><input type=\"checkbox\" name=\"spellcheck.onlyMorePopular\" value=\"true\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    extendedResults
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>extendedResults</em></strong></td>\n<td><input type=\"checkbox\" name=\"spellcheck.extendedResults\" value=\"true\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    collate
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>collate</em></strong></td>\n<td><input type=\"checkbox\" name=\"spellcheck.collate\" value=\"true\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");




// 
// MoreLikeThis
// 
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>MoreLikeThis</strong> <a href=\"http://wiki.apache.org/solr/MoreLikeThis\" title=\"Open with new window\" style=\"margin:0px;\" onclick=\"window.open('http://wiki.apache.org/solr/MoreLikeThis');return false;\" onkeypress=\"if(window.event.keyCode==13){window.open('http://wiki.apache.org/solr/MoreLikeThis');return false;}\">&#10063;</a></td>\n<td><input type=\"checkbox\" name=\"mlt\" value=\"on\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    fieldList
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>fieldList</em></strong></td>\n<td><input type=\"text\" name=\"mlt.fl\" value=\"\" size=\"40\" />&nbsp;&nbsp;</td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    count
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>count</em></strong></td>\n<td><input type=\"text\" name=\"mlt.count\" value=\"\" size=\"4\" />&nbsp;&nbsp;</td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    mintf
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>minimum tf</em></strong></td>\n<td><input type=\"text\" name=\"mlt.mintf\" value=\"\" size=\"4\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    mindf
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>minimum docFreq</em></strong></td>\n<td><input type=\"text\" name=\"mlt.mindf\" value=\"\" size=\"4\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    minwl
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>minimum word length</em></strong></td>\n<td><input type=\"text\" name=\"mlt.minwl\" value=\"\" size=\"4\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    maxqt
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>maximum number of query tokens</em></strong></td>\n<td><input type=\"text\" name=\"mlt.maxqt\" value=\"\" size=\"4\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    maxntp
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>maximum number of tokens to parse</em></strong></td>\n<td><input type=\"text\" name=\"mlt.maxntp\" value=\"\" size=\"4\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    boost
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>boost</em></strong></td>\n<td><select name=\"mlt.boost\"><option value=\"true\" selected=\"selected\">true</option><option value=\"false\">false</option></select></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    qf
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>query fields</em></strong></td>\n<td><input type=\"text\" name=\"mlt.qf\" value=\"\" size=\"40\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");


// 
// StatsComponent
// 
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>StatsComponent</strong> <a href=\"http://wiki.apache.org/solr/StatsComponent\" title=\"Open with new window\" style=\"margin:0px;\" onclick=\"window.open('http://wiki.apache.org/solr/StatsComponent');return false;\" onkeypress=\"if(window.event.keyCode==13){window.open('http://wiki.apache.org/solr/StatsComponent');return false;}\">&#10063;</a></td>\n<td><input type=\"checkbox\" name=\"stats\" value=\"on\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    field
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>field</em></strong></td>\n<td><input type=\"text\" name=\"stats.field\" value=\"\" size=\"40\" />&nbsp;&nbsp;</td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    facet
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>facet</em></strong></td>\n<td><input type=\"text\" name=\"stats.facet\" value=\"\" size=\"40\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");


// 
// TermsComponent
// 
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>TermsComponent</strong> <a href=\"http://wiki.apache.org/solr/TermsComponent\" title=\"Open with new window\" style=\"margin:0px;\" onclick=\"window.open('http://wiki.apache.org/solr/TermsComponent');return false;\" onkeypress=\"if(window.event.keyCode==13){window.open('http://wiki.apache.org/solr/TermsComponent');return false;}\">&#10063;</a></td>\n<td><input type=\"checkbox\" name=\"terms\" value=\"on\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    field list
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>field list</em></strong></td>\n<td><input type=\"text\" name=\"terms.fl\" value=\"\" size=\"40\" />&nbsp;&nbsp;</td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    lower
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>lower</em></strong></td>\n<td><input type=\"text\" name=\"terms.lower\" value=\"\" size=\"40\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    lower.incl
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>lower include</em></strong></td>\n<td><select name=\"terms.lower.incl\"><option value=\"true\" selected=\"selected\">true</option><option value=\"false\">false</option></select></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    mincount
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>minimum count of document frequency</em></strong></td>\n<td><input type=\"text\" name=\"terms.mincount\" value=\"\" size=\"4\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    maxcount
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>maximum count of document frequency</em></strong></td>\n<td><input type=\"text\" name=\"terms.maxcount\" value=\"\" size=\"4\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    prefix
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>prefix</em></strong></td>\n<td><input type=\"text\" name=\"terms.prefix\" value=\"\" size=\"20\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    limit
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>limit</em></strong></td>\n<td><input type=\"text\" name=\"terms.limit\" value=\"\" size=\"4\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    upper
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>upper</em></strong></td>\n<td><input type=\"text\" name=\"terms.upper\" value=\"\" size=\"20\" /></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    upper.incl
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>upper include</em></strong></td>\n<td><select name=\"terms.upper.incl\"><option value=\"true\">true</option><option value=\"false\" selected=\"selected\">false</option></select></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    raw
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>raw</em></strong></td>\n<td><select name=\"terms.raw\"><option value=\"true\">true</option><option value=\"false\" selected=\"selected\">false</option></select></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");
//    sort
document.body.innerHTML = document.body.innerHTML.replace(/<td>\n*\s*<\/td>\n/g, "<td><strong>&nbsp;&nbsp;&nbsp;&nbsp;<em>sort</em></strong></td>\n<td><select name=\"terms.sort\"><option value=\"count\" selected=\"selected\">count</option><option value=\"index\">index</option></select></td>\n</tr>\n<tr>\n  <td>\n\n  </td>\n");

