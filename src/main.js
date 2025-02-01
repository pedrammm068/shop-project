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

// js
const baz = document.querySelector(".menum")
const AnimationHead = document.querySelector(".animateion")
let Slide;
const root = document.getElementById("root")
let net = 0
let Slinterval


const arry = [
    {
        id: 1,
        title: "برای سوپرایز آماده شودی",
        img: "gholaam.webp",
        bg: "rgb(255, 255, 97)"

    },
    {
        id: 2,
        title: "مد برای هر زمان",
        img: "javad.webp",
        bg: "rgb(124, 218, 255)"
    },
    {
        id: 3,
        title: "مد برای هر مکان",
        img: "javad.webp",
        bg: "rgb(171, 245, 193)"
    }
]

function renderSlider(itme) {

let temp = `
 <div id="renslider" class=" w-full h-full  inline-block  absolute top-0 left-0">
                <img class="w-1/3 sm:w-1/5 absolute bottom-0 duration-1000 left-[-15.5rem]" src="/asstes/imges/${itme[net].img}" width="500" />

                <span class="absolute duration-1000 top-1/2 right-[-15.5rem] max-w-80">
                ${itme[net].title}
                </span>

                <div id="dot-es" class="flex w-max justify-between items-center absolute bottom-6 right-8 ">
                    <div id="dot-van"  class="w-1 p-1 cursor-pointer rounded-full bg-black border-4  "></div>
                    <div id="dot-to"  class="w-1 p-1 cursor-pointer rounded-full bg-black border-4 "></div>
                    <div id="dot-tr"  class="w-1 p-1 cursor-pointer rounded-full bg-black border-4 "></div>


                
               </div>

            </div>
`
Slide.innerHTMl = temp
Slide.style.backgroundColor = itme[net].bg

document.getElementById(`dot${net}`).classList.add("border-red-400")
document.getElementById("dot-van").addEventListener("click", Clicked)
document.getElementById("dot-to").addEventListener("click", Clicked)
document.getElementById("dot-tr").addEventListener("click", Clicked)
document.getElementById("renslider").addEventListener("click", nexPre)



setTimeout(()=> {
    document.querySelector("#renslider > img").classList.remove("left-[-15.5rem]")
    document.querySelector("#renslider > span").classList.remove("right-[-15.5rem]")
    document.querySelector("#renslider > img").classList.add("left-[1.5rem]")
    document.querySelector("#renslider > span").classList.add("right-[2.5rem]")
}, 100)

}
function Clicked(e){
e.stopPropagation()
let Ided = e.target.id
net = Number(Ided[3])
renderSlider(arry)

clearInterval(Slinterval)
Slinterval = setInterval(() => {
    document.getElementById('renslider').remove

    if(net === 2){
        net = 0
    } else {
        net++
    }
    
} , 5000)
}
function renderProduct( {id, price, image, title}){

    const vize = price < 100 

    const temp = `
    <a onclick="handelOfClick(event, 'product/${id}')" href='product/${id}' class=" w-full border rounded-xl overflow-hidden relative">
    <img class="object-contain   rounded-xl w-full h-96" src="${image}" alt="">
    <div class="p-2">
        <h4>${title}</h4>
        <span>${price}$</span>
    </div>

    ${vize ? (`
            <div class="text-white absolute top-2 right-2 w-max cursor-default rounded-full bg-red-500 px-2 py-1">
                فروش ویژه
            </div>
        `) : ""}
    <div class="absolute p-2 rounded-full cursor-pointer top-2 left-2 bg-white shadow-xl hover:bg-red-500">
        <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    </div>
</a>
    `

    return temp
    
}

async function productFor() {
    const res = await getproductLimit(4)

    const temp = res.map(product => {
        return renderProduct(product)
    }).join("")
    const Alling = `
     <div id="slideres" class="overflow-hidden duration-1000 relative h-[50vh] md:h-[70vh] w-full whitespace-nowrap">
    </div>
    <h2 class="text-center text-xl pt-4 font-semibold">محصولات پرطرفدار</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 p-4 gap-4">
        ${temp}
    </div>
    <div class="flex justify-center mt-10">
        <a onclick="handelOfClick(event, 'all-products')" class=" bg-orange-400 rounded-md px-4 py-2 text-white mb-2 hover:text-black hover:border hover:bg-white" href='all-products'>نمایش همه محصولات</a>
    </div>
    `
    root.innerHTML = Alling
    Slide = document.getElementById("slideres")

    renderSlider(arry)
    Slinterval = setInterval(()=> {
        document.getElementById("renslider").remove

        if(net === 2) {
            net = 0
        } else 
        {
            net++
        }

        renderSlider(arry)
    } , 5000)
}
productFor()


async function productsAll() {
const temp = await getproductAll()
const template = temp.map(product => {
return renderProduct(product)
}).join("")
const Allpro = `
    <div class="grid grid-cols-2 md:grid-cols-4 p-4 gap-4">
        ${template}
    </div>
`
root.innerHTML = Allpro
}


function nexPre(evt) {
if(evt.clientX < 1349 / 2) {
    if(net === 0) {
        net = 2
    } else{
        net--
    }
} else{
    if(net === 2){
        net = 0
    } else{
        net++
    }
}
renderSlider(arry)
}
function handelOfClick(evt , link) {
evt.preventDefault()
history.pushState({} , "" ,`${link}`)

Allcheck()
}

async function renderSingleProduct() {
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
        
                <div class=" p-6">
                    <div class="border rounded-s-lg  ">
        <img class="object-contain" src="${image}" alt="">
        </div>
        <div class="flex w-full gap-4 p-4">
            <div class="border">
            <img class="w-32" src="${image}" alt="">
        </div>
        <div class="border">    
        <img class="w-32" src="${image}" alt="">
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
        default:
            break;
    }
}
