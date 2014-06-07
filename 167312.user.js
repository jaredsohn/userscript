// ==UserScript==
// @name        da_devfolder
// @namespace   da_devfolder
// @description folders for deviation notifications
// @match     	http://*.deviantart.com/messages/*
// @version     0.2
// ==/UserScript==
 var star="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QULDSUvNm%2FTzQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABpElEQVQ4y8WTv07bUBTGf%2FF1HVnURjhAqiKZKMBQqe3awQMM8AAs2RgqdeheKWIIWya6FUa2SEh44R2qpC%2BQrWqjRpEqRSBDHIKTQggDdoQhCW5A4kznfuecT9%2F5c%2BFZzDJyWEbuyfheHxhNrcfvKLlSFHVCCKWv9FGElrEMZGOSJHwk62NjK9yYXulqwcP3N8YjtIw9IKO8F2cB1Mk3KkDGjw00MbBNU90CMtMrXU0kpX%2BSEC%2Fab1oNAL2ivDr%2FIy1hqguYaoOaV71dHrt3HpAF0IrOUQBPHSbnT9brVc02ZgPs7zd6vrtNycmHCS0jpxWdj8PacBfSaQD1S6U%2BLKe9b%2BxScvJyADTXZhIPnUS7nIoNj7qjW0YVVwAsTnQA%2BNWKh95lVx3UcngpNe87pvoDkLnsvdXnEnon3m0B4FzIALr8MtH5eXIF2MAmJacwfCkDzoZ3uhdS6HUlwKbkfPq%2FO7wpsHVX6W9Wn52aHEUW5acU3Opxsz%2F2G78wqkCMpKt5VUxVkIx%2FwLmQuex9vTuz8exzqs7qzGmUVDkSYdnd4bnsGhBng9S9bmKjAAAAAElFTkSuQmCC";
 var hstar="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QULDSUqRgUnQgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAADPElEQVQ4y8WUS2icVRTHf%2Fd%2Br3kkmfmmyWQmM5NWqeKmokYounFRREUEFyoq%2BNp0I%2Bgi6koLFbsW60LtSlSQggsXQoq6EXEhPlBcaRCbycw0SSeZtJnH97r3usiXMJQEQRDP8p5zfvd%2FDucc%2BD%2FMvcc%2FI%2B%2F13%2FjXAAPCwKSBsoHGyXcL%2FRN%2FsmKgasA34B6WKw%2BA5YAqUAMaz9%2BSf73Rw52%2FjP30rfkz6fucgeI%2FAg3kgTJQAaqfzLgPRIJnqlvGqjexIyGeuzDrPZj6ywaO3Ai0x2AeUAJmgGnAb7ny4ePzKpvrCp00sYpHk2x7KB8BlvdyDSQCrh2kcArwU%2Bj0%2Bar3khbcfdQxcXVTiVobe%2F62YDsRnDxXz7ySxvlAwYCzB7HSX1x25c98dsS5b8l3n4qluGtuRrnl2JjCADmplMqECKlkbnMgZ7%2BZcuaXs9ZoYaBWgdFZCAFECpwC6i%2FflHt1KHmyFhlx%2FNQoLK9jlTaxMldtTxWTqKccu1sQesOX5vffpF71pHG0%2BfDiH4OzAtb3gccWCufm37%2F2bGMFu9HErq1i11pYlQ727Br2zX9JByn5cS6J1wqoto9uFVEtH71aQjVL6OVLpXf4buste6%2BROy8Wi%2F1Ai36g5TBUchRoqQIlCLXEGDAGa%2BCihSWUskkCS8R9m7hni2jDFjBkvOQC0Fg8ln1tKMXj9UjLmjJUQy0rAvKxEXFi6LrSrJWcpJOzdLOfWC1Palfz0cfLgzcFdMaBuXRg65%2BXnFNtV96vBHfMeq7rJ3GUUYYo0HLHFmarkHXaYRhahh%2FmIv3FCxvRJaAtoLsPTKE1YC7dksqFWe%2F0SHKiMGkrTyOiQSKHUtAT4Gl%2BXuwEbwNr7Crr7NU8PofXgW2gB3RPr4cfWIZfrniZbHPCUm1Pmo3pvGsbflrsBOfTuG3g%2Bn4DxzdFwE66LfauYOJ6pL9cGo5udysZHQdah4MgeCjQS%2ByOSA%2FYSqGHHodN4GqacOXRrfjrrObiyqStWp7UE8p8%2BsRm9FXqXwe6AqJxgDjkfE0Ak%2BweC%2FfOx6rf6tXA%2FfX73gIQAH1gW4A%2B9Djc8Esf6BvIAE738vC91NUGRgeB%2FjP7G%2FoiW%2F3Ii3KYAAAAAElFTkSuQmCC";
