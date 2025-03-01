// services

async function getproductAll() {
    return await fetch("https://fakestoreapi.com/products")
    .then(js => js.json())
    .then(json => json)
    .catch(error => console.log(error))
}

async function getproductLimit(net = 4) {
    return await fetch(`https://fakestoreapi.com/products?limit=${net}`)
    .then(js => js.json())
    .then(json => json)
    .catch(error => console.log(error))
}


async function takProduct(id){
    return await fetch(`https://fakestoreapi.com/products/${id}`)
    .then(js => js.json())
    .then(json => json)
    .catch(error => console.log(error))
}
async function getProductCategory(category) {
    return await fetch (`https://fakestoreapi.com/products/category/${category}`)
.then(res => res.json())
.then(json => json)
.catch(error => console.log(error))
}

// js
const baz = document.querySelector(".menum")
const AnimationHead = document.querySelector(".animateion")
let Slidei;
const root = document.getElementById("root")
const bord = document.querySelector(".asali-border")
let net = 0
let Slinterval
let Cart = JSON.parse(localStorage.getItem("cart")) ?? []
let Fave = JSON.parse(localStorage.getItem("favorites")) ?? []
let logInUser = localStorage.getItem("logInUser") || null



const arry = [
    {
        id: 1,
        title: "قدرت مد را کشف کنید",
        img: "Model 1.webp",
        bg: "rgb(39, 51, 54 )"

    },
    {
        id: 2,
        title: "سبک جدید خود را در آغوش بگیرید",
        img: "Model 2.webp",
        bg: "rgb(57, 51, 37)"
    },
    {
        id: 3,
        title: "رونمایی از جدیدترین سبک",
        img: "Model 3.webp",
        bg: "rgb(43, 36, 51)"
    }
]


function renderSlider(items) { 
    let template = `
            <div id="slide" class=" w-full h-full  inline-block  absolute top-0 left-0">
        <img class="w-1/3 sm:w-1/5 absolute bottom-0 duration-1000 left-[-15.5rem]" src="./asstes/imges/${items[net].img}" width="500" />

        <p class="text-white size-2 font-extralight  absolute top-32 right-4 max-w-80">
فروش! تا50% تخفیف
        </p>

                <span class="text-white size-14 font-bold absolute duration-1000 top-1/2 right-[-15.5rem] max-w-80">
                ${items[net].title}
                </span>


                <div id="dots" class="flex w-max justify-between items-center absolute bottom-6 right-[45%] ">
                    <div id="dot0"  class="w-1 p-1 cursor-pointer rounded-full bg-white border-4  "></div>
                    <div id="dot1"  class="w-1 p-1 cursor-pointer rounded-full bg-white border-4 "></div>
                    <div id="dot2"  class="w-1 p-1 cursor-pointer rounded-full bg-white border-4 "></div>


                
               </div>


            </div>
        `




    Slidei.innerHTML = template

    Slidei.style.backgroundColor = items[net].bg

    document.getElementById(`dot${net}`).classList.add("border-red-400")
    document.getElementById("dot0").addEventListener("click", dotClick)
    document.getElementById("dot1").addEventListener("click", dotClick)
    document.getElementById("dot2").addEventListener("click", dotClick)
    document.getElementById("slide").addEventListener("click", NextPrev)







    setTimeout(() => {
        document.querySelector("#slide > img").classList.remove("left-[-15.5rem]")
        document.querySelector("#slide > span").classList.remove("right-[-15.5rem]")


        document.querySelector("#slide > img").classList.add("left-[1.5rem]")
        document.querySelector("#slide > span").classList.add("right-[2.5rem]")
    }, 100)

}
function dotClick(evt) {
    evt.stopPropagation()
    let getId = evt.target.id
    net = Number(getId[3])
    renderSlider(arry)

    clearInterval(Slinterval);

    Slinterval = setInterval(() => {
        document.getElementById("slide").remove


        if (net === 2)
            net = 0
        else
            net++

        renderSlider(arry)
    }, 5000)




}




