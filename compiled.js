window.touch=function(){function d(b){if("undefined"!==typeof registeredKeycodes[b.keyCode])for(var a=0;a<registeredKeycodes[b.keyCode].length;++a)registeredActions[registeredKeycodes[b.keyCode][a]].a(1),b.preventDefault()}function a(b){if("undefined"!==typeof registeredKeycodes[b.keyCode])for(var a=0;a<registeredKeycodes[b.keyCode].length;++a)registeredActions[registeredKeycodes[b.keyCode][a]].a(0),b.preventDefault()}function e(b,a){var c,d;d=[];for(var h=0;h<rectangles.length;++h){c=rectangles[h];
var f=c[0],e=c[1];f>=b+0||f+c[2]<=b||e>=a+0||e+c[3]<=a||d.push(c[4])}return d}function c(b){for(var a=0;a<b.length;++a)"undefined"!==typeof registeredActions[b[a]]&&registeredActions[b[a]].a(1)}function g(b){b.preventDefault();var a=b.targetTouches,d,h,g;for(d=0;d<a.length;++d){b=a[d];f.getBoundingClientRect();h=b.pageX-window.pageXOffset-f.offsetLeft;g=b.pageY-window.pageYOffset-f.offsetTop;g=e(h,g);for(h=0;h<g.length;++h)0>registeredActions[g[d]].touches.indexOf(b.identifier)&&(registeredActions[g[d]].touches[registeredActions[g[d]].touches.length]=
b.identifier);c(g)}}function b(b){b.preventDefault();b=b.changedTouches;var a,c;for(a=0;a<b.length;++a)for(c in registeredActions);}function h(b){b.preventDefault();var a=f.getBoundingClientRect();b=e(b.clientX-a.left,b.clientY-a.top);c(b);for(a=0;a<b.length;++a)mouseActions.push(b[a])}function k(b){for(b.preventDefault();0<mouseActions.length;)registeredActions[mouseActions[0]].a(0),mouseActions.splice(0,1)}var f;registeredActions={};rectangles=[];mouseActions=[];registeredKeycodes={};return{init:function(c){f=
c;f.removeEventListener("mousedown",h);f.removeEventListener("mouseup",k);f.removeEventListener("touchstart",g,!1);f.removeEventListener("touchleave",b,!1);f.removeEventListener("touchend",b,!1);f.removeEventListener("touchcancel",b,!1);document.removeEventListener("keydown",d);document.removeEventListener("keyup",a);f.addEventListener("mousedown",h,!1);f.addEventListener("mouseup",k,!1);f.addEventListener("touchstart",g,!1);f.addEventListener("touchleave",b,!1);f.addEventListener("touchend",b,!1);
f.addEventListener("touchcancel",b,!1);document.addEventListener("keydown",d);document.addEventListener("keyup",a)},UP:0,DOWN:1,registerAction:function(b,a,c){"undefined"!==typeof a&&null!==a&&(a[4]=b,rectangles.push(a));registeredActions[b]={rect:a,a:b,i:c,touches:[]};if(null!==c)for(a=0;a<c.length;++a)void 0===registeredKeycodes[c[a]]?registeredKeycodes[c[a]]=[b]:registeredKeycodes[c[a]].push(b)},unregisterActions:function(b){for(var a=rectangles.length;0<=a;--a)rectangles[a][4]===b&&rectangles.splice(a,
1);for(var c,d=registeredActions[b].i,a=0;a<d.length;++a)c=registeredKeycodes[d[a]].indexOf(b),0<=c&&(registeredKeycodes[d[a]]=registeredKeycodes[d[a]].splice(c,1));delete registeredActions[b]},keydownListener:d,keyupListener:a,getActions:e,touchStartMoveListener:g,touchEndCancelListener:b,mouseDownListener:h,mouseUpListener:k}}();window.D=function(){var d,a,e;return{setCanvas:function(a){d=a},enableDepthTest:function(c){c?a.enable(a.DEPTH_TEST):a.disable(a.DEPTH_TEST)},enableBlend:function(c){c?a.enable(a.BLEND):a.disable(a.BLEND)},usePremultipliedAlphaBlending:function(c){c?a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA):a.blendFunc(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA)},init:function(){a=d.getContext("webgl")||d.getContext("experimental-webgl");window.addEventListener("resize",function g(){d.width=d.clientWidth;d.height=d.clientHeight;
a.viewport(0,0,d.clientWidth,d.clientHeight);return g}());a.enable(a.DEPTH_TEST);a.enable(a.CULL_FACE);a.depthFunc(a.LEQUAL);a.frontFace(a.CW)},setShaderProgram:function(a){e=a},createShader:function(c,d){function b(b,a,c){b.shaderSource(a,c);b.compileShader(a);return b.getShaderParameter(a,b.COMPILE_STATUS)?a:(console.log(b.getShaderInfoLog(a)),null)}var h=a.createShader(a.VERTEX_SHADER),e=a.createShader(a.FRAGMENT_SHADER);if(!b(a,h,c))return console.log("(vshader)"),null;if(!b(a,e,d))return console.log("(fshader)"),
null;var f=a.createProgram();a.attachShader(f,h);a.attachShader(f,e);a.linkProgram(f);if(!a.getProgramParameter(f,a.LINK_STATUS))return console.log("Shader init failed."),null;a.useProgram(f);return f},clear:function(c){"undefined"===typeof c&&(c={r:.2,h:.2,f:.3,c:1});a.clearColor(c.r,c.h,c.f,c.c);a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT)},draw:function(c,d){c.texture.set();var b=a.getAttribLocation(e,"vertPos");a.bindBuffer(a.ARRAY_BUFFER,c.vertBuffer);a.enableVertexAttribArray(b);a.vertexAttribPointer(b,
3,a.FLOAT,!1,0,0);b=a.getAttribLocation(e,"texCoord");a.bindBuffer(a.ARRAY_BUFFER,c.texCoord);a.enableVertexAttribArray(b);a.vertexAttribPointer(b,2,a.FLOAT,!1,0,0);b=a.getUniformLocation(e,"matrix");a.uniformMatrix4fv(b,!1,c.matrix);b=a.getUniformLocation(e,"textureTransform");a.uniformMatrix4fv(b,!1,c.textureMatrix);b=a.getUniformLocation(e,"perspective");"undefined"===typeof d&&(d=mat.create());a.uniformMatrix4fv(b,!1,d);a.drawArrays(a.TRIANGLES,0,6)},createTexture:function(c){c.texture=a.createTexture();
c.set=function(){a.bindTexture(a.TEXTURE_2D,c.texture)};a.bindTexture(a.TEXTURE_2D,c.texture);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,c.image)},createTexturedSquare:function(c,d){var b=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,b);a.bufferData(a.ARRAY_BUFFER,
new Float32Array([0,0,0,1,0,0,0,1,0,1,0,0,1,1,0,0,1,0]),a.STATIC_DRAW);var h=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,h);a.bufferData(a.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,0,1,1,0,1]),a.STATIC_DRAW);return{vertBuffer:b,texCoord:h,texture:d,matrix:c,textureMatrix:mat.create()}},createSquare:function(c){var d=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,d);a.bufferData(a.ARRAY_BUFFER,new Float32Array([0,0,0,1,0,0,0,1,0,1,0,0,1,1,0,0,1,0]),a.STATIC_DRAW);var b=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,
b);a.bufferData(a.ARRAY_BUFFER,new Float32Array([1,0,0,1,1,0,1,0,1,1,1,0,0,1,1,1,0,1]),a.STATIC_DRAW);return{vertBuffer:d,colorBuffer:b,matrix:c}}}}();window.mat=function(){function d(b){return"undefined"===typeof b||null===b||16!==b.length?a([]):c(b)}function a(b){b[0]=1;b[1]=0;b[2]=0;b[3]=0;b[4]=0;b[5]=1;b[6]=0;b[7]=0;b[8]=0;b[9]=0;b[10]=1;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b}function e(b,a,c){var d,e,g,n;for(d=0;4>d;++d)for(e=0;4>e;++e){for(g=n=0;4>g;++g)n+=b[d+4*g]*a[g+4*e];c[d+4*e]=n}return c}function c(b,a){"undefined"===typeof a?a=[]:a.splice(0,a.length);b.some(function(b,c){if(16<=c)return!0;a.push(b)});return a}var g={create:d,
transpose:function(b){b[1]=b[4];b[2]=b[8];b[3]=b[12];b[4]=b[1];b[6]=b[9];b[7]=b[13];b[8]=b[2];b[9]=b[6];b[11]=b[14];b[12]=b[3];b[13]=b[7];b[14]=b[11];return b},identity:a,scale:function(b,a,c,d){b[0]=a;b[1]=0;b[2]=0;b[3]=0;b[4]=0;b[5]=c;b[6]=0;b[7]=0;b[8]=0;b[9]=0;b[10]=d;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b},rotateX:function(b,a){b[0]=1;b[1]=0;b[2]=0;b[3]=0;b[4]=0;b[5]=Math.cos(a);b[6]=-Math.sin(a);b[7]=0;b[8]=0;b[9]=Math.sin(a);b[10]=Math.cos(a);b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=
1;return b},rotateY:function(b,a){b[0]=Math.cos(a);b[1]=0;b[2]=-Math.sin(a);b[3]=0;b[4]=0;b[5]=1;b[6]=0;b[7]=0;b[8]=Math.sin(a);b[9]=0;b[10]=Math.cos(a);b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b},rotateZ:function(b,a){b[0]=Math.cos(a);b[1]=-Math.sin(a);b[2]=0;b[3]=0;b[4]=Math.sin(a);b[5]=Math.cos(a);b[6]=0;b[7]=0;b[8]=0;b[9]=0;b[10]=1;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b},rotateAbout:function(b,a,c,d,e){var g=Math.sin(a);a=Math.cos(a);var n=c*d,F=g*e,G=c*e,H=g*d,I=d*e,g=g*c;b[0]=
a+(1-a)*c*c;b[1]=(1-a)*n+F;b[2]=(1-a)*G-H;b[3]=0;b[4]=(1-a)*n-F;b[5]=a+(1-a)*d*d;b[6]=(1-a)*I+g;b[7]=0;b[8]=(1-a)*G+H;b[9]=(1-a)*I-g;b[10]=a+(1-a)*e*e;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b},translate:function(b,a,c,d){b[0]=1;b[1]=0;b[2]=0;b[3]=a;b[4]=0;b[5]=1;b[6]=0;b[7]=c;b[8]=0;b[9]=0;b[10]=1;b[11]=d;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b},multiplicate:e,copy:c,execute:function(b,h,k){"undefined"!==typeof k&&!0===k&&a(b);var f=d(b),E=d();h.forEach(function(a){c(f,b);g[a[0]](E,a[1],
a[2],a[3],a[4]);e(b,E,f)});return c(f,b)},perspective:function(b,a,c,d,e){e=1/(1/e)*Math.tan(a/2);b[0]=Math.tan(a/2);b[1]=0;b[2]=0;b[3]=0;b[4]=0;b[5]=e;b[6]=0;b[7]=0;b[8]=0;b[9]=0;b[10]=-(d+c)/(c-d);b[11]=2*d*c/(c-d);b[12]=0;b[13]=0;b[14]=1;b[15]=0;return b}};return g}();function l(d){var a,e,c,g;function b(a){for(var b=0,c=0;a;)b+=a.offsetLeft,c+=a.offsetTop,a=a.offsetParent;return[b,c]}function h(f){f.preventDefault();var h,n,k=(new Date).getTime();f=f.targetTouches[0];elementPos=b(d);h=f.pageX-window.pageXOffset-elementPos[0];n=f.pageY-window.pageYOffset-elementPos[1];c=f.identifier;g=k;a=h;e=n}function k(a){a.preventDefault();a=a.targetTouches[0];a.identifier===c&&(elementPos=b(d),c=a.identifier)}function f(f){f.preventDefault();var h,k=(new Date).getTime();h=
f.changedTouches[0];if(h.identifier===c){elementPos=b(d);f=h.pageX-window.pageXOffset-elementPos[0];h=h.pageY-window.pageYOffset-elementPos[1];deltaTime=k-g;k=Math.PI/2;for(f=Math.atan2(h-e,f-a)-k/2+Math.PI;0>f;)f+=2*Math.PI;for(;f>=2*Math.PI;)f-=2*Math.PI;f=0<=f&&f<=k?"up":f>=k&&f<=2*k?"right":f>=2*k&&f<=3*k?"down":f>=3*k&&f<=2*Math.PI?"left":"";switch(f){case "up":m(p);break;case "right":m(q);break;case "down":m(r);break;case "left":m(t)}""!==f&&u();g=c=null}}d.removeEventListener("touchstart",
h,!1);d.removeEventListener("touchmove",k,!1);d.removeEventListener("touchleave",f,!1);d.removeEventListener("touchend",f,!1);d.removeEventListener("touchcancel",f,!1);d.addEventListener("touchstart",h,!1);d.addEventListener("touchmove",k,!1);d.addEventListener("touchleave",f,!1);d.addEventListener("touchend",f,!1);d.addEventListener("touchcancel",f,!1);g=c=null;e=a=0}var v=[],w=4;function x(d){for(var a=v.length=0;a<d*d;++a)v.push([0,a]);for(a=0;3>a;++a)y(v,z(0,v))}x(w);var A;
(function(){D.setCanvas(document.getElementsByTagName("canvas")[0]);D.init();D.enableDepthTest(!1);D.enableBlend(!0);D.usePremultipliedAlphaBlending(!1);D.setShaderProgram(D.createShader(document.getElementById("vtexshader").firstChild.textContent,document.getElementById("ftexshader").firstChild.textContent));var d=2*function(){var a=document.createElement("canvas").getContext("2d");return(window.devicePixelRatio||1)/a.s||a.l||a.m||a.o||a.j||1}(),a=document.createElement("canvas");a.width=1024*d;
a.height=1024*d;var e=a.getContext("2d");e.setTransform(d,0,0,d,0,0);e.font="16px Arial";e.fillStyle="white";for(d=0;d<Math.log2(16384);++d)e.fillText(""+Math.pow(2,d+1),6+45.8*d,28);var c=new Image;c.src=a.toDataURL();c.onload=function(){var a=document.getElementById("content");l(a);touch.init(a);touch.registerAction(function(a){a===touch.DOWN&&(m(t),u())},null,[37]);touch.registerAction(function(a){a===touch.DOWN&&(m(p),u())},null,[38]);touch.registerAction(function(a){a===touch.DOWN&&(m(q),u())},
null,[39]);touch.registerAction(function(a){a===touch.DOWN&&(m(r),u())},null,[40]);a={image:c};D.createTexture(a);A=D.createTexturedSquare(mat.create(),a);B()}})();var C=[2/w,2/w*.5],J={r:0,f:0,h:0,c:0};function B(){var d=0,a=0,e;for(D.clear(J);d<w*w;++d)e=[a*C[0]-1,-Math.floor(d/w)*C[1]+1-.5],K([e[0],e[1]],v[d][0]),++a,a>=w&&(a=0)}
function K(d,a){var e=C;0!==a&&(mat.execute(A.matrix,[["scale",e[0],-e[1],1],["translate",d[0],d[1],.5]],!0),mat.execute(A.textureMatrix,[["scale",45.8/1024,45.8/1024,1],["translate",45.8*(Math.log2(a)-1)/1024,0,0]],!0),D.draw(A,mat.create()))}var L=[];
function u(){for(var d=0,a=0,e=0,c=window.setInterval(function(){var a,d,g;if(0===L.length)window.clearInterval(c);else{D.clear(J);for(a=0;a<L.length;++a)d=L[a],g=1-e/.25,K([d.b[0]+(d.g[0]-d.b[0])*g,d.b[1]+(d.g[1]-d.b[1])*g],d.value);e+=.016;.25<=e&&(window.clearInterval(c),L.length=0,B())}},16),g;d<v.length;++d)0!==v[d][0]&&g!==d&&(g=v[d][1],L.push({b:[a*C[0]-1,-Math.floor(d/w)*C[1]+1-.5],g:[g%w*C[0]-1,-Math.floor(g/w)*C[1]+1-.5],value:v[d][0]})),++a,a>=w&&(a=0)}
function M(d,a,e,c){var g=[];if(c)for(c=0;c<a;++c)g.push(e[d+a*c]);else for(c=0;c<a;++c)g.push(e[d*a+c]);return g}function N(d,a,e,c){if(c)for(c=0;c<a.length;++c)e[d+a.length*c]=a[c];else for(c=0;c<a.length;++c)e[d*a.length+c]=a[c]}var t=0,p=1,q=2,r=3;
function m(d){for(var a=v,e=w,c=0,g=!1,b=0;b<v.length;++b)v[b][1]=b;switch(d){case t:for(;c<e;++c)b=M(c,e,a,!1),O(b)&&(g=!0),N(c,b,a,!1);break;case p:for(;c<e;++c)b=M(c,e,a,!0),O(b)&&(g=!0),N(c,b,a,!0);break;case q:for(;c<e;++c)b=M(c,e,a,!1).reverse(),O(b)&&(g=!0),N(c,b.reverse(),a,!1);break;case r:for(;c<e;++c)b=M(c,e,a,!0).reverse(),O(b)&&(g=!0),N(c,b.reverse(),a,!0)}c=z(0,a);0===c.length?(window.alert("You lost, loser!"),x(e)):g&&y(a,c,d)}
function O(d){function a(a){var c,f,g;for(c=b-1;c>=a;--c)if(0===d[c][0])for(f=c;f<b-1;++f)0!==d[f+1][0]&&(g=d[f],d[f]=d[f+1],d[f+1]=g,e=!0)}var e=!1,c=0,g=0,b=d.length;for(a(0);c<b-1;++c)if(d[c][0]===d[c+1][0]&&0!==d[c][0]){g=d[c];d[c]=d[c+1];d[c+1]=g;d[c][0]*=2;d[c+1][0]=0;g=d[c+1][1]=c;e=!0;break}a(g);return e}function z(d,a){for(var e=[],c=0;c<a.length;++c)a[c][0]===d&&e.push(c);return e}
function y(d,a,e){a=a.concat(z(2,d));a=a[Math.floor(0+Math.random()*(a.length-0))];d[a][0]+=2;if("undefined"===typeof e)d[a][1]=a;else switch(e){case t:d[a][1]=Math.floor(a/w)*(w+1);break;case q:d[a][1]=Math.floor(a/w)*w;break;case p:d[a][1]=Math.floor(a%w)+3*w;break;case r:d[a][1]=Math.floor(a%w)}};