var buchcl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUKFTsiNhYFAgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABxUlEQVQ4y82UMWsUURSFv3tnskZRowZDEKysLCIIxsoioOAfMJ3%2BAEVTRyzUSisb7azEMv4DLSysREixYCeCxMhGNLgsmmR891jMRGaX3c0GU3jhNfPmfXPuOfeNSWIvy9nj%2Bv%2BBee8DuzDZ5tT%2BD6Mc1rOVs6MpLNIYRcoIMoSB%2BLtqKZrZ7R0VAhCe862YhtRf2onGxxr0mqTnw4EpOUfHWrgCVTodYRZA1N6cA%2B7srDCR4SEkw90JExGJzBxTEARuMVIopduW8yNNVP13fQmA4%2FnK7oC%2FwzmQtTGibFWBEZgLIwgyoBgdGGQQARgy4WYgwyVMhly7G2yRsaGDbOgQP%2BMwnXSEThyjnSbPf9qcfvzmi3UPrz3E7NwQhZaTawsz4SZQ1brH1ebX4mYLz159btyA14IrwHx18t0AYHLcSrfKiTZEYMHC7FSDt2tbt1YZb8Fl4CSwhLQ4LGUjZAhDEbgbjqMypIXZKc%2BX19ZjlRng6TZsMPBXqnubdY8OPHr%2FvXN9nfF70ATmMWMbav1%2BsLU7Ote7dxf2Bcw4NO%2FDpmC58nAJabGvQkkPrEztZe%2FeBJw%2BAxcvwRMAq0wGXgxU%2BC%2F1B0Xrwk3QpigrAAAAAElFTkSuQmCC";
var disk="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QULDS01A9SgvwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA0ElEQVQ4y2NgGOyAEZnD6yr3nxxDPu9%2BBDeHBcMGUQ6iDYrU8GRYdng9AwMDwzIGBoYorAYiK8YHlt%2FYzrD8xnZkoQwGBoYZLLgMYxfjwe86Bk90AxnwuvDnqy9kRQpOAwm5EJeFLLjCJ5KBcBiS5EJcGsjyMjcfN8OXu28JJ2IsSYwFn4Yo20CcctD0R5qBuAzAZxETSfmUiFzERMVywY5iA%2F%2B%2F%2FsHwefej5QwMDIdgeZmi0gbJsBlYiy9Y%2BJNgJophuAyEGXqIiDCLonmJDQCW%2FTng1KHaLAAAAABJRU5ErkJggg%3D%3D";
var hdisk="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QULDS833%2ByjEQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAx0lEQVQ4y2NgGOyAEYVXIPOfLFMmPIGbw4IhqSdItDm7wucxuFUHMjAwMCxjYGCIwm4gkmJ8wG1lEoPbyiRkoQwGBoYZLLgM4%2BeSIuw6VAMZ8Lrw47dnZAUnTgMJuRCXhSy4woeYMCTJhbg0kOVlQTkJhvdbrhPWjSWJseCNydb1uL0MSX%2BkGYjLAHwWMZEUQETkIiYqlgt2lBt46T0Dw4QnyxkYGA7B8jJlpQ3CsBnYiy8IWEaCkSiG4TIQZughIsIsiuYlNgCW%2FjRKPBg%2BOgAAAABJRU5ErkJggg%3D%3D";
var delim="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QULDgUQF8tkCwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABwElEQVQ4y%2BWUQWsTQRTHf28mFhuDC9mKCh4iJZdSRPBgqfftJ%2FBk7MfoJ%2FCUr2HO3kSSqyAIRURylkJrE9oubUzZZHd2ZjxsIiGalNKT%2BC7D%2FHnzY97%2FvRn470L%2BJqpG7TWwB2xOpC7QdK2Dt9cGqkatDUT3XnkuXvQhVYQfH9N%2FlwB0XOtgZxlQz8OCbYn0mx%2BM6wPEarwVhieX8HBMUKmuZ%2Fcr2%2F7bRWsRUM2VGSWNHkZZUixpeQwoSk88BJ7zvAcQTXKXA4G9By9XwQjWOtzED1tOIRf0hkAIOjBM%2FL0SuBk%2FPYRUgSmhrUKGt%2BBnCXLAKMgFEybMNOuPKM1uXKbAe%2FTJaiF4cEZwRsFYCnC%2BvMuzN%2Bya90AikAguFRgJjBSMBPsdMHB7EEzH6EpgU%2B1XsV805quGS41LNH4k2ENY37dwCtmgyJ0e8lBfOIeqUWvf2ShHw7QHVVAVYAVcX%2BDU45vnfA5X4q04W%2FPQBiKZYywcbPcoLix2AplBnYV8%2BnAcP4%2BzEOgAEdAR2FlUctGY4iXsqqOwq44C1PFd1FnYBXa34mxtGeza4aHtwc%2BuNwX%2BhkyhN4E9W6DX%2F60P9heUILfbuquRlQAAAABJRU5ErkJggg%3D%3D";
var hdelim="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QULDgYCz19GgAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACo0lEQVQ4y%2BWUy0vUURTHP%2Ff3dJzxMeM4Zg8KS7OaaiWZpAVBb4ikiJZtbRvUuug%2FqGW0aBf0WtgmLHtrRDC9CzIQZ9LReWrO4%2Fe4LX6TSGoYtOu7uXdxz%2Fd8zz3nfOEfQ0hQAAFIAe5ygqT3XlksRgH8wAog8BdCVKAJCFUEzUGrqNOBRgm1JXB2HWzuHQlofTlD2SyFwG%2B5H1pm7Muv%2BhO3NY%2FMqIixK%2FELStAk7JNw%2FUXYnLrSViPPnG2QoYQhzUmf7L24Vl6M1snBiDkhoV9Cn4TQYtI1vBS2hLq0oZzonCqZrW6Jgbjg3SedeIPLtk%2FfOZ6yaU%2B6EeAQ8BmYWZIQ4FK0rmP3RNHcmSrRkIbOZ5JMbZmcT2fPB4f1Se%2FvR6tV3gSNlUfiBf5IeGdN9TFzq04pYbH9nUskCXsHoGBarB4DS4f3zSrD9VUMBKs7D8QL8o%2BEsaCxYexcno63Oif7y3QOS5oToDqQrRHENqrcaDG4F1EZn6xeO%2BQ1ZAHmWu4ogqyhkPWpFISGLRSE6xG6AooaTOuQ0wSWKni61GD%2Fumw7vPJLd1W6tWfWZkfMIZyRpOoFZU0QzkhcINak8iLo50lt1be7DybazEVUzpV8dGz25q4k57vSNoESJIOCoahGJiDoeu2wZdShe8RmRc0s7XXWc%2BO3gV5AeCGWfZUylFKgjDmjw9AqjWtRk0SjwnS6TE1Gsi7vsilvsSlvjS%2B1QhrADy9buaHsPvoa0Lpeh4zA42aHIamSzao8rLfwN%2FnpEcXclpz1FUgCPqC8mDmEKnvpA3DAOdXduP9l2Dwd96ntriIIF52PO6dKV28NJu8r3upZng7yQGa%2BQQgJYSACZAUkluk2RsVQikBKgDOfUKuYgy28zMu1L927Ygvv%2FF%2FxE0fK%2F9%2BgIH1jAAAAAElFTkSuQmCC";
var glass="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QULFSIhjKOaxQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA7UlEQVQ4y%2B2ULQ7CMBSAv5IJwgLBoEhqCAmeC2A4xCSHwJJwEiQnQE3AAUDgMJglKBDLFgiuCNZQyjpGMAie6Wvfly%2F9eSn849sQrkJ9KJXO0zASrrVSwvpQKtGqoo7XB2jNXVJRRvaJ1LNltVECJABcZo0nkZbdGR1SmVLvVQbnIAbAz6TmrvIYU%2BrZxzoHMf68WfiSRUylTCukYbRMw2hZhvWeL1cq3yheZg0y0QrYp2G0Ajl1MG3gIN70n5YtLGZtMWNg4%2BrDCTAA1sAW2GkY6GdjD%2Bhk3Nio5wq7Rq6AGDhZTNvID%2F8P58fjBibFdCeHpD%2FbAAAAAElFTkSuQmCC";
var hglass="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QULFSMfVNm2LwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA30lEQVQ4y%2B2UsQqCUBRAz4uGGgSXpsBFgtboB1r8jBb%2FwTXoR%2FyLJgf7ACPaWloEpxoEh9psUZOLz5SWBu%2Fy7n33cOC9d3kwxK%2BhdA3DsfIyz4JY6fY6CQ3HytVsQn5%2FfUBR66Sqi6yPVEnZOZ5W9cp6NookU5eqJpnpugCkvl9JpUwypXQsj2W6Lqnvt75kGzPqMgpZEIdZEIe9x6bpDgvREbgBtuFYew2zBRL1Zf5K2UEwkWA84KSbwx2wASLgAlxLGFgX6xKwC86r9RuFi1qeAynwEMy8lifDh%2FPn8QZDcm2uPhtrsQAAAABJRU5ErkJggg%3D%3D";
var buch="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QADgCSAK6JiudvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUMFBk32NCSIgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACWUlEQVQ4y52T30tTYRjHP0e2CxsrWDXr5M7KmSg5sxgDCwLNRR3wRq%2B92H3Xg%2F6CoH%2FCC6%2B1dHAoNnYhRSVLwR85Vmaeo9OlIbkEkWBd5Pv6nrUR9sCB877P83x4vt%2F3fTWU8CeMqrquZGztNHkAj1qcHBmVCaewRpbXVdGk5vfK3%2Fm5t%2B%2FKi3AVzy7kKe9%2B42ZnFG3%2FF%2BWvWywerAIgYG8%2BvKOw%2FJEH8X6ZV6FNApbOWcR7YgwNmBh6iMKXIgBRX0TCnmem8Xo9tJwPApBfmiPqi7isaBI%2FQwMmAOmcBUBnWwcrqwUpZeLVC4KBIM7WhtyLdd9W1d53Ae2SA8DgnX4AXs5k6Yp0yuorQZ3Do0OutV498Xl7o%2FZMToCGHiKds1gsLgPw8N6gq6G0s4UevEy7EeFurA%2BA0KXWxsB0zmJowCTeEwPg7fysq%2BFHZZ%2BwbnDW7wegvLtDfmmuMVB4aJcc0jmLvltxl4fJkVHONDez%2FGkFgJYLF2s9dANnF%2FJSuoCrHgKMTYxz43oXM%2B%2FbmCv2snn0iIYXW0gVd7FX78LZ3pCy7ZJDwPuYqWk4GDYlYHMSAl6okHID7ZKDoYck2CmsuTycz3dLUDLRfjI1f%2FbCkF23UppHPeWxiXHX%2BFFf5C9JyUQ7Y5nPDdce1R%2F1LYu9qC%2FC1PQ5OZ3arMbBsEkYqpp4NpWM%2FaReoT9hPA14H7t8azSdb9LCc%2FywO4BQPWAlYw8GTLL%2FgtVKLh5%2FdWPdSmlhqNabUp1u3UppTfxnNPJSOw0kbD6rigMQkn2TllRxamAtWAWJ%2BA2r3AJr3QFa6gAAAABJRU5ErkJggg%3D%3D";

