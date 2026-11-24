import {$,read,save,message} from './ui.js';
const key='arcwheel-web';
let shortcuts=read(key,[{name:'Wikipedia',url:'https://www.wikipedia.org'},{name:'GitHub',url:'https://github.com'},{name:'OpenStreetMap',url:'https://www.openstreetmap.org'}]);
function draw(){
 const wheel=$('#links'),list=$('#items');wheel.replaceChildren();list.replaceChildren();
 $('#count').textContent=shortcuts.length+' of 8 positions occupied';
 shortcuts.forEach(({name,url},i)=>{
  const angle=i*2*Math.PI/shortcuts.length-Math.PI/2,link=document.createElement('a');
  link.className='node';link.textContent=name;link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.style.left=50+35*Math.cos(angle)+'%';link.style.top=50+35*Math.sin(angle)+'%';wheel.append(link);
  const row=document.createElement('li'),label=document.createElement('span'),remove=document.createElement('button');label.textContent=name;remove.textContent='Remove';remove.className='remove';remove.setAttribute('aria-label','Remove '+name);remove.onclick=()=>{shortcuts.splice(i,1);save(key,shortcuts);draw()};row.append(label,remove);list.append(row);
 });$('#add button').disabled=shortcuts.length>=8;
}
$('#add').onsubmit=e=>{e.preventDefault();if(shortcuts.length>=8)return;const name=$('#name').value.trim();if(!name)return;let url;try{url=new URL($('#url').value);if(!['https:','http:'].includes(url.protocol)||url.username||url.password)throw Error()}catch{message('Enter an HTTP or HTTPS website address.');return}shortcuts.push({name,url:url.href});save(key,shortcuts);e.target.reset();draw()};draw();
