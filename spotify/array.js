async function getImages() { //fetch images
    let a = await fetch('http://127.0.0.1:5500/images/')
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
async function getSongs() { //fetch songs
    let a = await fetch('http://127.0.0.1:5500/songs/')
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



async function main() {
    let images = await getImages()
    // console.log(images)
    imgname = []
    images.forEach((image, i) => {
        let a = image.split('/')
        let b = a[a.length - 1]
        let c = b.replace(/\.(jpeg|jpg)/gi, ' ');
        let d = c.replace(/%20/g, " ")
        imgname[i] = d;
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
        artistname[i] = g
    });
    console.log(imgname)
    console.log(songname)
    console.log(artistname)
    console.log(images)
    setImages(imgname,songname,artistname,images)
    
}
async function setImages(imgnms, songnms, artnm, img) {
    let albs = document.querySelectorAll('.albimg');
    let albns = document.querySelectorAll('.albname');
    let art = document.querySelectorAll('.albartname');
    let l = img.length;
    let count = 0;
    console.log("there are",l,"images")
    for (let i = 0; i < l; i++) {
        console.log("this loop is running")
        
        let a = imgnms[i]; // Song name
        for(let j=0; j<l; j++){
        let b = songnms[j]; // First 5 characters of the image name
        console.log(a,b)
        // Compare characters of song name with image name
        for (let k = 0; k < 6; k++) {
            if (a[k].toLowerCase() === b[k].toLowerCase()) { // Compare characters irrespective of case
                count++;
            }
        }
      

        if (count >= 4) {
            console.log(count)
            
            albs[i].innerHTML = `<img src="${img[i]}" alt="" width="${140}" height="${140}">`;
            albns[i].innerText = songnms[j];
            art[i].innerText = artnm[j];
        }
        count=0
    }
    }
}
    




main()

