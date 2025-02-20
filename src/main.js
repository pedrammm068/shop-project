const baz = document.body.querySelector(".menum")
const header = document.body.querySelector(".animateion")
function menubaz(){
baz.classList.toggle("!hidden")
} 

header.scrollLeft = header.scrollWidth
function sckrol(){
    if( header.scrollLeft >= (header.scrollWidth / 2) * -1) {
        header.scrollLeft = (header.scrollWidth * -1) 
    }
        else {
            header.scrollLeft += 1
    }



}
setInterval(sckrol , 18)
