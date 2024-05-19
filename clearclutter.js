import path from "path"
import fs from "fs/promises"
import fsn from "fs"
import { json } from "express"
let mypath= "/Users/shreyanshdas/web dev/backend/clear the clutter/"
let myfile =await fs.readdir("/Users/shreyanshdas/web dev/backend/clear the clutter")
console.log(myfile)

// console.log(path.join(mypath,'.jpg',myfile[9]))
myfile.forEach( (e,index) => {
    let mypath2=mypath + e
    console.log(mypath2)
    let ext=mypath2.split('.')[mypath2.split('.').length-1]
    
    // console.log(path.extname(mypath2))
    if(ext!='json' && ext!='js' && e.split('.').length>1){
    if(fsn.existsSync(ext)){
        fs.rename(mypath2, path.join(mypath,ext,e))
        }
   else{
    fs.mkdir(ext)
   } }
})