function renderProduct( {id, price, image, title}){

    const vize = price < 100 
    const Itmequ = Cart.find(itme => itme.id === id)
    const favitme = Fave.find(fav => fav.id === id)
    const Isfave = favitme !== undefined


    const temp = `
    <div class="w-full border rounded-xl overflow-hidden relative">
    <a onclick="handelOfClick(event, 'product/${id}')" href='product/${id}' class=" ">
    <img class="object-contain   rounded-xl w-full h-96" src="${image}" alt="">
    </a><div class="p-2">
        <h4 class="line-clamp-1">${title}</h4>
        <span>${price}$</span>
      ${
        Itmequ ? (
`<div> <span>تعداد محصول در سبد خرید شما: ${Itmequ.quantity}</span>
 <a onclick="removCarta( event, ${id} )" href='#'> <div class="bg-red-500 w-full max-w-36 text-center p-2 rounded-lg">
        <p>حذف از سبد خرید</p> </a> </div>`
      ) : (
`<div class="flex gap-2"> <input type="number" id="quantity-${id}" min="1" value="1" class="w-32 p-1 border rounded"> <a onclick="AddToCart( event, ${id} )" href='#'>  <div class="flex gap-6"><div class="bg-green-500 w-full max-w-36 text-center p-2 rounded-lg">
        <p>اضافه به سبد خرید</p>  </div> </a> </div>`
      
    )

      }
       
        </div>
    </div>

    ${vize ? (`
            <div class="text-white absolute top-2 right-2 w-max cursor-default rounded-full bg-red-500 px-2 py-1">
                فروش ویژه
            </div>
        `) : ""}
     <div class="absolute p-2 rounded-full cursor-pointer top-2 left-2 bg-white shadow-xl hover:bg-red-500" onclick="toggleFavorite(event, ${id})">
            <svg width="26px" height="26px" viewBox="0 0 24 24" fill="${Isfave ? '#ff0000' : 'none'}" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    </div>

</div>
    `

    return temp
    
}

function toggleFavorite (evt , vid) {
evt.preventDefault()
const favitme = Fave.find(fav => fav.id === vid)
if(favitme) {
    const found = Fave.findIndex(fav => fav.id === vid)
    Fave.splice(found , 1)
} else {
    Fave.push({id: vid})
}
localStorage.setItem("favorites" , JSON.stringify(Fave))
let currentPage = location.pathname.split('/').at(-1);
    if (currentPage === "all-products") {
        productsAll();
    } else if (currentPage === "index.html" || currentPage === "") {
        productFor();
    } else if (currentPage === "jewelry") {
        RenderCategory("jewelery");
    } else if (currentPage === "women") {
        RenderCategory("women's clothing");
    } else if (currentPage === "men") {
        RenderCategory("men's clothing");
    } else if (currentPage === "cart") {
        RenderCart();
    } else if (currentPage === "favorites") {
        renderFavorites();
    }
}
async function renderFavorites() {
    const favedeta = []
    for (const itme of Fave) {
        const res = await takProduct(itme.id)
    
    if(res) {
favedeta.push(res)
    }
}

    const temp = favedeta.map(item => {
        return renderProduct(item)
    }).join("")
    const favoritesPage = `
        <div class="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 mb-20">
            ${temp}
        </div>
        <div class="md:hidden container z-[50] shadow-2xl bg-white border gap-10 fixed bottom-0 left-0 px-4 py-4 flex justify-between items-center">
            <a onclick="handelOfClick(event, 'favorites')" href='favorites'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="32px" height="32px" viewBox="0 0 24 24">
                    <path d="M20.5,4.609A5.811,5.811,0,0,0,16,2.5a5.75,5.75,0,0,0-4,1.455A5.75,5.75,0,0,0,8,2.5,5.811,5.811,0,0,0,3.5,4.609c-.953,1.156-1.95,3.249-1.289,6.66,1.055,5.447,8.966,9.917,9.3,10.1a1,1,0,0,0,.974,0c.336-.187,8.247-4.657,9.3-10.1C22.45,7.858,21.453,5.765,20.5,4.609Zm-.674,6.28C19.08,14.74,13.658,18.322,12,19.34c-2.336-1.41-7.142-4.95-7.821-8.451-.513-2.646.189-4.183.869-5.007A3.819,3.819,0,0,1,8,4.5a3.493,3.493,0,0,1,3.115,1.469,1.005,1.005,0,0,0,1.76.011A3.489,3.489,0,0,1,16,4.5a3.819,3.819,0,0,1,2.959,1.382C19.637,6.706,20.339,8.243,19.826,10.889Z"/>
                </svg>
            </a>
            <a onclick="handelOfClick(event, 'cart')" href='cart'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none">
                    <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
            <a onclick="handelOfClick(event, 'all-products')" href='all-products'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 48 48" fill="none">
                    <path d="M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
                    <path d="M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
                    <path d="M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
                    <path d="M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
                </svg>
            </a>
        </div>
    `;
    root.innerHTML = favoritesPage;
}


