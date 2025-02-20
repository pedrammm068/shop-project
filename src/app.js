import { products as dus } from "./services.js"

const res = function ooollo() {
  console.log(res)
}
const root = document.body.querySelector(".allroot")
async function renderDate(){
    const products = await dus()
    const temp = products.map(product => {
        return `
         <div class=" w-56 border rounded-2xl shadow-inner">
            <img class="w-52 " src="${product.image}" alt="">
            <div>
<p>${product.title}/p>
<p>${product.price}</p>
            </div>
        </div>
        `
    }).join("")
   

  root.innerHTML = temp

}

renderDate()