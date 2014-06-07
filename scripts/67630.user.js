// ==UserScript==
// @name           Travian resource bar in right menu
// @namespace      http://userscripts.org/users/72477
// @description    Shows travian resources
// @include        http://*.travian.*
// @version        0.01.1
// ==/UserScript==

var progressImgs = new Array();
progressImgs[0] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAA8CAYAAADc3IdaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAACJlJREFUeNrsncuKJMcVhs+pykYMGF3QgMQMBoGXwjAYvPHa+B2MHkHglZd+BK8s9AjGL6Gte2EjIRACbbQSMtgWDFb3VHblJX4vqqorMzKumdE92a3/g6GrMyOvlfHpP1FRLQWAdz59KoQQsmZefvyDVG9/8lT+9LuP5KNf/PaRXZ4mrNVi+/OtV+cyXXisuW3v7jonqxE7DhauzwXF2iKwHnd8nbj3+7YO/vrtZ/L2J0+lEgN58fxduawvxeDxXKwmCStje41tr8Fj6QLJ5Bxrs1Romnuf0oyV3c2yH0X38ZDRdsmxkHleoQVYpPnHJ6yNqrx4/q6IgVToRV6ZRq66/SPITQWFpTr6Ofc8ddY1aPC6QvLTO76/MXlqYtK465wQOj6iHRyzz80sPG9jzMJcioX3aZ1U1VbQi1TSQ67bvVw3zQMRk6PLaPoe1bmNFui48W58q5rs0OOX0mJBad6xU983ZAsmIomFPSukpexUAvtXU0zE0WIU8wXlvoeYdZ73zQW2Ij2kQg9peyNdv7ZTVE/HSjvPTcLuNfD26OTY87LSoRVGP+enxk3mXXOVeLm2RNEEF30Xkbo9IhLJOZdlqcYsunqMhIJs6eSUwvP3+7ppeyM4Cas5Suv1pSeXnFBkj74EocuGdo6/I62I06VjVuOuoUEhxZ67vBJSJzdsXgkaLRGBRdsnDA0l7yG/syO79J2b7mJiMShXAKbK8T5oehyF1Yns+17aDvcrqVEnxsLSC/GSzOpvuXlJM1fY6U2zUk5swF+Tz0tzH1oNP+z5xfPMh31ZlRZJXBgvy4x7COgz97qQKd9JSxMfkStXkvptdtfy2m97QSdSSQdpOpGmNfcjqsRRDl8qUf+LQNeBiCJpsFpjb6UV3TRjOsNwX+HQhZxiOSwwzX+HsgToKRnzBFLAYAkl4an0K9G5fIEwXtKZrA1MwgUj69bA9SOSGgv+h2huwtqKSHcsCS//cyk//liXl5XGO4Z6eli8lNPsEi+7NNP5HV211H0rPXpU6nzK83pn1aDo+WCBgHOPmyIXX3nnFS98pftygc7hzTefnEpCSL3vZX9TOGGp66U6q7TzKj0MTLsqokmv8aQUDU0JRbD/q/ukZ6akhGykyzpU6hzOuVl4XaBcy6WfOC4coE7q0IgUeqmpCokiBpypF+MX530jUtgWllb9Ri/ocCgJbxpTVlg+Wdnlg47tpXbZNUpFmJYm6priAEmpJd3hDwnXowv6OzJElS6QMgnocc6Qnp9cUHZ/3hISswaY4CnxsuWEQFqDLShPKsPdS6t6Yk4loci+6aXZlxdWkqx0KKypXG4FpMPtBhLThDJ0JBz4faAa81z4XQgMIOWPLaUnKl1DPfcArLR0KkVoG6SvDO4Pqdfkao+E8szaANanBcB05yNhQdKlVVJYTX+YOIpjwmpKJSx1jRu5SzHVk6UGyWM0qI2p2IYpSj2loC0Xp9RcdSfS+7ym1GOeaQ+5A+EZzlEt0Rt/oqkqt9TD/E2TS7XAAcIysio5V3LCtOFZYGdb2bM2XCnMO55W6PHbNOZQEqKD7FsjTXOXwrLWqbVOB2NaepaVc5ktNhlIT32pyOrJQ0k62wYHuuJJLVVs3iEzKzkum5I2r9R83cEMhRqizPGTS53Ej+zCKcQRnxA5D18pN3xhpSfY28Man7KXwZKSYy7HXQlL26OwpIc0rZG2QXlhnVKSQ1aix3JvuFyPI0Sj5XqeSKriXj7Zv45ddtpnRGTOdKKRGjH0bRv1PMC+z/6HJ5BaEWpuB0WalNYczFB22/gty5zDEDoGIjUgIof3pRtMnTSKWLB2MZQO/MsxENdIdA5pIXaOC4V1/mpOZ6QrMQ/L0bnVnrRpz2PSwXLfslHSGicw93iYY9wLQ4kMV8JaPg1uI0nBKvcQkUf064M6fpJyv8T4U6z4cI/7QlodGExMUbEhIB3xpBm4ReRKVPCthyUma5mrnaNkHEsLSRLOVkt3+9UckbpupbvpRZZ+n9BXVqklFUtGIyFtdNJOB+1G/1z7lqkUxbF+UvWpBsWbtM5VBsfSzKzp9QVKt4c+GD93sg8WtslJVUiIc0hdF5CaS0SO5YAlMesfYC0XOcykt8tCR7vRvmPXlctWpavb819ruPrmpTz54GeRUS93Lxk99xuZlHijlOVKTjpIVJvNWFSbsXTOyWtjpbChwHR0viriSGib8aU4k5pbYjqc4a4BgamjbPSKT1O+tbx47GkjjxNTIo0lTc33pCtX+kFAQjhPZ5iMB7nkBJmmGRERmElCgn1TAKegDovN4PW5PYwlM3NuB4+09DZd6aSEHL5B8A3CRd7Eq29eivQQBYDq928IIYSsme5ve1EAvBOEkAfBhreAEEJhEUIIhUUIobAIIYTCIoQQCosQQmERQgiFRQghFBYhhMIihBAKixBCKCxCCIVFCCEUFiGEUFiEEAqLEEIoLEIIobAIIRQWIYTcP5WIyOU/v+AfdieErJrf/PpXqn//x+d4+s5b8vPnz+Ti4oJ3hRCyKtq2le++/5f88PJ/Uu2bRp69/55cXFxIVVW8O4SQ1fHs/ffk+3//9ziGpRzKIoSsmKOjaCpCyIOhquudCIwYQPg/VSWErA0DiMBIXe+YsAghDyhhnQwGJixCyAoBcEhZIlJdX12PVhBCyBq5vro+JiwDgYFgQ2ERQlaWsAzEGJxLwlPkMkxYhJCVMfxAsDqXg0YAjsETQlaWsGBuX1e73U66rpOLaiswTFiEkLWVhEa6rpPdbndOWCwJCSFrLQlvE1Zd14PoRWERQtZJXdeHhNX3vRgD2fBTQkLI2hKWgfR9f0hYIoc/37DdbpmwCCGro+s6adv2IKxXu53UNzeHX/jnZQghKxRWfXMjr06D7l9+9bW8+OWHvDOEkFXy5Vdfi4iIApA//+VT1oKEkFXzxz98rP8fABmRdxJ2hL4qAAAAAElFTkSuQmCC";
progressImgs[1] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAA8CAYAAADc3IdaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABipJREFUeNrsncuOG0UYhc/vaW+DkJAmCrBlAUJCSGyy4yl4CCQWwGMACwRvE4kVWYBAkaLhBUiQIiJFJBN74q6qw8J2xtPqq7uqXY7Pt/Glry53fXP+6m6PkWT4xSCEEDkz+5wo/D3D7MMvYOdfn2ATWKJ5Yy57zNseAg+4Dh5w33mgtjou+OQH+HuGwnvg7NY58PwngKfUEDZsuk3Z0Q0wS/O5bKp2TXwsMbFEOJH8uO/yJ9RXzWC3zuE9UAQPgM8A//wNF5EdqP9ZpHn6LmoTtWeOCatlfZxq3zhxM3Didj0QBRA8UHiHtazKxYlVezZhv7RhG7GoHzRyhRipoWKleSYwweBdCxN6nIk+Q/7C8m4jLAYHBJd9LIx7INv0+9RXloc82HI5/5JTh2PknSPza5jch4OCuxYWggNcyGfnLGpNNirsJOnF1X2g5dLYBzRZzqUNJwpUHD4LE+5DTg67KawVGMp8+gxTlU9dX8IsTR8dmqBijkvZxF+eJUolSYMHx60z6fAb425gTAl9QIFZmK2F5UqA3oPZJKzKEW+JOmltivPxOrxNJReb5utIvZ3kJQmnWTTpFRJMvy9T/6Hpi/dwJVD4EuDlX+DTcqIDv6889lk2ct+OfQYuUWiErvtN0oGZUgxtK2DCz8Wh0zhi2ZjM4UugcA6Ac+DKTy+ruvfNxi3fsxPvHRxshCks8vEnUR2gfIyxvhHjROy52D5yYc/ky4nadfdQdwbntgnLeXAVsSQceE3mjdfW43IDGxB+rEfbxk5pMU79H8M4/LGJZeptk3G3wxHz1IU49lieLXKd8DwJnV8nLF8C9A4sJxKWDXtuu53fKm1hfVNbrHI1Yke3IxbJmH3K8ex56rtjkpZsXQmpj5R2/dQgqD7PUwrLc7ckDPESVp+k0yinyntWFZO1r6vP6zGCso7ZUl0hYAcUzCmVd6nGjrqqqn07/UAZNcumUmdWHjlGXLG+H4dNSeg2ZwlLpusQHbLaioo1wmp9HCAvq60j9xcax5TCHNiOjCikU7tvdopbAseURmOFtHmP4EBJNQuqU1xDpBXrhgbPzXVYJQDngVgnCdsEUPNoTdP3lJftk7qGSMsGiKXP9Vc24GDtcz4iptzewFTF1HIaKiGOkBUrXyXrRDZCUpX3rLq+psdECWs9huUABoJuWlndSFVNwmoQmNUlK9v5gqrTWJNwqqKpk0t1/N8aDpo26XTJcMhFpEOv5TvVtDXVnS8cKSvUlFz7lHp9n7NFZqx53iIxTiwthu29hB7gK4ArjJdWV3m2Iys2CWl28z2rEVjjsnXpbWgpaR1l4IDxLxv7Qw2H/BmsQyQxHoG0+pz4457r44DpLamJTQJht6BYnRaa5ycbZNh3fKvv4VesHbX+eRkHPLoA3vugY6lZt6Bs1pCsGpKTzRqEVSev7eOsIgRrSFtVYbTMV/u6TYZ9pWcN13tZRwoVeSa2Hp2yVRZ901LddPZ/3SiSqmi2Qqru766kaoTF0JLEaj47Qw+BdZzze3SxvuXZSPL+N+opQoi8ufs9YSTVEkKIo2CmJhBCSFhCCCFhCSEkLCGEkLCEEELCEkJIWEIIIWEJIYSEJYSQsIQQQsISQggJSwghYQkhhIQlhBASlhBCwhJCCAlLCCEkLCGEhCWEENNTAMD93//UD7sLIbLm7mefmv362x985+238P67dzCfz9UqQoisKMsSfz/+B0+f/Yfi1WqFO7fPMZ/PURSFWkcIkR13bp/j8ZN/N2NYpqEsIUTGbBwlUwkhjoZiuVwADAgk9E9VhRC5EUiAAcvlQglLCHFECWtrMCphCSEyhOQ6ZQEoLl9c3pgghBA5cvnicpOwAsFAcCZhCSEyS1iBCIHXJeE2cgUlLCFEZuyeECyuy8EAUmPwQojMEhbD6+fFYrGAcw7z4gwMSlhCiNxKwgDnHBaLxXXCUkkohMi1JHydsJbL5U70krCEEHmyXC7XCct7jxCImc4SCiFyS1iB8N6vExaw/vmGs7MzJSwhRHY451CW5VpYLxcLLK+u1i/08zJCiAyFtby6wsvtoPuDhxf45OOP1DJCiCx58PACAGAk8d2PP6sWFEJkzbdffWn/DwCSfe3VoGFXggAAAABJRU5ErkJggg==";
progressImgs[2] = "data:image/png;base64,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";

