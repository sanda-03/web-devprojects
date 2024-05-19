let currentMusic= new Audio()
// let ifclicked=true
async function getImages() { //fetch images
    let a = await fetch('http://127.0.0.1:3000/images/')
    let b = await a.text()
    let div = document.createElement('div')
    div.innerHTML = b
    // console.log(b)
    let as = div.getElementsByTagName('a')
    let images = []
    for (let i = 0; i < as.length; i++) {
        const elem = as[i]
        if (elem.href.endsWith('.jpeg') || elem.href.endsWith('.jpg')) {
            images.push(elem.href)
        }
    }
    // console.log(images)
    return images
}
async function getImages2() { 
    let a = await fetch('http://127.0.0.1:3000/artist%20images/')
    let b = await a.text()
    let div = document.createElement('div')
    div.innerHTML = b
    // console.log(b)
    let as = div.getElementsByTagName('a')
    let images = []
    for (let i = 0; i < as.length; i++) {
        const elem = as[i]
        if (elem.href.endsWith('.jpeg') || elem.href.endsWith('.jpg')) {
            images.push(elem.href)
        }
    }
    console.log(images)
    return images
}
async function getSongs() { //fetch songs
    let a = await fetch('http://127.0.0.1:3000/songs/')
    let b = await a.text()
    let div = document.createElement('div')
    div.innerHTML = b
    let as = div.getElementsByTagName('a')
    // console.log(b)
    let songs = []
    for (let i = 0; i < as.length; i++) {
        const elem = as[i]
        if (elem.href.endsWith('.mp3')) {
            songs.push(elem.href)
        }
    }
    // console.log(songs)
    return songs
}
async function setImages(songs,imgnms, songnms, artnm, img) {
    let cardalb= document.querySelectorAll('.cardalbums')
    let albs = document.querySelectorAll('.albimg');
    let albns = document.querySelectorAll('.albname');
    let art = document.querySelectorAll('.albartname');
    let url=document.querySelectorAll('.songurl');
    let l = img.length;
    let m= cardalb.length;
    if(m>l){
        for(let i=l;i<m;i++){
            cardalb[i].style.display='none'
    }
        
    }
    let count = 0;
    console.log("there are",l,"images")
    for (let i = 0; i < l; i++) {
        // console.log("this loop is running")
        
        let a = imgnms[i]; // Song name
        for(let j=0; j<l; j++){
        let b = songnms[j]; // First 5 characters of the image name
        // console.log(a,b)
        // Compare characters of song name with image name
        for (let k = 0; k < 6; k++) {
            if (a[k] == b[k]) { // Compare characters irrespective of case
                count++;
            }
        }
      

        if (count >= 4) {
            // console.log(count)
            
            albs[i].innerHTML = `<img src="${img[i]}" alt="" width="${140}" height="${140}" style="left:${0}px;">`;

            
            albns[i].innerText = songnms[j];
            art[i].innerText = artnm[j];
            url[i].innerHTML=songs[j]
        }
        count=0
    }
    }
    
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


async function main() {
    
    let images = await getImages() //SONG IMAGES
    // console.log(images)
    imgname = []
    images.forEach((image, i) => {
        let a = image.split('/')
        let b = a[a.length - 1]
        let c = b.replace(/\.(jpeg|jpg)/gi, ' ');
        let d = c.replace(/%20/g, " ")
        imgname[i] = d.trim(" ");
    });
    
    let songs= await getSongs()
    songname =[]
    songs.forEach((song, i) => {
        let a = song.split('/')
        let b = a[a.length - 1]
        let c = b.replace('.mp3', ' ');
        let d = c.replace(/%20/g, " ")
        let e= d.split('-')
        let f= e[e.length-1]
        g=f.trim(" ")
        songname[i] = g
    });
    artistname =[]
    songs.forEach((song, i) => {
        let a = song.split('/')
        let b = a[a.length - 1]
        let c = b.replace('.mp3', ' ');
        let d = c.replace(/%20/g, " ")
        let e= d.split('-')
        let f= e[0]
        let g=f.trim(" ")
        let h=g.replace(/%26/g, "&")
        artistname[i] = h.replace(/%2C/g, ",")
    });
    // console.log(imgname)
    // console.log(songname)
    // console.log(artistname)
    // console.log(images)
    await setImages(songs,imgname,songname,artistname,images)
    let l= songs.length
    let artistsec= await getImages2()
    let images2 = await getImages2() 
    
    imgname2 = []
    images2.forEach((image, i) => {
        let a = image.split('/')
        let b = a[a.length - 1]
        let c = b.replace(/\.(jpeg|jpg)/gi, ' ');
        let d = c.replace(/%20/g, " ")
        imgname2[i] = d.trim(" ");
    });
    // console.log(imgname2)
    setImages2(imgname2,images2) 
    
    let url= document.querySelectorAll('.songurl')
    let urls=[]
    url.forEach(e => {
        urls.push(e.innerText)
    });
    let aloo1= document.querySelectorAll('.albname')
    let aloo2=document.querySelectorAll('.albartname')
    let albnames=[]
    let artnams=[]
    aloo1.forEach(e => {
        albnames.push(e.innerText)
    });
    aloo2.forEach(e => {
        artnams.push(e.innerText)
    });
    document.querySelectorAll('.playsgn').forEach((e,index) => {
        e.addEventListener('click',()=>{
            console.log(index)
            console.log(urls[index])
            mp3player(urls[index],urls,index,l,images,albnames,artnams)
            // setsonginfo(index,images[index],albnames[index],artnams[index])
        })
        
    });
}



async function mp3player(song, urls, index, l, img, albname, artname) {
    setsonginfo(index, img[index], albname[index], artname[index]);
    currentMusic.src = song;
    console.log(currentMusic.src);

    await currentMusic.play();
    setsonginfo(index, img[index], albname[index], artname[index]);
    console.log(currentMusic.duration);
    console.log(currentMusic.currentTime);

    const card = document.querySelectorAll('.cardalbums');
    card.forEach(c => {
        c.classList.remove('playing');
    });

    // Highlight the current card
    card[index].classList.add('playing');

    let player = document.querySelector('.play');
    let next = document.querySelector('.next');
    let previous = document.querySelector('.previous');
    player.innerHTML = `<img src="svg/pause_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt="">`;

    let isPlaying = true;

    const togglePlayPause = () => {
        if (isPlaying) {
            currentMusic.pause();
            player.innerHTML = `<img src="svg/play_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt="" filter:"invert"></img>`;
            isPlaying = false;
        } else {
            currentMusic.play();
            isPlaying = true;
            player.innerHTML = `<img src="svg/pause_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt="">`;
        }
    };

    const playNextSong = () => {
        if (index !== l - 1) {
            song = urls[index + 1];
            index = index + 1;
        } else {
            song = urls[0];
            index = 0;
        }
        mp3player(song, urls, index, l, img, albname, artname);
    };

    const playPreviousSong = () => {
        if (index !== 0) {
            song = urls[index - 1];
            index = index - 1;
        } else {
            song = urls[l - 1];
            index = l - 1;
        }
        mp3player(song, urls, index, l, img, albname, artname);
    };

    player.removeEventListener('click', togglePlayPause);
    player.addEventListener('click', togglePlayPause);

    next.removeEventListener('click', playNextSong);
    next.addEventListener('click', playNextSong);

    previous.removeEventListener('click', playPreviousSong);
    previous.addEventListener('click', playPreviousSong);

    currentMusic.removeEventListener('ended', playNextSong);
    currentMusic.addEventListener('ended', playNextSong);
}



function setsonginfo(index,img,song,artist){
    
document.querySelector('.songimage').innerHTML=`<img src="${img}" alt="" width="${150}" height="${38}">`
document.querySelector('.songname').innerText=song
document.querySelector('.artistname').innerText=artist
// document.querySelector('.updatetime').innerText=currentMusic.update
let td=Math.floor(currentMusic.duration)
let mind=Math.floor(td/60)
let secd=td%60
function formatNumberWithLeadingZeros(number) {
    return number < 10 ? "0" + number : number.toString();
}

document.querySelector('.mind').innerText=formatNumberWithLeadingZeros(mind)
document.querySelector('.secd').innerText=formatNumberWithLeadingZeros(secd)

currentMusic.addEventListener('timeupdate',()=>{
    let tdup=Math.floor(currentMusic.currentTime)
    let minup=Math.floor(tdup/60)
    let secup=tdup%60
    document.querySelector('.minup').innerText=formatNumberWithLeadingZeros(minup)
    document.querySelector('.secup').innerText=formatNumberWithLeadingZeros(secup)
    document.querySelector('.seeker').style.left= (currentMusic.currentTime/currentMusic.duration * 100)+"%"
});
document.querySelector('.seekbar').addEventListener('click',e=>{
    
    let percent=e.offsetX/e.target.getBoundingClientRect().width *100 
    document.querySelector('.seeker').style.left= percent + "%"
    currentMusic.currentTime=percent*currentMusic.duration/100
})
document.querySelector('.volseeker').addEventListener('click',e=>{
    let percent=e.offsetX/e.target.getBoundingClientRect().width *100 
    document.querySelector('.vs').style.left= percent + "%"
    currentMusic.volume=e.offsetX/e.target.getBoundingClientRect().width
})
let ifvolume=true
document.querySelector('.volume').addEventListener('click',e=>{
      if(ifvolume==true){
        ifvolume=false
        currentMusic.volume=0
        document.querySelector('.vs').style.left=0
        document.querySelector('.volume').innerHTML=`<img src="svg/volume_off_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt="" width="${24}">`
      }
      else{
        document.querySelector('.vs').style.left=50+"%"
        currentMusic.volume=0.5
        document.querySelector('.volume').innerHTML=`<img src="svg/volume_up_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt="" width="${24}">`
        ifvolume=true
      }
})

}

    function display(){
        ifclicked=true
        document.body.querySelectorAll('.menu').forEach(e=>{
            e.addEventListener('click',()=>{
            
                if (ifclicked){
                    document.querySelector('.left').style.display= 'none'
                    document.querySelector('.right').style.width=100+'vw'
                    document.querySelector('.nav2').style.width=100+'vw'
                    document.querySelector('.menu1').style.display= ''
                    ifclicked=false
                }
                else{
                    document.querySelector('.left').style.display= ''
                    document.querySelector('.right').style.width=''
                    document.querySelector('.nav2').style.width=100+'vw'
                    document.querySelector('.menu1').style.display= 'none'
                    ifclicked=true
                    // console.log('its running')
                }
                
                // console.log('clicked')
            })
        });
    }



display()
main()