// <object type="image/svg+xml" data="green-circle.svg" width="64" height="64" border="1"></object>
var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;

 var block='<div id="dA_devfolder_box"><div id="dA_devfolder_box_cols">Name:<img id="dA_devfolder_box_col_sav" class="diskimg" alt="save quicklist" title="save quicklist" src="'+disk+'" /><img id="dA_devfolder_box_col_del" alt="remove quicklist" title="remove quicklist" src="'+delim+'" /><input type="text" value="" id="dA_devfolder_box_collist"/></div><div id="dA_devfolder_box_header"><input type="text" value="" id="dA_devfolder_box_filter"/><img id="dA_devfolder_box_submit" class="starimg" alt="add to list" title="add to list" src="'+star+'" /></div><div id="dA_devfolder_box_scroll"><div id="dA_devfolder_box_wrap"></div></div></div>';
 var bar='<div id="dA_devfolder_bar"><div class="dA_devfolder_barel">'+
 '<img id="dA_devfolder_bar_add" alt="Add a quicklist" title="Add a quicklist" class="dA_devfolder_bar_add starimg" src="'+star+'" />'+
 '<img id="dA_devfolder_bar_run" alt="grab all pages" title="grab all pages" class="dA_devfolder_bar_run glassimg" src="'+glass+'" />'+
 '<img id="dA_devfolder_bar_help" alt="Show help file" title="Show help file" class="dA_devfolder_bar_help" src="'+buch+'" />'+
 '</div></div>';
 GM_addStyle( "#dA_devfolder_box{display:none;color:#3E4D49;width:200px;background-color:#B2C4AE;border-radius:5px;border:2px ridge #719169;position:absolute;z-index:99;top:50%;left:50%;margin-left:-100px;}"+
 ".dA_devfolder_box_row,#dA_devfolder_box_header,#dA_devfolder_box_cols{position:relative;padding:5px;}"+
 "#dA_devfolder_box *, #dA_devfolder_bar *{vertical-align:middle;}"+
 "#dA_devfolder_box_scroll{overflow-x:hidden;overflow-y:auto;}"+ 
 "img.filteradd{vertical-align:middle;cursor:pointer;}"+ 
 "#dA_devfolder_box_submit,#dA_devfolder_bar_run,#dA_devfolder_bar_help,#dA_devfolder_bar_add,#dA_devfolder_box_col_sav,#dA_devfolder_box_col_del{height:20px;width:20px;margin-left:10px;cursor:pointer;}"+
 "#dA_devfolder_box_col_sav{position:absolute;right:20px;}"+
 "div.collentr{border-radius:5px;cursor:pointer;padding:0 5px}"+
 "#dA_devfolder_box_col_del{position:absolute;right:0px;}"+
 "#dA_devfolder_box_collist{display:block;width:180px;margin:auto;}"+
 "#dA_devfolder_box_cols{border-bottom:3px ridge green;}"+
 "img.dA_devfolder_box_rem{cursor:pointer;position:absolute;right:0px;width:20px;height:20px;}"+
" .dA_devfolder_box_checkwrap {width: 35px;height: 15px;background: #333;margin: auto;border-radius: 50px;position: relative;display:inline-block;margin-right:5px;border:2px inset black;}"+
" .dA_devfolder_box_row>label {cursor:pointer;word-wrap: break-word;display:inline-block;width:110px;}"+
" .dA_devfolder_box_checkwrap label {display: block;width: 20px;height: 14px;border-radius: 50px;-webkit-transition: all .5s ease;-moz-transition: all .5s ease;-o-transition: all .5s ease;-ms-transition: all .5s ease;transition: all .5s ease;cursor: pointer;position: absolute;top: 0px;z-index: 1;left: 2px;background-color: #B2C4AE;}"+
".dA_devfolder_box_checkwrap input[type=checkbox]{display:none;}"+
".dA_devfolder_box_checkwrap input[type=checkbox]:checked + label {left: 14px;background-color: #26ca28;}"+
".dA_devfolder_barel {display: inline-block;margin:10px;}"+
"#dA_devfolder_bar_add {width:20px;height:20px;}"+
"#dA_devfolder_bar * {vertical-align:middle;}"+
"#dA_devfolder_bar {background-color: #B2C4AE;border: 2px inset #719169;border-radius: 10px 10px 10px 10px;color: #3E4D49;margin: 10px;}");