async function RenderCart(){
    const date = []
    let Allprice = 0
for (const itme of Cart) {
   const res = await takProduct(itme.id)
   if (res) {
       date.push({...res , quantity: itme.quantity})
   Allprice += res.price * itme.quantity
    }

}

const tepm = date.map(item => {
    return `
    <div class="shadow-xl rounded-2xl">
    <img class="object-contain   rounded-xl w-full h-96" src="${item.image}" alt="">
        <div class="p-2">
        <span> تعداد: ${item.quantity} </span>
            <h4 class="line-clamp-1">${item.title}</h4>
            <span>${item.price}$</span>
            </div>
<a onclick="removfromCarts(event , ${item.id})" href='#'>
            <div class="bg-red-500 w-full max-w-36 text-center p-2 rounded-lg mb-4">
                  <p>حذف از سبد خرید</p>
                </div></a>
<div class="flex gap-4 mb-4">
    <input type="number" id="cart-quantity-${item.id}" min="1" value="1" class="w-32 p-1 border rounded">
              <a onclick="AddmorCart(event, ${item.id})" href='#'>
                 <div class="bg-green-500 w-full max-w-36 text-center p-2 rounded-lg">
                     <p>زیاد کردن تعداد</p>
                  </div>
              </a>
          </div>
     </div>            
    `
}
).join("")
const camplo = logInUser ? `
        <a href="#" onclick="camplo(event)" class="bg-blue-500 w-full max-w-44 text-white p-2 rounded-lg">تکمیل خرید</a>` : ""
root.innerHTML = `
<div class="">
<div class="p-2 text-center">
     <span>جمع کل: ${Allprice.toFixed(2)}$</span>
     ${camplo}
 </div>
       <div class="md:grid md:grid-cols-4 md:gap-6">${tepm}</div>
     </div>
`
}

function camplo (evt) {
evt.preventDefault()
Cart = []
localStorage.setItem("cart" , JSON.stringify(Cart))
RenderCart()
}
function removfromCarts (evt , vid) {
    evt.preventDefault()
    const found = Cart.findIndex(itme => itme.id === vid)
    if (found !== -1) {
const itmenum = Cart[found]
itmenum.quantity -= 1
if (itmenum.quantity <= 0)  {
Cart.splice(found , 1)
}
localStorage.setItem("cart" , JSON.stringify(Cart))
RenderCart()   
}
}
function AddmorCart(evt , vid) {
evt.preventDefault()
const quantIn = document.getElementById(`cart-quantity-${vid}`)
const quantity = Number(quantIn.value)
const sting = Cart.find(itme => itme.id === vid) 
if(sting) {
    sting.quantity += quantity
    localStorage.setItem("cart" , JSON.stringify(Cart))
    RenderCart()
}
}

function removCarta( evt ,  vid ){
    evt.preventDefault()
    const re = Cart.findIndex(itme => itme.id === vid)
    if (re !== -1) {
        const itmenum = Cart[re]
itmenum.quantity -= 1
        
        if (itmenum.quantity <= 0) {
            Cart.splice(re , 1)
        }
        localStorage.setItem("cart" ,JSON.stringify(Cart))
    }
    let Pages = location.pathname.split("/").at(-1)
    if (Pages === "all-products") {
        productsAll()
    } else {
        productFor()   
    }
}