var lastColor = new Array();
lastColor[0] = 0;
lastColor[1] = 0;
lastColor[2] = 0;
lastColor[3] = 0;

var firstTimeSet = [0, 0, 0, 0];

	function formatTime(sec, aFormat){
		//aFormat: 0 = h:mm:ss (h = 0-&gt;... can be more than 24); 1 = days, h:mm:ss; 2 = h:mm:ss (h = 0-&gt;23:59:59 = only time)
		if (sec > -1) {
			var h = Math.floor(sec/3600);
			var m = Math.floor(sec/60) % 60;
			var s = parseInt(sec % 60);
			var ht = "";
			switch (aFormat) {
				case 1: var d = Math.floor(h/24); h = h - d * 24; ht += d + ", "; break;
				case 2: h = h % 24; break;
			}
			ht += h + ":" + (m > 9 ? m: '0' + m) + ":" + (s > 9 ? s : '0' + s);
		} else ht = "0:00:0?";
		h = null; m = null; s = null; d = null;
		return ht;
	}
function toSeconds(hTime) {
p = hTime.split(":");
return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
}

var addCss = "";
for (var e = 0; e < 4; e++) {
addCss = ".progressbar" + e + " {width: 300px;background: url(" + progressImgs[lastColor[e]] + ") no-repeat 0 -40px; !important}.progressbar-completed" + e + " {height: 20px;margin-left: -1px;background: url(" + progressImgs[lastColor[e]] + ") no-repeat 1px 0; !important}.progressbar-completed" + e + " div {float: right;width: 95%;height: 20px;margin-right: -1px;background: url(" + progressImgs[lastColor[e]] + ") no-repeat 100% 0;display: inline; /* IE 6 double float bug */ !important}";

}
GM_addStyle(addCss);