var filterlist={
	liste:	new Array(),//id chr(5) name chr(5) aktiv chr(6)
	getbyid:	function(id){
				for(var i=0;i<this.liste.length;i++){
					if(this.liste[i][0]==id)return new Array(i,this.liste[i]);
				}
				return null;
			},
	nextid:		function(val){
				if(val=="")return -1;
				var nid=0;
				this.liste=this.sortbyid();
				for(var i=0;i<this.liste.length;i++){
					if(this.liste[i][1]==val)return -1;
					if(parseInt(this.liste[i][0])==nid)nid++
				}
				return nid;
			},
	set:		function(val,aktiv){
				var nid=this.nextid(val);
				if(nid==-1)return false;
				var node=this.getbyid(nid);
				if(!node){
					this.liste.push(new Array(nid.toString(),val,aktiv));
				}else{
					this.liste[node[0]]=new Array(nid.toString(),val,aktiv);
				}
				this.liste=this.sortbyid();
				this.speichern();
				return true;
			},
	speichern:	function(){
				setTimeout(function(tthis){GM_setValue("filterlist",tthis.tostring());},0,this);
			},
	laden:		function(){
				var text="";
				if(typeof GM_getValue("filterlist")!="undefined"){text=GM_getValue("filterlist");}else{return;}
				if(text=="")return;
				this.liste=new Array();
				var satz=text.split(String.fromCharCode(6));
				for(var i=0;i<satz.length;i++){
					var werte=satz[i].split(String.fromCharCode(5));
					this.liste.push(new Array(werte[0],werte[1],werte[2]));
				}
			},
	sortbyid:	function(){
				return this.liste.sort(function(a,b){return (parseInt(a[0])-parseInt(b[0]))?(parseInt(a[0])-parseInt(b[0]))<0?-1:1:0;});
			},
	sortbyname:	function(){
				return this.liste.sort(function(a,b){return (a[1].toLowerCase()!=b[1].toLowerCase())?(a[1].toLowerCase()<b[1].toLowerCase())?-1:1:0;});
			},
	remove:		function(id){
				for(var i=0;i<this.liste.length;i++){
					if(this.liste[i][0]==id){this.liste.splice(i,1);this.speichern();return;}
				}				
			},
	tostring:	function(){
				var ruck="";
				for(var i=0;i<this.liste.length;i++){
					ruck+=String.fromCharCode(6)+this.liste[i][0]+String.fromCharCode(5)+this.liste[i][1]+String.fromCharCode(5)+this.liste[i][2];
				}
				return ruck.substr(1);
			}
}
var collist={
	liste:	new Array(),//id chr(5) name chr(5) filterlistid chr(6) ... chr(7)
	getbyname: function(name){
				for(var i=0;i<this.liste.length;i++){
					if(this.liste[i][1]==name)return i;
				}
				return -1;
			},
	getbyid:	function(id){
					for(var i=0;i<this.liste.length;i++){
						if(parseInt(this.liste[i][0])==id)return i;
					}
				return -1;
			},
	getnextid: function(){
				var zwiid=0;
				this.liste=this.sortbyid();
				for(var i=0;i<this.liste.length;i++){
					if(zwiid==parseInt(this.liste[i][0]))zwiid++;
				}
				return zwiid;
			},
	sortbyid:	function(){
				return this.liste.sort(function(a,b){return (parseInt(a[0])-parseInt(b[0]))?(parseInt(a[0])-parseInt(b[0]))<0?-1:1:0;});
			},
	sortbyname:	function(){
				return this.liste.sort(function(a,b){return (a[1].toLowerCase()!=b[1].toLowerCase())?(a[1].toLowerCase()<b[1].toLowerCase())?-1:1:0;});
			},
	addnew:	function(name){
				// if(this.getbyname(name)!=-1)return -1;
				var nextid=this.getnextid().toString();
				this.liste.push(new Array(nextid,name,new Array()));
				this.speichern();
				return nextid;
			},
	set: function(id,name,filter){ //id readonly, name/filter neu setzbar
				var curindex=this.getbyid(id);
				var curentr=this.liste[curindex];
				console.log(id+"."+name+"."+filter+"."+curindex+"."+curentr);
				if(curentr[1]==name)
					this.liste[curindex][2]=filter;
				else{
					this.liste[curindex][1]=name;					
					this.liste[curindex][2]=filter;
				}
				this.speichern();
				console.log(this.liste);
				return true
			},
	remove: function(id){
				var curindex=this.getbyid(id);
				this.liste.splice(curindex,1);		
				this.speichern();
			},
	removefilter:	function(id){
				var fid=-1;
				for(var i=0;i<this.liste.length;i++){
					fid=this.liste[i][2].indexOf(id);
					if(fid!=-1)this.liste[i][2].splice(fid,1);
				}	
				this.speichern();
			},
	speichern: function(){
				setTimeout(function(tthis){GM_setValue("collist",tthis.tostring());console.log(GM_getValue("collist"));},0,this);
			},
	tostring: function(){
				var ruck="";				
				this.liste=this.sortbyid();
				for(var i=0;i<this.liste.length;i++){
					ruck+=String.fromCharCode(7)+this.liste[i][0]+String.fromCharCode(5)+this.liste[i][1]+String.fromCharCode(5);
					var zwiruck="";
					for(var j=0;j<this.liste[i][2].length;j++){
						zwiruck+=String.fromCharCode(6)+this.liste[i][2][j];
					}
					ruck+=zwiruck.substr(1);
				}
				return ruck.substr(1);
			},
	laden:	function(){
				var text="";
				if(typeof GM_getValue("collist")!="undefined"&&GM_getValue("collist")!=""){text=GM_getValue("collist");}else{return;}
				this.liste=new Array();
				var satz=text.split(String.fromCharCode(7));
				for(var i=0;i<satz.length;i++){
					var werte=satz[i].split(String.fromCharCode(5));
					this.liste.push(new Array(werte[0],werte[1],werte[2].split(String.fromCharCode(6))));
				}
			}
}