function AddToCart(evt , vid){
    evt.preventDefault()
    const quantIn = document.getElementById(`quantity-${vid}`)
    const quantity = Number(quantIn.value)
const sting = Cart.find(itme => itme.id === vid)
if(sting) {
    sting.quantity += quantity
} else {
    Cart.push({id: vid , quantity: quantity})
}
localStorage.setItem("cart" , JSON.stringify(Cart))
    let Pages = location.pathname.split("/").at(-1)
    if (Pages === "all-products") {
        productsAll()
    } else {
        productFor()   
    }
}

function renderLogin () {
    const login = document.querySelector(".login-user")
    if(logInUser) {
        login.innerHTML = `
        <p class="text-center p-2">ایمیل: ${logInUser}</p>
            <a  class="bg-red-500 w-full duration-1000 hover:bg-black text-white p-2 text-center block rounded-xl" href="#" onclick="logout(event)">خروج</a>
        
        `
    } else {
        login.innerHTML = `
            <p class="text-center p-2">وارد نشده‌اید</p>
            <a class="bg-black w-full text-white p-2 duration-1000 text-center block rounded-xl  hover:bg-green-400 hover:text-black"  href="#" onclick="handelOfClick(event, 'login')" >ورود</a>
        `
    }
}
function renderlogPage() {
    root.innerHTML = `
    <div class="w-full max-w-md mx-auto p-6 bg-white shadow-2xl rounded-xl mt-15">
            <h2 class="text-lg font-bold text-center mb-4">ورود</h2>
            <form class="flex flex-col gap-4" id="loginform" >
                <input class="p-2 border rounded-sm" required type="email" id="emailinput" placeholder="ایمیل" >
                <input class="p-2 border rounded-sm" type="password" id="passwordinput" placeholder="رمز" required> 
                <button type="submit" class="bg-green-500 w-full text-white p-2 rounded-xl hover:bg-white text-black">ثبت</button> 
            </form>
        </div>
    `
    const Form = document.getElementById("loginform")
    Form.addEventListener("submit" , handelLog)
}
function handelLog (evt) {
    evt.preventDefault()
    const email = document.getElementById("emailinput").value
    const pass = document.getElementById("passwordinput").value
if(email.includes("@")){
    logInUser = email
    localStorage.setItem("logInUser" , email)
    productFor()
    renderLogin()
}
}
function logout(evt) {
evt.preventDefault()
logInUser = null
localStorage.removeItem("logInUser")
productFor()
renderLogin()
}

async function productFor() {
    const res = await getproductLimit(4)

    const temp = res.map(product => {
        return renderProduct(product)
    }).join("")
    const Alling = `
     <div id="slideres" class="overflow-hidden duration-1000 relative h-[50vh] md:h-[70vh] w-full whitespace-nowrap">
    </div>
       <div class="   hidden md:flex justify-around items-center m-10">
       <div class=" max-w-[350px] w-full hidden md:flex justify-around items-center rounded-lg gap-4 bg-[#f7f7f7]">
        <a onclick="handelOfClick(event, 'all-products')" class="p-2 mt-2 rounded-md  bg-slate-400 text-white mb-2 hover:text-black hover:border hover:bg-white" href='all-products'>نمایش همه محصولات</a>
          <a  onclick="handelOfClick(event, 'cart')" href='cart' " class="p-2 mt-2 rounded-md  bg-slate-500 text-white mb-2 hover:text-black hover:border hover:bg-white" href='all-products'>سبد خرید</a>
          <a onclick="handelOfClick(event, 'favorites')" class="p-2 mt-2 rounded-md bg-slate-500 text-white mb-2 hover:text-black hover:border hover:bg-white" href='favorites'>علاقه‌مندی‌ها</a>
          </div>
    </div>

          <div class="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 mb-14">
        ${temp}
    </div>
 <div class="md:hidden container z-[50] shadow-2xl bg-white border gap-10 fixed bottom-0 left-0 px-4 py-4 flex justify-between items-center">
          
   <a onclick="handelOfClick(event, 'favorites')" href='favorites'>  <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="32px" height="32px" viewBox="0 0 24 24"><path d="M20.5,4.609A5.811,5.811,0,0,0,16,2.5a5.75,5.75,0,0,0-4,1.455A5.75,5.75,0,0,0,8,2.5,5.811,5.811,0,0,0,3.5,4.609c-.953,1.156-1.95,3.249-1.289,6.66,1.055,5.447,8.966,9.917,9.3,10.1a1,1,0,0,0,.974,0c.336-.187,8.247-4.657,9.3-10.1C22.45,7.858,21.453,5.765,20.5,4.609Zm-.674,6.28C19.08,14.74,13.658,18.322,12,19.34c-2.336-1.41-7.142-4.95-7.821-8.451-.513-2.646.189-4.183.869-5.007A3.819,3.819,0,0,1,8,4.5a3.493,3.493,0,0,1,3.115,1.469,1.005,1.005,0,0,0,1.76.011A3.489,3.489,0,0,1,16,4.5a3.819,3.819,0,0,1,2.959,1.382C19.637,6.706,20.339,8.243,19.826,10.889Z"/></svg></a>

        



      <a onclick="handelOfClick(event, 'cart')" href='cart' >  <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none">
<path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> </a>

       

             <a onclick="handelOfClick(event, 'all-products')" href='all-products'>  <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 48 48" fill="none">
<path d="M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
<path d="M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
<path d="M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
<path d="M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
</svg></a>

            </div>


    `
    root.innerHTML = Alling
    Slidei = document.getElementById("slideres")


    renderSlider(arry);

    Slinterval = setInterval(() => {
        document.getElementById("slide").remove

        if (net === 2)
            net = 0
        else
            net++

        renderSlider(arry)
    }, 5000)



}
productFor()


