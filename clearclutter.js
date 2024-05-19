//Clear the clutter of your files using node.js

import path from "path"
import fs from "fs/promises"
import fsn from "fs"
import { json } from "express"
let mypath= "/Users/devs/web dev/clear the clutter/"//the address of your folder
let myfile =await fs.readdir("/Users/devs/web dev/clear the clutter/")//the address of your folder
console.log(myfile)
myfile.forEach( (e,index) => {
    let mypath2=mypath + e
    console.log(mypath2)
    let ext=mypath2.split('.')[mypath2.split('.').length-1]   
    if(ext!='json' && ext!='js' && e.split('.').length>1){
    if(fsn.existsSync(ext)){
        fs.rename(mypath2, path.join(mypath,ext,e))
        }
   else{
    fs.mkdir(ext)
   } }
})