function ladeinsert(){
	$("#dA_devfolder_box_wrap .dA_devfolder_box_row").remove();
	var namlist=filterlist.sortbyname();
	console.log(namlist);
	for(var i=0;i<namlist.length;i++){
			$("#dA_devfolder_box_wrap").append('<div class="dA_devfolder_box_row"><div class="dA_devfolder_box_checkwrap"><input type="checkbox" '+(namlist[i][2]=="1"?"checked='checked'":"")+' id="dA_devfolder_box_check'+namlist[i][0]+'"/><label class="dA_devfolder_box_check" for="dA_devfolder_box_check'+namlist[i][0]+'"></label></div><label class="dA_devfolder_box_check" for="dA_devfolder_box_check'+namlist[i][0]+'">'+namlist[i][1]+'</label><img class="dA_devfolder_box_rem" id="dA_devfolder_box_rem'+namlist[i][0]+'" alt="remove from list" title="remove from list" src="'+buchcl+'"/></div>');
	}
	adaptboxheight();
}
function ladecoll(){
	$("#dA_devfolder_bar div.collentr").remove();
	var namlist=collist.sortbyname();
	for(var i=0;i<namlist.length;i++){
			$("div.dA_devfolder_barel").last().after('<div class="collentr dA_devfolder_barel" collentr='+namlist[i][0]+'><span>'+namlist[i][1]+'</span><img alt="Change quicklist" title="Change quicklist" class="dA_devfolder_barel_change diskimg" src="'+disk+'" /></div>');
	}
}

