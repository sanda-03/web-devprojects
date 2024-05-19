// async function getImages() { 
//     let a = await fetch('http://127.0.0.1:3000/artist%20images/')
//     let b = await a.text()
//     let div = document.createElement('div')
//     div.innerHTML = b
//     // console.log(b)
//     let as = div.getElementsByTagName('a')
//     let images = []
//     for (let i = 0; i < as.length; i++) {
//         const elem = as[i]
//         if (elem.href.endsWith('.jpeg') || elem.href.endsWith('.jpg')) {
//             images.push(elem.href)
//         }
//     }
//     console.log(images)
//     return images
// }
async function main(){
    let images2 = await getImages()
    // console.log(images)
    imgname2 = []
    images2.forEach((image, i) => {
        let a = image.split('/')
        let b = a[a.length - 1]
        let c = b.replace(/\.(jpeg|jpg)/gi, ' ');
        let d = c.replace(/%20/g, " ")
        imgname2[i] = d.trim(" ");
    });
    console.log(imgname2)
    setImages2(imgname2,images2) 
}
async  function setImages2(imgnms2,img2){
let artimg2=document.querySelectorAll('.artistimg')
let artnm2=document.querySelectorAll('.artname')
let card2=document.querySelectorAll('.cardsArt')
let l = img2.length;
    let m= artnm2.length;
    if(m>l){
        for(let i=l;i<m;i++){
            card2[i].style.display='none'
    }
        
    }
imgnms2.forEach((imgnm,index) => {
    artnm2[index].innerText=imgnms2[index]
    artimg2[index].innerHTML=`<img src="${img2[index]}" alt=""  >`;
});
}


getImages()
main()