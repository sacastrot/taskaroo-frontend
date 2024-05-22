var D=Object.defineProperty;var F=(a,t,s)=>t in a?D(a,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[t]=s;var h=(a,t,s)=>(F(a,typeof t!="symbol"?t+"":t,s),s);import{d as C,o as n,c as l,a as e,t as m,p as B,b as I,_ as V,u as H,r as x,e as j,f as q,F as E,g as L,h as G,i as v,j as $,k as J,w as U,v as N,l as K}from"./index-BrTKmnHI.js";import{a as A,N as O,U as Q,b as M}from"./UserError-C9_7d6kK.js";class P{constructor(t,s,d,p,r){h(this,"id");h(this,"name");h(this,"email");h(this,"password");h(this,"is_active");this.id=t,this.name=s,this.email=d,this.password=p,this.is_active=r}getId(){return this.id?this.id:-1}getName(){return this.name}getEmail(){return this.email}getPassword(){return this.password}getIsActive(){return this.is_active}setId(t){this.id=t}setName(t){this.name=t}setEmail(t){this.email=t}setPassword(t){this.password=t}}const W=a=>(B("data-v-9b748688"),a=a(),I(),a),X={class:"card flex flex-col p-4 shadow-md w-[25rem] max-w-md min-w-30 rounded-lg hover:bg-green hover:text-black"},Y={class:"title font-bold text-xl mb-5"},Z={class:"email flex gap-2"},ee=W(()=>e("p",{class:"font-bold"},"Email:",-1)),se=C({__name:"UserCard",props:["user"],setup(a){const t=a;return(s,d)=>(n(),l("div",X,[e("div",Y,m(t.user.getName()),1),e("div",Z,[ee,e("p",null,m(t.user.getEmail()),1)])]))}}),te=V(se,[["__scopeId","data-v-9b748688"]]),R={fetchUsers:ae,createUser:oe};async function ae(){const a=[];try{const{data:t}=await A.get("/users/");return t.forEach(s=>{const d=new P(s.id,s.name,s.email,s.password,s.is_active);a.push(d)}),a}catch(t){throw t instanceof O?new Q("No users found"):new M("An unknown error occurred while fetching users")}}async function oe(a){try{const{data:t}=await A.post("/users/",{name:a.getName(),email:a.getEmail(),password:a.getPassword()})}catch{throw new M("An unknown error occurred while creating a user")}}const re={key:0,class:"flex gap-5 flex-wrap"},ne={key:1},ie=e("p",null,"Cargando...",-1),le=[ie],ce={key:2},de=e("p",null,"Aún no hay usuarios registrados, puedes crear uno usando el botón más",-1),ue=[de],me=C({__name:"AllUsers",setup(a){const t=H(),s=x(),d=r=>{t.push({name:"task",params:{id:r}})},p=j(()=>{var r;return(r=s.value)==null?void 0:r.length});return q(async()=>{try{s.value=await R.fetchUsers()}catch(r){console.error(r)}}),(r,w)=>(n(),l(E,null,[s.value?(n(),l("div",re,[(n(!0),l(E,null,L(s.value,(y,k)=>(n(),G(te,{key:k,user:y,onClick:f=>d(y.getId())},null,8,["user","onClick"]))),128))])):(n(),l("div",ne,le)),p.value==0?(n(),l("div",ce,ue)):v("",!0)],64))}}),c=a=>(B("data-v-bff0dc44"),a=a(),I(),a),pe={class:"container mx-auto mt-10"},_e={class:"header flex justify-between items-center"},he=c(()=>e("div",{class:"text"},[e("h1",{class:"font-bold text-2xl"},"Bienvenido"),e("p",{class:"mt-2"},"Todas las tareas que tiene el usuario"),e("p",{class:"mt-2"},"Puedes hacer click sobre un usuario, para crear tareas o administralas")],-1)),ve=c(()=>e("span",{class:"material-symbols-outlined bg-green rounded-full text-white"}," add ",-1)),we=[ve],fe={key:0,class:"mt-10"},ge={key:1,class:"mt-10"},xe={class:"form-container container mx-auto"},ye=c(()=>e("div",{class:"header"},[e("h2",null,"Nuevo usuario")],-1)),be=c(()=>e("p",{class:"mb-2"},"Crea un usuario con su contraseña",-1)),ke={class:"name"},$e=c(()=>e("label",{for:"name"},"Nombre",-1)),Ue={class:"error text-red"},Ce={class:"email"},Ee=c(()=>e("label",{for:"email"},"Email",-1)),Ne={class:"error text-red border-0"},Be={class:"password"},Ie=c(()=>e("label",{for:"password"},"Contraseña",-1)),Ve={class:"pass-input relative"},Ae=["type"],Me={class:"btn-password"},Pe={class:"error text-red"},Re={class:"actions"},Se={key:0,class:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},Te=c(()=>e("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"},null,-1)),ze=c(()=>e("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"},null,-1)),De=[Te,ze],Fe=c(()=>e("p",null,"Guardar",-1)),He={key:0,class:"message text-green success"},je={key:1,class:"message error text-red"},qe=C({__name:"HomeView",setup(a){const t=x(!1),s=$({name:"",email:"",password:""}),d=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,p=(b,o)=>new RegExp(`^.{${b},${o}}$`),r=x(""),w=x(""),y=p(3,20),k=p(8,20),f=()=>{y.test(s.name)?i.name="":i.name="El nombre debe tener entre 3 y 20 caracteres",d.test(s.email)?i.email="":i.email="El email no es válido",k.test(s.password)?i.password="":i.password="La contraseña debe tener entre 8 y 20 caracteres"},S=async()=>{if(t.value=!0,f(),i.name||i.email||i.password){t.value=!1;return}const b=new P(void 0,s.name,s.email,s.password,void 0);try{await R.createUser(b),r.value="Usuario creado con éxito"}catch{w.value="Error al crear el usuario, intenta de nuevo más tarde"}finally{setTimeout(()=>{r.value="",w.value=""},3e3),s.name="",s.email="",s.password="",g.value=!1,t.value=!1}},g=x(!1),T=()=>{g.value=!0},i=$({name:"",email:"",password:""}),_=$({icon:"visibility",type:"password"}),z=()=>{_.type=_.type==="password"?"text":"password",_.icon=_.icon==="visibility"?"visibility_off":"visibility"};return(b,o)=>(n(),l("main",pe,[e("div",_e,[he,e("div",{class:"new-task",onClick:o[0]||(o[0]=u=>T())},we)]),g.value?v("",!0):(n(),l("div",fe,[J(me)])),g.value?(n(),l("div",ge,[e("div",xe,[ye,be,e("div",ke,[$e,U(e("input",{type:"text",id:"name","onUpdate:modelValue":o[1]||(o[1]=u=>s.name=u),onBlur:f},null,544),[[N,s.name]]),e("p",Ue,m(i.name),1)]),e("div",Ce,[Ee,U(e("input",{type:"email",id:"email","onUpdate:modelValue":o[2]||(o[2]=u=>s.email=u),onBlur:f},null,544),[[N,s.email]]),e("p",Ne,m(i.email),1)]),e("div",Be,[Ie,e("div",Ve,[U(e("input",{type:_.type,id:"password","onUpdate:modelValue":o[3]||(o[3]=u=>s.password=u),onBlur:f},null,40,Ae),[[K,s.password]]),e("div",Me,[e("span",{id:"iconPassword",class:"material-symbols-outlined",onClick:z},m(_.icon),1)])]),e("p",Pe,m(i.password),1)]),e("div",Re,[e("button",{class:"bg-green text-black font-bold",onClick:o[4]||(o[4]=u=>g.value=!1)}," Ver usuarios "),e("button",{class:"bg-green text-black font-bold flex gap-1",onClick:o[5]||(o[5]=u=>S())},[t.value?(n(),l("svg",Se,De)):v("",!0),Fe])])])])):v("",!0),e("div",null,[r.value?(n(),l("div",He,[e("p",null,m(r.value),1)])):v("",!0),w.value?(n(),l("div",je,[e("p",null,m(w.value),1)])):v("",!0)])]))}}),Ke=V(qe,[["__scopeId","data-v-bff0dc44"]]);export{Ke as default};