function refreshcoll(id){
	console.log(id+"."+collist.getbyid(id));
	var aktfilts=collist.liste[collist.getbyid(id)][2];
	for(var i=0;i<filterlist.liste.length;i++){
			filterlist.liste[i][2]=(aktfilts.indexOf(filterlist.liste[i][0])==-1)?"0":"1";
	}
}

function refreshfilterview(){
	if($(".mcbox .mcb-who").length==0){setTimeout(refreshfilterview,500);return;}
	$(".mcbox").hide();
	var gefilt=false;
	for(var i=0;i<filterlist.liste.length;i++){
		if(filterlist.liste[i][2]=="1"){showblocks(filterlist.liste[i][1]);gefilt=true;}
		$("#dA_devfolder_box_check"+filterlist.liste[i][0]).attr("checked",(filterlist.liste[i][2]=="1"?"checked":false));
	}
	if(!gefilt)$(".mcbox").show();
}
 
function showblocks(wert){
	$(".mcbox").filter(function(){
		return $(this).find(".mcb-who").text().search(new RegExp(wert,"ig"))!=-1;
	}).show();
}

 function adaptboxheight(){	
	var zwiheight=document.getElementById("dA_devfolder_box_wrap").clientHeight;
	if(zwiheight>window.innerHeight*0.8)zwiheight=window.innerHeight*0.8;
	$("#dA_devfolder_box").css("margin-top",(-zwiheight/2)+"px");
	$("#dA_devfolder_box_scroll").css("height",zwiheight+"px");
}
function ladviel(){
	// var userid=document.body.innerHTML.match(/preload: {"(\d+),oq:/)[1];
	// GM_xmlhttpRequest({
		// method: 'GET',
		// url: "http://www.deviantart.com/global/difi/?c[]=\"MessageCenter\",\"get_views\",[\""+userid+"\",\"oq:devwatch:"+offset+":48:f:tg=deviations\"]&t=json",
		// onload: function(xhr) {
			// var data = eval("(" + xhr.responseText + ")");
			// // console.log(data);
			// console.log(data.DiFi.response.calls[0].response.content[0].result.hits);
		// }
	// });
	if($("#gmi-ResourceStream div.mcbox").length==0||$("#gmi-ResourceStream div.mcbox.placeholder").length>0){setTimeout(ladviel,500);
	// console.log($("#gmi-ResourceStream div.mcbox"));console.log($("#gmi-ResourceStream div.mcbox.placeholder"));
	return;}
	if($("a.r.page").length>0){		
		offset++;
		window.location.hash="view=deviations&page="+offset;
		$("#gmi-ResourceStream div.mcbox").clone(true,true).appendTo(huilist);
		setTimeout(ladviel,500);
	}else{
		offset=1;
		$("#gmi-ResourceStream div.mcbox").clone(true,true).appendTo(huilist);
		window.location.hash="view=deviations&page=1";	
		setTimeout(inserthui,1000);
	}
}