function NextPrev(evt) {
    if (evt.clientX < 1349 / 2) {
        if (net === 0)
            net = 2

        else
            net--

    }
    else {
        if (net === 2)
            net = 0

        else
            net++

    }

    renderSlider(arry)
}


async function productsAll() {
const temp = await getproductAll()
const template = temp.map(product => {
return renderProduct(product)
}).join("")
const Allpro = `
    <div class="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 mb-20">
        ${template}
    </div>

     <div class="md:hidden container z-[50] shadow-2xl bg-white border gap-10 fixed bottom-0 left-0 px-4 py-4 flex justify-between items-center">
          
     <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="32px" height="32px" viewBox="0 0 24 24"><path d="M20.5,4.609A5.811,5.811,0,0,0,16,2.5a5.75,5.75,0,0,0-4,1.455A5.75,5.75,0,0,0,8,2.5,5.811,5.811,0,0,0,3.5,4.609c-.953,1.156-1.95,3.249-1.289,6.66,1.055,5.447,8.966,9.917,9.3,10.1a1,1,0,0,0,.974,0c.336-.187,8.247-4.657,9.3-10.1C22.45,7.858,21.453,5.765,20.5,4.609Zm-.674,6.28C19.08,14.74,13.658,18.322,12,19.34c-2.336-1.41-7.142-4.95-7.821-8.451-.513-2.646.189-4.183.869-5.007A3.819,3.819,0,0,1,8,4.5a3.493,3.493,0,0,1,3.115,1.469,1.005,1.005,0,0,0,1.76.011A3.489,3.489,0,0,1,16,4.5a3.819,3.819,0,0,1,2.959,1.382C19.637,6.706,20.339,8.243,19.826,10.889Z"/></svg>

        



       <a onclick="handelOfClick(event, 'cart')" href='cart'> <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none">
<path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> </a>

       

             <a onclick="handelOfClick(event, 'index.html')" href='index.html'> <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 16 16" fill="none">
<path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="#000000"/>
</svg></a>

            </div>
`
root.innerHTML = Allpro
}


function handelOfClick(evt , link) {
evt.preventDefault()
history.pushState({} , "" ,`${link}`)

Allcheck()
}

