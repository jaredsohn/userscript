// ==UserScript==
// @name            MyYearbook Battle Page Jumper
// @namespace       gopu
// @include         http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzd
// ==/UserScript==
function do_platypus_script() {
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[6]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/HR[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<br></center><form name="gopupagejump"><select name="menu" onChange="location=document.gopupagejump.menu.options[document.gopupagejump.menu.selectedIndex].value;" value="GO"><option>Jump To Page:</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTE=">1</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTI=">2</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTM=">3</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQ=">4</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTU=">5</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTY=">6</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTc=">7</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTg=">8</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTk=">9</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTEw">10</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTEx">11</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTEy">12</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTEz">13</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTE0">14</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTE1">15</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTE2">16</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTE3">17</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTE4">18</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTE5">19</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTIw">20</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTIx">21</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTIy">22</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTIz">23</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTI0">24</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTI1">25</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTI2">26</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTI3">27</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTI4">28</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTI5">29</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTMw">30</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTMx">31</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTMy">32</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTMz">33</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTM0">34</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTM1">35</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTM2">36</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTM3">37</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTM4">38</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTM5">39</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQw">40</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQx">41</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQy">42</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQz">43</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQ1">44</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQ2">45</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQ3">46</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQ4">47</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQ5">48</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTQ6">49</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTUw">50</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTUx">51</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTUy">52</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTUz">53</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTU1">54</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTU2">55</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTU3">56</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTU4">57</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTU5">58</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTU6">59</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTYw">60</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTYx">61</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTYy">62</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTYz">63</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTY0">64</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTY1">65</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTY2">66</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTY3">67</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTY4">68</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTY5">69</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTcw">70</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTcx">71</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTcy">72</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTcz">73</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTc0">74</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTc1">75</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTc2">76</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTc3">77</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTc4">78</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTc5">79</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTgw">80</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTgx">81</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTgy">82</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTgz">83</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTg0">84</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTg1">85</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTg2">86</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTg3">87</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTg4">88</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTg5">89</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTkw">90</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTkx">91</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTky">92</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTkz">93</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTk0">94</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTk1">95</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTk2">96</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTk3">97</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTk4">98</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTk5">99</option><option value="http://www.myyearbook.com/?mysession=bGlzdGluZ19teWJhdHRsZWxpc3QmYmF0dGxlbGlzdD0xJnVzZXJpZD0xMDUxOTI3MSZwYWdlPTEwMA==">100</option></select></form></center>',false,false);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");

//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing all the code to implement Platypus
//  actions.  Can be "included" into the Platypus script.
//
// 
// 
function walk_down(node, func) {
  if (node.nodeType == 1) {
    if (node.tagName != "IMG") func(node);
    if (node.childNodes.length != 0)
      for (var i=0; i<node.childNodes.length; i++)
walk_down(node.childNodes.item(i),func);
  }
}
function make_bw(doc, node) {
  walk_down(node,
            function (node) {
      if (node.tagName != 'A') {
  node.bgcolor = "white";
  node.color = "black";
  node.style.backgroundColor = "white";
  node.style.color = "black";
  node.style.backgroundImage = "";
      }});
}
function center_it(doc, node) {
  var center_node = doc.createElement ("CENTER");
  node.parentNode.insertBefore(center_node, node);
  node.parentNode.removeChild(node);  
  center_node.appendChild(node);
  return center_node;
};
function erase_it(doc, node) {
  var offset_height = node.offsetHeight;
  var offset_width = node.offsetWidth;
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "height: "+offset_height+"; width: "+offset_width+";");
  node.parentNode.insertBefore(replacement_div, node);
  node.style.display = "none";
  return replacement_div;
};
function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
function script_paste(doc, where, what) {
    var new_node = what.cloneNode(true);
    new_node.style.display = "";
    where.parentNode.insertBefore(new_node, where);
};
function isolate(doc, node) {
  if (!node.parentNode) return;
  node.parentNode.removeChild(node);
  while (doc.body.childNodes.length > 0) {
    doc.body.removeChild(doc.body.childNodes[0]);
  };
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "margin: 0 2%; text-align: left");
  replacement_div.appendChild(node);
  doc.body.appendChild(replacement_div);
};
function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};
function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
node.href = node.href.replace(match_re, replace_string);
    };
};
function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
function relax(doc, node) {
  walk_down(node, function (node) {
      node.style.width = 'auto';
      node.style.marginLeft = '0pt';
      node.style.marginRight = '0pt';
      if (node.width) node.width = null; });
}
function fix_page_it(doc, node) {
    doc.background = null;
    doc.bgColor = "white";
    if (doc.style) {
      doc.style.backgroundColor = "white";
      doc.style.backgroundImage = "none";
      if (doc.style.color == "white") {
doc.style.color = "black";
      };
      if (doc.text == "white") {
doc.text = "black";
      };
    };
    doc.body.background = null;
    doc.body.bgColor = "white";
    if (doc.body.style) {
      doc.body.style.backgroundColor = "white";
      doc.body.style.backgroundImage = "none";
      if (doc.body.style.color == "white") {
doc.body.style.color = "black";
      };
      if (doc.body.text == "white") {
doc.body.text = "black";
      };
    };
};
function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
};
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};
function auto_repair_it(doc, node) {
  var biggest_elem = find_biggest_elem(doc);
  isolate(doc, biggest_elem);
  relax(doc, biggest_elem);
  make_bw(doc, biggest_elem);
  fix_page_it(doc, biggest_elem);
};
function find_biggest_elem(doc) {
  const big_element_limit = 0.25;
  var size_of_doc = doc.documentElement.offsetHeight *
      doc.documentElement.offsetWidth;
  var body = doc.body;
  var size_of_body = body.offsetHeight * body.offsetWidth;
  if (size_of_body < (0.80 * size_of_doc)) {
      size_of_body = size_of_doc;
  };
  var max_size = 0;
  var max_elem = doc;
  var allElems = document.evaluate("//*",
 doc.body, null,
 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
 null);
  for (var i = 0; i < allElems.snapshotLength; i++) {
    var thisElem = allElems.snapshotItem(i);
    var thisElem_size = thisElem.offsetHeight * thisElem.offsetWidth;

    if (thisElem_size < size_of_body &&
thisElem_size > max_size &&
!contains_big_element(thisElem, size_of_body * big_element_limit)) {
      max_size = thisElem_size;
      max_elem = thisElem;
    };
  };
  return max_elem;
};

function contains_big_element(node, limit) {
    if (node.childNodes.length != 0)
for (var i=0; i<node.childNodes.length; i++) {
    var child = node.childNodes.item(i);
    var child_size = child.offsetHeight * child.offsetWidth;
    if (child_size > limit) return true;
};
    return false;
};

function platypus_do(win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning(platypusplatypuscouldntfi1+
func_name+platypusthisusuallyhappens);
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};

//.user.js