// function clearfilter(){
	// for(var i=0;i<filterlist.liste.length;i++){
		// filterlist.liste[i][2]="0";
	// }
	// setTimeout(refreshfilterview,200);
	// $("#dA_devfolder_bar div.collentr").css("background-color","");
	// $("#dA_devfolder_box").hide();
	// $("#dA_devfolder_bar div.collentr").attr("aktiv","");
	// $("#dA_devfolder_box").attr("curid","");
// }


function inserthui(){
	if($("#gmi-ResourceStream div.mcbox").length==0||$("#gmi-ResourceStream div.mcbox.placeholder").length>0){setTimeout(inserthui,500);}
	$("#gmi-ResourceStream div.mcbox").remove();
	huilist.find("div.mcbox").appendTo("#gmi-ResourceStream");
	$("div.alink.nav2").hide();
	$("img.dA_devfolder_bar_run").attr("src",glass);
	alert("Loading complete!");
}

 function inserthandler(){
	 $("img.starimg").unbind("hover").hover(function(){this.src=hstar;},function(){this.src=star;});
	 $("img.diskimg").unbind("hover").hover(function(){this.src=hdisk;},function(){this.src=disk;});
	 $("img.glassimg").unbind("hover").hover(function(){this.src=hglass;},function(){this.src=glass;});
	 $("#dA_devfolder_box_col_del").unbind("hover").hover(function(){this.src=hdelim;},function(){this.src=delim;});
	 
	 $("img.dA_devfolder_barel_change").unbind("click").click(function(e){
		$("#dA_devfolder_bar div.collentr").css("background-color","");
		$("#dA_devfolder_box").show();
		$("#dA_devfolder_box").attr("curid",parseInt($(this.parentNode).attr("collentr")));
		$("#dA_devfolder_box_collist").val($(this).siblings("span").text());
		refreshcoll(parseInt($(this.parentNode).attr("collentr")));
		setTimeout(refreshfilterview,200);
		adaptboxheight();
		$(this.parentNode).css("background-color","#696");
	 });
	 $("img.dA_devfolder_bar_help").unbind("click").click(function(){
		if($("#dA_devfolder_bar_helpbox").length==0)
		$(document.body).append("<div id='dA_devfolder_bar_helpbox' style='height: 560px; width: 740px; left: 50%; z-index: 999; position: fixed; top: 50%;margin-top:-280px;margin-left:-370px'><a style='position:absolute;top:0px;right:0px;color:red;' href='#' onclick='$(this.parentNode).remove();'>X</a><object type='image/svg+xml' data='http://phi.pf-control.de/userscripts/Zeichnung.svg' style='width:100%;height:100%;margin-top:20px;'></object></div>");
	 });
	 $("img.dA_devfolder_bar_run").unbind("click").click(function(){
		this.src=hglass;
		if(confirm("This function will load all your deviation-entries (stacks or pics depending on your current settings) into one page! Therefore it will now browse all your pages. Nothing will be changed or removed, but crawling may take a while. To abort, refresh the page or navigate somewhere else.\n\nDo you want to continue?")){
		// window.location.hash="view=deviations&page=2";
		ladviel();}
	 });
	 $("img.dA_devfolder_bar_add").unbind("click").click(function(){
		$("#dA_devfolder_box").show();
		var nid=collist.addnew("default"+$("#dA_devfolder_bar div.collentr").length);
		$("#dA_devfolder_box").attr("curid",nid);
		$("#dA_devfolder_box_collist").val("default"+$("#dA_devfolder_bar div.collentr").length);
		ladecoll();
		inserthandler();
		$("#dA_devfolder_bar div.collentr[collentr="+nid+"]").click();
		
		document.getElementById("dA_devfolder_box_scroll").scrollTop = 0;
		adaptboxheight();
	 });
	$("#dA_devfolder_box_col_sav").unbind("click").click(function(){
		var newfilterlist=new Array();
		for(var i=0;i<filterlist.liste.length;i++){
			if(filterlist.liste[i][2]=="1")newfilterlist.push(filterlist.liste[i][0]);
		}
		collist.set($("#dA_devfolder_box").attr("curid"),$("#dA_devfolder_box_collist").val(),newfilterlist);
		ladecoll();
		inserthandler();
		$("#dA_devfolder_box").hide();
		$(".dA_devfolder_barel[collentr="+$("#dA_devfolder_box").attr("curid")+"]").css("background-color","#696");
		
	});
	$("#dA_devfolder_box_col_del").unbind("click").click(function(){
		collist.remove($("#dA_devfolder_box").attr("curid"));
		// clearfilter();
		for(var i=0;i<filterlist.liste.length;i++){
			filterlist.liste[i][2]="0";
		}
		ladecoll();
		inserthandler();
		$("#dA_devfolder_box").hide();
		setTimeout(refreshfilterview,200);
	});
	$("#dA_devfolder_bar div.collentr span").unbind("click").click(function(){
		$("#dA_devfolder_bar div.collentr").css("background-color","");
		$("#dA_devfolder_box").hide();
		if($(this.parentNode).attr("aktiv")=="true"){
			// clearfilter();
			for(var i=0;i<filterlist.liste.length;i++){
				filterlist.liste[i][2]="0";
			}
			$(this.parentNode).attr("aktiv","");
			setTimeout(function(){GM_setValue("aktcollist","");},0);
		}else{
			var curentr=parseInt($(this.parentNode).attr("collentr"));
			$(this.parentNode).css("background-color","#696");
			refreshcoll(curentr);
			$("#dA_devfolder_bar div.collentr").attr("aktiv","");
			$(this.parentNode).attr("aktiv","true");
			setTimeout(function(){GM_setValue("aktcollist",curentr);},0);
		}
		setTimeout(refreshfilterview,200);
	})
	 
	 $("#dA_devfolder_box_submit").click(function(){
		var wert=$("#dA_devfolder_box_filter").val();
		var id=filterlist.nextid(wert);
		if(!filterlist.set(wert,"1"))return;		
		ladeinsert();
		$("#dA_devfolder_box_filter").val("");		
		inserthandler();		
		if(filterlist.set(wert,1)==null)console.log("Feher beim festsetzen von "+wert);
		setTimeout(refreshfilterview,200);
	 });
	 
	$("div.dA_devfolder_box_checkwrap>label.dA_devfolder_box_check").unbind("mouseup").mouseup(function(){
		var betrch=$(this).siblings("input");
		var nid=parseInt(betrch.attr("id").substr("dA_devfolder_box_check".length));
		filterlist.liste[filterlist.getbyid(nid)[0]][2]=(betrch.attr("checked")=="checked"?"0":"1");
		filterlist.speichern();
		setTimeout(refreshfilterview,200);
	});
	$("div.dA_devfolder_box_row>label.dA_devfolder_box_check").unbind("click").click(function(){
		var ich=$(this);
		for(var i=0;i<filterlist.liste.length;i++){
			filterlist.liste[i][2]="0";
		}
		var betrch=$(this).parent().find("input");
		var nid=parseInt(betrch.attr("id").substr("dA_devfolder_box_check".length));
		filterlist.liste[filterlist.getbyid(nid)[0]][2]="1";
		filterlist.speichern();
		setTimeout(refreshfilterview,200);
	});
	$("img.dA_devfolder_box_rem").unbind("click").click(function(){
		var betrch=$(this).parent().find("input");
		var nid=parseInt(betrch.attr("id").substr("dA_devfolder_box_check".length));
		filterlist.remove(nid);		
		$(this).parent().remove();
		setTimeout(refreshfilterview,200);
		adaptboxheight();
	});
	
 }
 