async function renderSingleProduct() {
root.innerHTML = `<div class="bg-red-500 w-full">
LOdiNg
</div>`

    AnimationHead.classList.add("hidden")
    const { description, price, image, title} = await takProduct(Number(location.pathname.split("/").at(-1)))
        const temp = `
                     <div class="container-tak w-full  h-40">
                <div class="bg-slate-200 p-8 pt-3 border "> 
                    <ul class="flex gap-4 ">
                        <li>خانه</li>
                        <li>فروشگاه</li>
                        <li>تی‌شرت</li>
                        <li>${title}</li>
                    </ul>
                </div>
      
                <div class=" p-6 md:flex md:gap-4">
                  <div class="md:flex md:flex-row-reverse md:w-full md:max-w-[347px]">
                    <div class="border overflow-hidden rounded-xl md:max-w-[44rem] ">
        <img class="object-contain" src="${image}" alt="">
        </div>
        <div class="flex w-full gap-4 p-4 md:grid">
            <div class="border">
            <img class="w-32 md:max-w-24 asali-border" src="${image}" alt="">
        </div>
        <div class="border">    
        <img  class="w-32 md:max-w-24" src="${image}" alt="">
        </div>
        </div>
        
</div>

        <div class="mb-2">
            <span>نام محصول: ${title}</span>
            <p>قیمت: ${price}</p>
            <p>توضیحات: ${description}</p>
        </div>
        <div class="border"></div>
        
          </div>
            </div>
                    
                `

    root.innerHTML = temp


}

function menubaz() {
    baz.classList.toggle("!hidden")
}
AnimationHead.scrollLeft = AnimationHead.scrollWidth
function animaHeader() {
    if(AnimationHead.scrollLeft >= (AnimationHead.scrollWidth / 2) * -1 ){
        AnimationHead.scrollLeft = (AnimationHead.scrollWidth * -1)
    } else{
        AnimationHead.scrollLeft += 1
  
    }
   

}
setInterval(animaHeader , 25)

async function RenderCategory (category) {
const temp = await getProductCategory(category)
const template =  temp.map(itme => {
    return renderProduct(itme)
}).join("")
const categoryPage = `
<div class="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 mb-20">
            ${template}
        </div>
        <div class="md:hidden container z-[50] shadow-2xl bg-white border gap-10 fixed bottom-0 left-0 px-4 py-4 flex justify-between items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="32px" height="32px" viewBox="0 0 24 24">
                <path d="M20.5,4.609A5.811,5.811,0,0,0,16,2.5a5.75,5.75,0,0,0-4,1.455A5.75,5.75,0,0,0,8,2.5,5.811,5.811,0,0,0,3.5,4.609c-.953,1.156-1.95,3.249-1.289,6.66,1.055,5.447,8.966,9.917,9.3,10.1a1,1,0,0,0,.974,0c.336-.187,8.247-4.657,9.3-10.1C22.45,7.858,21.453,5.765,20.5,4.609Zm-.674,6.28C19.08,14.74,13.658,18.322,12,19.34c-2.336-1.41-7.142-4.95-7.821-8.451-.513-2.646.189-4.183.869-5.007A3.819,3.819,0,0,1,8,4.5a3.493,3.493,0,0,1,3.115,1.469,1.005,1.005,0,0,0,1.76.011A3.489,3.489,0,0,1,16,4.5a3.819,3.819,0,0,1,2.959,1.382C19.637,6.706,20.339,8.243,19.826,10.889Z"/>
            </svg>
            <a onclick="handelOfClick(event, 'cart')" href="cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none">
                    <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
            <a onclick="handelOfClick(event, 'index.html')" href="index.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 16 16" fill="none">
                    <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="#000000"/>
                </svg>
            </a>
        </div>
`
root.innerHTML = categoryPage
}


function Allcheck() {
   
    let Addres = location.pathname
    Addres = Addres.split('/').at(-1)
    switch (true) {
        case Addres === 'all-products':
            productsAll()
            break;
            case Addres === 'index.html':
                productFor()
                break;    
                case (location.pathname.match(/[/]src[/]product[/][0-9]{1,}/) !== null):
                    renderSingleProduct();
                    break
        case Addres ===  "cart" :
       RenderCart() 
        break
        case Addres === "jewelry" : 
        RenderCategory("jewelery")
        break

        case Addres ===  "women" : 
        RenderCategory("women's clothing")
        break
        case Addres ===  "men" : 
        RenderCategory("men's clothing")
        break
        case Addres ===  "favorites" : 
        renderFavorites()
        break
        case Addres === "login" : 
        renderlogPage()
        break
        case Addres === "" || Addres === undefined :
productFor()
        break
                    default:
                        productFor()
            break;
    }
    renderLogin()
}
function initPage() { 
    Allcheck()
    renderLogin() }
    initPage()
window.addEventListener("popstate", Allcheck)