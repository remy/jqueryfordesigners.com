(function(){var r={};(function(){var a="abstract bool break case catch char class const "+"const_cast continue default delete deprecated dllexport dllimport do "+"double dynamic_cast else enum explicit extern false float for friend "+"goto if inline int long mutable naked namespace new noinline noreturn "+"nothrow novtable operator private property protected public register "+"reinterpret_cast return selectany short signed sizeof static "+"static_cast struct switch template this thread throw true try typedef "+"typeid typename union unsigned using declaration, directive uuid "+"virtual void volatile while typeof";var b="as base by byte checked decimal delegate descending "+"event finally fixed foreach from group implicit in interface internal "+"into is lock null object out override orderby params readonly ref sbyte "+"sealed stackalloc string select uint ulong unchecked unsafe ushort var";var c="package synchronized boolean implements import throws "+"instanceof transient extends final strictfp native super";var d="debugger export function with NaN Infinity";var e="require sub unless until use elsif BEGIN END";var f="and assert def del elif except exec global lambda "+"not or pass print raise yield False True None";var g="then end begin rescue ensure module when undef next "+"redo retry alias defined";var h="done fi";var j=[a,b,c,d,e,f,g,h];for(var k=0;k<j.length;k++){var l=j[k].split(' ');for(var i=0;i<l.length;i++){if(l[i]){r[l[i]]=true}}}}).call(this);var u='str';var v='kwd';var w='com';var x='typ';var y='lit';var z='pun';var A='pln';var B='tag';var C='dec';var D='src';var E='atn';var F='atv';var G=8;function PR_TokenEnd(a,b){if(undefined===b){throw new Error('BAD');}if('number'!=typeof(a)){throw new Error('BAD');}this.end=a;this.style=b}PR_TokenEnd.prototype.toString=function(){return'[PR_TokenEnd '+this.end+(this.style?':'+this.style:'')+']'};function PR_Token(a,b){if(undefined===b){throw new Error('BAD');}this.token=a;this.style=b}PR_Token.prototype.toString=function(){return'[PR_Token '+this.token+(this.style?':'+this.style:'')+']'};function PR_DecodeHelper(){this.next=0;this.ch='\0'}var H={'lt':'<','gt':'>','quot':'"','apos':"'",'amp':'&'};PR_DecodeHelper.prototype.decode=function(s,i){var a=i+1;var b=s.charAt(i);if('&'===b){var c=s.indexOf(';',a);if(c>=0&&c<a+4){var d=s.substring(a,c);var e=null;if(d.charAt(0)==='#'){var f=d.charAt(1);var g;if(f==='x'||f==='X'){g=parseInt(d.substring(2),16)}else{g=parseInt(d.substring(1),10)}if(!isNaN(g)){e=String.fromCharCode(g)}}if(!e){e=H[d.toLowerCase()]}if(e){b=e;a=c+1}else{a=i+1;b='\0'}}}this.next=a;this.ch=b;return this.ch};function PR_isWordChar(a){return(a>='a'&&a<='z')||(a>='A'&&a<='Z')}function PR_isIdentifierStart(a){return PR_isWordChar(a)||a=='_'||a=='$'||a=='@'}function PR_isIdentifierPart(a){return PR_isIdentifierStart(a)||PR_isDigitChar(a)}function PR_isSpaceChar(a){return"\t \r\n".indexOf(a)>=0}function PR_isDigitChar(a){return a>='0'&&a<='9'}function PR_trim(s){var i=0,j=s.length-1;while(i<=j&&PR_isSpaceChar(s.charAt(i))){++i}while(j>i&&PR_isSpaceChar(s.charAt(j))){--j}return s.substring(i,j+1)}function PR_startsWith(s,a){return s.length>=a.length&&a==s.substring(0,a.length)}function PR_endsWith(s,a){return s.length>=a.length&&a==s.substring(s.length-a.length,s.length)}function PR_prefixMatch(a,b,c){if(b<c.length){return false}for(var i=0,n=c.length;i<n;++i){if(c.charAt(i)!=a[i]){return false}}return true}function PR_attribToHtml(a){return a.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/\xa0/,'&nbsp;')}function PR_textToHtml(a){return a.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\xa0/g,'&nbsp;')}function PR_isRawContent(a){return'XMP'==a.tagName}var I=null;function PR_getInnerHtml(a){if(null==I){var b=document.createElement('PRE');b.appendChild(document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));I=!/</.test(b.innerHTML)}if(I){var c=a.innerHTML;if(PR_isRawContent(a)){c=PR_textToHtml(c)}return c}var d=[];for(var e=a.firstChild;e;e=e.nextSibling){PR_normalizedHtml(e,d)}return d.join('')}function PR_normalizedHtml(a,b){switch(a.nodeType){case 1:var c=a.tagName.toLowerCase();b.push('\074',c);for(var i=0;i<a.attributes.length;++i){var d=a.attributes[i];if(!d.specified){continue}b.push(' ');PR_normalizedHtml(d,b)}b.push('>');for(var e=a.firstChild;e;e=e.nextSibling){PR_normalizedHtml(e,b)}if(a.firstChild||!/^(?:br|link|img)$/.test(c)){b.push('<\/',c,'>')}break;case 2:b.push(a.name.toLowerCase(),'="',PR_attribToHtml(a.value),'"');break;case 3:case 4:b.push(PR_textToHtml(a.nodeValue));break}}function PR_expandTabs(a,b){var c='                ';var d=0;var e=new PR_DecodeHelper();var f=[];for(var g=0;g<a.length;++g){var h=a[g];if(h.style==null){f.push(h);continue}var s=h.token;var i=0;var j=[];for(var k=0,n=s.length;k<n;k=e.next){e.decode(s,k);var l=e.ch;switch(l){case'\t':j.push(s.substring(i,k));var m=b-(d%b);d+=m;for(;m>=0;m-=c.length){j.push(c.substring(0,m))}i=e.next;break;case'\n':case'\r':d=0;break;default:++d}}j.push(s.substring(i));f.push(new PR_Token(j.join(''),h.style))}return f}function PR_chunkify(s){var a=/(?:[^<]+|<\/?[a-zA-Z][^>]*>|<)/g;var b=s.match(a);var c=[];if(b){var d=null;for(var i=0,n=b.length;i<n;++i){var e=b[i];var f;if(e.length<2||e.charAt(0)!=='<'){if(d&&d.style===A){d.token+=e;continue}f=A}else{f=null}d=new PR_Token(e,f);c.push(d)}}return c}function PR_splitChunks(a,b){var c=[];var d=0;var e=0;var f=0;var g=new PR_Token('',null);for(var h=0,ne=b.length,lastEnd=0;h<ne;++h){var i=b[h];var j=i.end;if(j===lastEnd){continue}var k=j-e;var l=g.token.length-f;while(l<=k){if(l>0){c.push(new PR_Token(g.token.substring(f,g.token.length),null==g.style?null:i.style))}e+=l;f=0;if(d<a.length){g=a[d++]}k=j-e;l=g.token.length-f}if(k){c.push(new PR_Token(g.token.substring(f,f+k),i.style));e+=k;f+=k}}return c}function PR_splitMarkup(a){var b=[];var c=0;var k=0;var d=-1;var e=new Array(12);var f=0;var g=null;var h=new PR_DecodeHelper();for(var j=0,nc=a.length;j<nc;++j){var l=a[j];if(A!=l.style){k+=l.token.length;continue}var s=l.token;var m=0;for(var i=0,n=s.length;i<n;){h.decode(s,i);var o=h.ch;var p=h.next;var q=null;switch(c){case 0:if('<'==o){c=1}break;case 1:f=0;if('/'==o){c=7}else if(null==g){if('!'==o){c=2}else if(PR_isWordChar(o)){c=8}else if('?'==o){c=9}else if('%'==o){c=11}else if('<'!=o){c=0}}else if('<'!=o){c=0}break;case 2:if('-'==o){c=4}else if(PR_isWordChar(o)){c=3}else if('<'==o){c=1}else{c=0}break;case 3:if('>'==o){c=0;q=C}break;case 4:if('-'==o){c=5}break;case 5:if('-'==o){c=6}break;case 6:if('>'==o){c=0;q=w}else if('-'==o){c=6}else{c=4}break;case 7:if(PR_isWordChar(o)){c=8}else if('<'==o){c=1}else{c=0}break;case 8:if('>'==o){c=0;q=B}break;case 9:if('?'==o){c=10}break;case 10:if('>'==o){c=0;q=D}else if('?'!=o){c=9}break;case 11:if('%'==o){c=12}break;case 12:if('>'==o){c=0;q=D}else if('%'!=o){c=11}break}if(f<e.length){e[f++]=o.toLowerCase()}if(1==c){d=k+i}i=p;if(q!=null){if(null!=q){if(g){if(PR_prefixMatch(e,f,g)){g=null}}else{if(PR_prefixMatch(e,f,'script')){g='/script'}else if(PR_prefixMatch(e,f,'style')){g='/style'}else if(PR_prefixMatch(e,f,'xmp')){g='/xmp'}}if(g&&f&&'/'==e[0]){q=null}}if(null!=q){b.push(new PR_TokenEnd(d,A));b.push(new PR_TokenEnd(k+p,q))}}}k+=l.token.length}b.push(new PR_TokenEnd(k,A));return b}function PR_splitStringAndCommentTokens(a){var b=[];var c=0;var d=-1;var k=0;for(var e=0,nc=a.length;e<nc;++e){var f=a[e];var s=f.token;if(A==f.style){var g=new PR_DecodeHelper();var h=-1;var j;for(var i=0,n=s.length;i<n;h=i,i=j){g.decode(s,i);var l=g.ch;j=g.next;if(0==c){if(l=='"'||l=='\''||l=='`'){b.push(new PR_TokenEnd(k+i,A));c=1;d=l}else if(l=='/'){c=3}else if(l=='#'){b.push(new PR_TokenEnd(k+i,A));c=4}}else if(1==c){if(l==d){c=0;b.push(new PR_TokenEnd(k+j,u))}else if(l=='\\'){c=2}}else if(2==c){c=1}else if(3==c){if(l=='/'){c=4;b.push(new PR_TokenEnd(k+h,A))}else if(l=='*'){c=5;b.push(new PR_TokenEnd(k+h,A))}else{c=0;j=i}}else if(4==c){if(l=='\r'||l=='\n'){c=0;b.push(new PR_TokenEnd(k+i,w))}}else if(5==c){if(l=='*'){c=6}}else if(6==c){if(l=='/'){c=0;b.push(new PR_TokenEnd(k+j,w))}else if(l!='*'){c=5}}}}k+=s.length}var m;switch(c){case 1:case 2:m=u;break;case 4:case 5:case 6:m=w;break;default:m=A;break}b.push(new PR_TokenEnd(k,m));return PR_splitChunks(a,b)}function PR_splitNonStringNonCommentToken(s,a){var b=0;var c=0;var d=new PR_DecodeHelper();var e;for(var i=0;i<=s.length;i=e){if(i==s.length){g=-2;e=i+1}else{d.decode(s,i);e=d.next;var f=d.ch;var g=c;switch(c){case 0:if(PR_isIdentifierStart(f)){g=1}else if(PR_isDigitChar(f)){g=2}else if(!PR_isSpaceChar(f)){g=3}if(g&&b<i){var t=s.substring(b,i);a.push(new PR_Token(t,A));b=i}break;case 1:if(!PR_isIdentifierPart(f)){g=-1}break;case 2:if(!(PR_isDigitChar(f)||PR_isWordChar(f)||f=='_')){g=-1}break;case 3:if(PR_isIdentifierStart(f)||PR_isDigitChar(f)||PR_isSpaceChar(f)){g=-1}break}}if(g!=c){if(g<0){if(i>b){var t=s.substring(b,i);var h=new PR_DecodeHelper();h.decode(t,0);var k=h.ch;var l=h.next==t.length;var m;if(PR_isIdentifierStart(k)){if(r[t]){m=v}else if(k==='@'){m=y}else{var n=false;if(k>='A'&&k<='Z'){for(var j=h.next;j<t.length;j=h.next){h.decode(t,j);var o=h.ch;if(o>='a'&&o<='z'){n=true;break}}if(!n&&!l&&t.substring(t.length-2)=='_t'){n=true}}m=n?x:A}}else if(PR_isDigitChar(k)){m=y}else if(!PR_isSpaceChar(k)){m=z}else{m=A}b=i;a.push(new PR_Token(t,m))}c=0;if(g==-1){e=i;continue}}c=g}}}function PR_tokenizeMarkup(a){if(!(a&&a.length)){return a}var b=PR_splitMarkup(a);return PR_splitChunks(a,b)}function PR_splitTagAttributes(a){var b=[];var c=0;var d=B;var e=null;var f=new PR_DecodeHelper();for(var g=0;g<a.length;++g){var h=a[g];if(B==h.style){var s=h.token;var j=0;for(var i=0;i<s.length;){f.decode(s,i);var k=f.ch;var l=f.next;var m=null;var n=null;if(k=='>'){if(B!=d){m=i;n=B}}else{switch(c){case 0:if('<'==k){c=1}break;case 1:if(PR_isSpaceChar(k)){c=2}break;case 2:if(!PR_isSpaceChar(k)){n=E;m=i;c=3}break;case 3:if('='==k){m=i;n=B;c=5}else if(PR_isSpaceChar(k)){m=i;n=B;c=4}break;case 4:if('='==k){c=5}else if(!PR_isSpaceChar(k)){m=i;n=E;c=3}break;case 5:if('"'==k||'\''==k){m=i;n=F;c=6;e=k}else if(!PR_isSpaceChar(k)){m=i;n=F;c=7}break;case 6:if(k==e){m=l;n=B;c=2}break;case 7:if(PR_isSpaceChar(k)){m=i;n=B;c=2}break}}if(m){if(m>j){b.push(new PR_Token(s.substring(j,m),d));j=m}d=n}i=l}if(s.length>j){b.push(new PR_Token(s.substring(j,s.length),d))}}else{if(h.style){c=0;d=B}b.push(h)}}return b}function PR_splitSourceNodes(a){var b=[];var c=null;var d=new PR_DecodeHelper();var e=null;for(var f=0,nc=a.length;;++f){var g;if(f<nc){g=a[f];if(null==g.style){a.push(g);continue}}else if(!c){break}else{g=new PR_Token('',null)}var s=g.token;if(null==c){if(D==g.style){if('<'==d.decode(s,0)){d.decode(s,d.next);if('%'==d.ch||'?'==d.ch){c=d.ch;b.push(new PR_Token(s.substring(0,d.next),B));s=s.substring(d.next,s.length)}}}else if(B==g.style){if('<'==d.decode(s,0)&&'/'!=s.charAt(d.next)){var h=s.substring(d.next).toLowerCase();if(PR_startsWith(h,'script')||PR_startsWith(h,'style')||PR_startsWith(h,'xmp')){c='/'}}}}if(null!=c){var i=null;if(D==g.style){if(c=='%'||c=='?'){var j=s.lastIndexOf(c);if(j>=0&&'>'==d.decode(s,j+1)&&s.length==d.next){i=new PR_Token(s.substring(j,s.length),B);s=s.substring(0,j)}}if(null==e){e=[]}e.push(new PR_Token(s,A))}else if(A==g.style){if(null==e){e=[]}e.push(g)}else if(B==g.style){if('<'==d.decode(g.token,0)&&g.token.length>d.next&&'/'==d.decode(g.token,d.next)){i=g}else{b.push(g)}}else if(f>=nc){i=g}else{if(e){e.push(g)}else{b.push(g)}}if(i){if(e){var k=PR_lexSource(e);b.push(new PR_Token('<span class=embsrc>',null));for(var l=0,ns=k.length;l<ns;++l){b.push(k[l])}b.push(new PR_Token('</span>',null));e=null}if(i.token){b.push(i)}c=null}}else{b.push(g)}}return b}function PR_splitAttributeQuotes(a){var b=null,lastPlain=null;for(var i=0;i<a.length;++i){if(A==a[i].style){b=i;break}}for(var i=a.length;--i>=0;){if(A==a[i].style){lastPlain=i;break}}if(null==b){return a}var c=new PR_DecodeHelper();var d=a[b].token;var e=c.decode(d,0);if('"'!=e&&'\''!=e){return a}var f=c.next;var g=a[lastPlain].token;var h=g.lastIndexOf('&');if(h<0){h=g.length-1}var j=c.decode(g,h);if(j!=e||c.next!=g.length){j=null;h=g.length}var k=[];for(var i=0;i<b;++i){k.push(a[i])}k.push(new PR_Token(d.substring(0,f),F));if(lastPlain==b){k.push(new PR_Token(d.substring(f,h),A))}else{k.push(new PR_Token(d.substring(f,d.length),A));for(var i=b+1;i<lastPlain;++i){k.push(a[i])}if(j){a.push(new PR_Token(g.substring(0,h),A))}else{a.push(a[lastPlain])}}if(j){k.push(new PR_Token(g.substring(h,g.length),A))}for(var i=lastPlain+1;i<a.length;++i){k.push(a[i])}return k}function PR_splitSourceAttributes(a){var b=[];var c=null;var d=false;var e='';for(var f=0,nc=a.length;f<nc;++f){var g=a[f];var h=b;if(B==g.style){if(d){d=false;e='';if(c){b.push(new PR_Token('<span class=embsrc>',null));var i=PR_lexSource(PR_splitAttributeQuotes(c));for(var j=0,ns=i.length;j<ns;++j){b.push(i[j])}b.push(new PR_Token('</span>',null));c=null}}else if(e&&g.token.indexOf('=')>=0){var k=e.toLowerCase();if(PR_startsWith(k,'on')||'style'==k){d=true}}else{e=''}}else if(E==g.style){e+=g.token}else if(F==g.style){if(d){if(null==c){c=[]}h=c;g=new PR_Token(g.token,A)}}else{if(c){h=c}}h.push(g)}return b}function PR_lexSource(a){var b=PR_splitStringAndCommentTokens(a);var c=[];for(var i=0;i<b.length;++i){var d=b[i];if(A===d.style){PR_splitNonStringNonCommentToken(d.token,c);continue}c.push(d)}return c}function PR_lexMarkup(a){var b=PR_tokenizeMarkup(a);b=PR_splitTagAttributes(b);b=PR_splitSourceNodes(b);b=PR_splitSourceAttributes(b);return b}function PR_lexOne(a){var b=PR_expandTabs(PR_chunkify(a),G);var c=false;for(var i=0;i<b.length;++i){if(A==b[i].style){if(PR_startsWith(PR_trim(b[i].token),'&lt;')){for(var j=b.length;--j>=0;){if(A==b[j].style){c=PR_endsWith(PR_trim(b[j].token),'&gt;');break}}}break}}return c?PR_lexMarkup(b):PR_lexSource(b)}function prettyPrintOne(s){try{var a=PR_lexOne(s);var b=[];var c=null;for(var i=0;i<a.length;i++){var t=a[i];if(t.style!=c){if(c!=null){b.push('</span>')}if(t.style!=null){b.push('<span class=',t.style,'>')}c=t.style}var d=t.token;if(null!=t.style){d=d.replace(/(\r\n?|\n| ) /g,'$1&nbsp;').replace(/\r\n?|\n/g,'<br>')}b.push(d)}if(c!=null){b.push('</span>')}return b.join('')}catch(e){if('console'in window){console.log(e);console.trace()}return s}}var J=false;window.prettyPrint=function(){if(J)return;J=true;var h=[document.getElementsByTagName('pre'),document.getElementsByTagName('code'),document.getElementsByTagName('xmp')];var l=[];for(var i=0;i<h.length;++i){for(var j=0;j<h[i].length;++j){l.push(h[i][j])}}h=null;var k=0;function doWork(){var b=new Date().getTime()+250;for(;k<l.length&&new Date().getTime()<b;k++){var c=l[k];if(true){var d=false;for(var p=c.parentNode;p!=null;p=p.parentNode){if((p.tagName=='pre'||p.tagName=='code'||p.tagName=='xmp')){d=true;break}}if(!d){var e=PR_getInnerHtml(c);e=e.replace(/(?:\r\n?|\n)$/,'');var f=prettyPrintOne(e);if(!PR_isRawContent(c)){c.innerHTML=f}else{var g=document.createElement('PRE');for(var i=0;i<c.attributes.length;++i){var a=c.attributes[i];if(a.specified){g.setAttribute(a.name,a.value)}}g.innerHTML=f;c.parentNode.replaceChild(g,c)}}}}if(k<l.length){setTimeout(doWork,250)}}doWork()}})();jQuery(function(){try{prettyPrint()}catch(e){}});