var huilist=$("<div style='display:none;'></div>").appendTo("div.messages-right");	
var offset=1;
$("#output").append($(block));
filterlist.laden();
collist.laden();
ladeinsert();
inserthandler();

setInterval(function(){
	if(window.location.href.search(/messages\/.*?#view=deviations/i)==-1)return;
	
	var entrs2=$("div.messages-right h2.mczone-title:contains('Deviation'):not(h2[dA_devfolder])").attr("dA_devfolder","").after($(bar));  
	
	var entrs1=$("span.mcb-who:not(span[dA_devfolder])");
	entrs1.attr("dA_devfolder","");
	// entrs1.parents("span.mcb-line").find("a.u").after("<img class='starimg filteradd' src='"+star+"'/>");
	entrs1.append("<img class='starimg filteradd' src='"+star+"'/>");
	
	if(entrs1.length>0){
		$("img.filteradd.starimg").unbind("click").click(function(){
			var wert=$(this.parentNode).text().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
			var id=filterlist.nextid(wert);
			if(!filterlist.set(wert,"0"))return;		
			ladeinsert();
			$("#dA_devfolder_box_filter").val("");		
			inserthandler();		
			if(filterlist.set(wert,1)==null)console.log("Feher beim festsetzen von "+wert);
			setTimeout(refreshfilterview,200);
		});
		inserthandler();
	}
	if(entrs2.length>0){
		ladecoll();
		inserthandler();
		if(typeof GM_getValue("aktcollist")!=="undefined" && GM_getValue("aktcollist")!==""){
			setTimeout(function(){$("div.collentr[collentr='"+GM_getValue("aktcollist")+"'] span").click();},1000);
		};
	}
	
	
},1000);

 