function newStyle(e, j) {
addCss = "";
if (j == 2) {
var color = "white";
}
else {
var color = "black";
}
addCss = ".progressbar" + e + " {width: 300px;background: url(" + progressImgs[j] + ") no-repeat 0 -40px; !important} .progressbar-completed" + e + " {height: 20px;margin-left: -1px;background: url(" + progressImgs[j] + ") no-repeat 1px 0; !important} .progressbar-completed" + e + " div {color: " + color + ";float: right;width: 95%;height: 20px;margin-right: -1px; background: url(" + progressImgs[j] + ") no-repeat 100% 0; display: inline; /* IE 6 double float bug */ !important}";

GM_addStyle(addCss);

lastColor[e] = j;
}

var target = document.getElementById("side_info");

var tbl     = document.createElement("table");
var tblHead = document.createElement("thead");
var tblBody = document.createElement("tbody");

        for (var j = 0; j < 4; j++) {
            // creates a table row
            var row = document.createElement("tr");


                var cell = document.createElement("td");

				var test = document.createElement("span");
				
				var wholeRes = document.getElementById("l" + (4-j));
				var income = wholeRes.getAttribute("title");
				var incomepersecond = income / 3600;
				wholeRes = wholeRes.innerHTML;
				wholeRes = wholeRes.split("/");
				var resNow = wholeRes[0];
				var fullRes = wholeRes[1];
				var spaceLeft = fullRes - resNow;
				var percentUsed = Math.round(resNow / fullRes * 100);
				
				//income = spaceLeft / income;
				incomepersecond = spaceLeft / incomepersecond;
				incomepersecond = formatTime(incomepersecond, 0);
				
				//alert(Math.round(income));
				
				//test.innerHTML = percentUsed + "%";
				var test0 = document.createElement("div");
				test0.setAttribute("class", "progressbar" + j);
				
				var test1 = document.createElement("div");
				test1.setAttribute("class", "progressbar-completed" + j);
				test1.setAttribute("id", "l" + (4-j) + "pb");
				test1.setAttribute("style", "width:" + percentUsed * 3 + "px;");
				
				var test2 = document.createElement("div");
				test2.setAttribute("id", "l" + (4-j) + "fval");
				test2.innerHTML = "<img class='r" + (j+1) + "' src='img/x.gif'> <span id='l" + (4-j) + "pval' title='" + income + "'>" + percentUsed + "%</span> <span id='l" + (4-j) + "val'>" + incomepersecond + "</span>";
				
				test1.appendChild(test2);
				test0.appendChild(test1);
				test = test0;
				
				var cellText = test;

                cell.appendChild(cellText);
                row.appendChild(cell);


            tblBody.appendChild(row);
        }

		var row = document.createElement("tr");
        var cell = document.createElement("td");
		var alink = document.createElement("a");
		alink.setAttribute("href", "#");
		alink.appendChild(document.createTextNode("Resourcebar"));
		cell.appendChild(alink);
		cell.setAttribute("colspan", "2");
		row.appendChild(cell);
		tblHead.appendChild(row);
		
		tbl.appendChild(tblHead);
        tbl.appendChild(tblBody);
		
        target.appendChild(tbl);
		
        tbl.setAttribute("cellspacing", "1");
		tbl.setAttribute("cellpadding", "1");
		tbl.setAttribute("id", "vlist");
		
		function updValues() {
		for (var j = 0; j < 4; j++) {
		var ljal = document.getElementById("l" + (4-j) + "val").innerHTML;
				document.getElementById("l" + (4-j) + "val").innerHTML = formatTime(toSeconds(ljal) - 1);
				
				var secondsLeft = toSeconds(ljal);
				
				var wholeRes = document.getElementById("l" + (4-j));
				var income = wholeRes.getAttribute("title");
				var incomepersecond = income / 3600;
				wholeRes = wholeRes.innerHTML;
				wholeRes = wholeRes.split("/");
				var resNow = wholeRes[0];
				var fullRes = wholeRes[1];
				var spaceLeft = fullRes - resNow;
				var percentUsed2 = resNow / fullRes * 100;
				var percentUsed = Math.round(resNow / fullRes * 100);
				
				document.getElementById("l" + (4-j) + "pb").setAttribute("style", "width: " + percentUsed2 * 3 + "px;");
				document.getElementById("l" + (4-j) + "pval").innerHTML = percentUsed + "%";
				
				if (secondsLeft <= 3600) {
				if (lastColor[j] != 2) {
				newStyle(j, 2);
				}
				firstTimeSet[j] = 1;
				}
				else if (secondsLeft <= 25000) {
				if (lastColor[j] != 1) {
				newStyle(j, 1);
				}
				firstTimeSet[j] = 1;
				}
				else {
				
				if (lastColor[j] != 0 || firstTimeSet[j] == 0) {
				newStyle(j, 0);
				}
				firstTimeSet[j] = 1;

				}
				
				/*if (percentUsed >= 90) {
				if (lastColor[j] != 2) {
				newStyle(j, 2);
				}
				}
				else if (percentUsed >= 70) {
				if (lastColor[j] != 1) {
				newStyle(j, 1);
				}
				}
				else {

				newStyle(j, 0);
				
				}
				*/
        }
		setTimeout(updValues, 1000);
		}
		window.onLoad = updValues();
