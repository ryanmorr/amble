/*! @ryanmorr/amble v0.1.0 | https://github.com/ryanmorr/amble */
const e=/([^{};]*)([;{}])/g,r=/(\r\n|\r|\n)+/g,c=/\t/g,l=/\s{2,}/g,n=/\/\*[\W\w]*?\*\//g,t=/\s*([:;{}])\s*/g,a=/\};+/g,g=/([^:;{}])}/g;function p(p,o){p=function(e){return e.replace(r," ").replace(c," ").replace(l," ").replace(n,"").trim().replace(t,"$1").replace(a,"}").replace(g,"$1;}")}(p),e.lastIndex=0;for(let r;null!=(r=e.exec(p));)o(r[1],r[2])}export{p as walk};