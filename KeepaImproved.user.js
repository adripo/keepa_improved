// ==UserScript==
// @name         Keepa Improved
// @namespace    https://github.com/adripo
// @version      0.3.2
// @author       adripo
// @description  Improve keepa deals listing
// @homepage     https://github.com/adripo/keepa_improved
// @icon         https://keepa.com/favicon.ico
// @updateURL    https://raw.githubusercontent.com/adripo/keepa_improved/master/KeepaImproved.meta.js
// @downloadURL  https://raw.githubusercontent.com/adripo/keepa_improved/master/KeepaImproved.user.js
// @supportURL   https://github.com/adripo/keepa_improved/wiki
// @match        https://keepa.com/*
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @connect      keepa.com
// @connect      amazon.com
// @run-at       document-start
// @grant        GM_xmlHttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_addStyle
// ==/UserScript==
!function(e){"use strict";function t(){return JSON.parse(GM_getValue("blacklist",null))||{}}function n(t){var n,o,i=e(t).parent().attr("href").split("-")[1];n=i,(o=JSON.parse(GM_getValue("blacklist",null))||{})[n]={timestamp:e.now()},GM_setValue("blacklist",JSON.stringify(o)),e(t).parent().parent().hide(),console.log("Hidden "+i)}function o(n){console.log("a"),n.forEach((function(n){if(e(n.target).is("div#bodyPanel.content"))n.removedNodes.forEach((function(t){e(t).is("div#productPage0.productPage")&&(console.log("remove"),void 0!==a&&(console.log("removed"),a.disconnect(),a=void 0,i()))}));else if(e(n.target).is("div.productPage")){var o=t();e.each(n.addedNodes,(function(t,n){e(n).is("div.productContainer")&&e("a",n).attr("href").split("-")[1]in o?(e(n).hide(),console.log("Hidden "+e("a",n).attr("href").split("-")[1])):e("a > div",n).first().hasClass("removeProductButton")||e("a",n).prepend('<div class="removeProductButton" title="Hide product"><i class="fa fa-times-circle"></i></div>')}))}}))}function i(){if(location.hash.indexOf("#!deals")>-1)console.log("Deals"),console.log(typeof a),void 0===a&&(console.log("without products_observer"),e("div#bodyPanel.content").get(0)&&(console.log("new observer"),function(e){(a=new MutationObserver(o)).observe(e,{childList:!0,subtree:!0})}(e("div#content").get(0))));else if(location.hash.indexOf("#!product")>-1);else if(location.hash.indexOf("#!blacklist")>-1)if(e("div#bodyPanel.content").size()){new MutationObserver((function(t){"80px"==e("#subPanel").get(0).style.marginTop&&(e("#subPanel").css("margin-top","40px"),this.disconnect())})).observe(e("#subPanel").get(0),{attributeFilter:["style"]}),""!=e("#bodyPanel").html()&&e("#bodyPanel").empty(),e("#bodyPanel").append('<div style="font-family: monospace;"></div>');var n=t();e.each(n,(function(t,n){e("#bodyPanel > div").append('<div id="'+t+'">'+t+'<i class="removeProductFromBlacklist fa fa-times-circle"></i></div>')}))}else new MutationObserver((function(n){var o=n[0].addedNodes;if(console.log(n[0].addedNodes),e("div#bodyPanel.content",o).get(0)){new MutationObserver((function(t){"80px"==e("#subPanel").get(0).style.marginTop&&(e("#subPanel").css("margin-top","40px"),this.disconnect())})).observe(e("#subPanel").get(0),{attributeFilter:["style"]}),""!=e("#bodyPanel").html()&&e("#bodyPanel").empty(),e("#bodyPanel").append('<div style="font-family: monospace;"></div>');var i=t();e.each(i,(function(t,n){GM_xmlhttpRequest({method:"GET",url:"http://www.amazon.com/dp/"+t,onload:function(t){e("#bodyPanel > div").append(t.responseText+"<br>")}})})),this.disconnect()}})).observe(document.body,{childList:!0,subtree:!0})}var a,l=!1,r=!1,s=!1;new MutationObserver((function(t){var n=t[0].addedNodes;e("script",n).get(0)&&console.log(n),!l&&e("ul#topMenu.flex",n).get(0)&&(e("#topMenu").append('<li><a href="#!blacklist" style=""><i id="menuBlacklist" class="fa fa-ban"></i><span>Blacklist</span></a></li>'),l=!0),!s&&e("div#leftPanel",n).get(0)&&(s=!0),!r&&e("div#bodyPanel.content",n).get(0)&&(r=!0),l&&s&&r&&(GM_addStyle('\n/*Blacklist style*/\n.productContainer{\n\tposition: relative;\n}\n\n.removeProductButton {\n\tposition: absolute;\n\tz-index: 2;\n\ttop: 15px;\n\tright: -7px;\n\tcolor: tomato;\n}\n/***/\n\n/*Sliders style*/\n.ui-rangeSlider-label-value {\n\tposition: relative;\n}\n\n#currentRange .ui-rangeSlider-label-value input,\n#deltaRange .ui-rangeSlider-label-value input {\n\tpadding-left: 13px;\n}\n\n#currentRange .ui-rangeSlider-label-value::before,\n#deltaRange .ui-rangeSlider-label-value::before {\n\tposition: absolute;\n\ttop: 1px;\n\tcontent: "€";\n\tleft: 5px;\n\tfont-family: Arial;\n}\n\n\n#deltaPercentRange .ui-rangeSlider-label-value input {\n\tpadding-right: 18px;\n}\n\n#deltaPercentRange .ui-rangeSlider-label-value::after {\n\tposition: absolute;\n\ttop: 1px;\n\tcontent: "%";\n\tright: 5px;\n\tfont-family: Arial;\n}\n/***/\n\t\t'),i(),this.disconnect())})).observe(document.body,{childList:!0,subtree:!0});let c=[];window.addBeforeScriptExecuteListener=e=>{if("function"!=typeof e)throw new Error("Event handler must be a function.");c.push(e)},window.removeBeforeScriptExecuteListener=e=>{let t=c.length;for(;t--;)c[t]===e&&c.splice(t,1)};const d=(e,t)=>{if("SCRIPT"!==e.tagName)return;const n=new class{constructor(e,t){this.script=e,this.target=t,this._cancel=!1,this._replace=null,this._stop=!1}preventDefault(){this._cancel=!0}stopPropagation(){this._stop=!0}replacePayload(e){this._replace=e}}(e,t);if("function"==typeof window.onbeforescriptexecute)try{window.onbeforescriptexecute(n)}catch(e){console.error(e)}for(const e of c){if(n._stop)break;try{e(n)}catch(e){console.error(e)}}n._cancel?(e.textContent="",e.remove()):"string"==typeof n._replace&&(e.textContent=n._replace)};new MutationObserver(e=>{for(const t of e)for(const e of t.addedNodes)d(e,t.target)}).observe(document,{childList:!0,subtree:!0}),window.onbeforescriptexecute=function(e){var t=e.script.src;console.log(t),-1!=t.search(/keepa\.js/)&&(e.preventDefault(),e.stopPropagation(),GM_xmlhttpRequest({method:"GET",url:e.script.src,onload:function(e){!function(e){alert("addscript"),e=e.replace(/replaceThis();/g,"");var t=document.createElement("script");t.type="text/javascript",t.textContent=e,document.getElementsByTagName("head")[0].appendChild(t)}(e.responseText)}}))},e(document).on("click",".removeProductButton",(function(e){e.preventDefault(),n(this)})),e(document).on("click",".removeProductFromBlacklist",(function(e){e.preventDefault();var t,n,o=this.parentNode.id;t=o,(n=JSON.parse(GM_getValue("blacklist",null))||{})[t]&&delete n[t],GM_setValue("blacklist",JSON.stringify(n)),this.parentNode.remove()})),window.onhashchange=i}($);