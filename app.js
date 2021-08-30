showval();
let input = document.getElementById("input");
let add = document.getElementById("add");

//add
add.addEventListener("click",()=>{
    inpval = input.value;
    if(inpval.trim()!=0){
        let webtask = localStorage.getItem("localtask");
        if (webtask == null){
            taskObj = [];
        }
        else{
            taskObj=JSON.parse(webtask);
        }
        taskObj.push(inpval);
        localStorage.setItem("localtask",JSON.stringify(taskObj));
        input.value = '';
    }
    showval();
})

//show
function showval(){
    let webtask = localStorage.getItem("localtask");
        if (webtask == null){
            taskObj = [];
        }
        else{
            taskObj=JSON.parse(webtask);
        }
    let html = '';
    let addtask = document.getElementById("addtask");
    taskObj.forEach((item,index) => {
        html += `<tr>
                    <th>${index+1}</th>
                    <td>${item}</td>
                    <td><span onclick="update(${index})">✎</span></td>
                    <td><span onclick="deleteitem(${index})">🗑</span></td>
                    <td><span onclick="moveupitem(${index},${index-1})">↑</span></td>
                    <td><span onclick="movedownitem(${index},${index+1})">↓</span></td>
                </tr>`
    });
    addtask.innerHTML = html;
}


//update
function update(index){
    let saveindex = document.getElementById("saveindex");
    let savetask = document.getElementById("savetask");
    let add = document.getElementById("add");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObj=JSON.parse(webtask);
    input.value = taskObj[index];
    add.style.display = "none";
    savetask.style.display = "inline-block";
}

//save
let savetask = document.getElementById("savetask");
savetask.addEventListener("click",()=>{
    if(input.value.trim()!=0){
    let add = document.getElementById("add");
    let webtask = localStorage.getItem("localtask");
    let taskObj=JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;
    taskObj[saveindex] = input.value;
    add.style.display = "inline-block";
    savetask.style.display = "none";
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    input.value = "";
    }
    showval();
})

//delete
function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj=JSON.parse(webtask);
    taskObj.splice(index,1);
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    showval();
}

//swap
var swap = function(x){return x; }

//moveup
function moveupitem(index1,index2){
    let webtask = localStorage.getItem("localtask");
    let taskObj=JSON.parse(webtask);
    if (index1!=0 && index2>=0){
        taskObj[index2] = swap(taskObj[index1], taskObj[index1]=taskObj[index2]);
    }
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    showval();
}

//movedown
function movedownitem(index1,index2){
    let webtask = localStorage.getItem("localtask");
    let taskObj=JSON.parse(webtask);
    if(taskObj[index2] != null){taskObj[index2] = swap(taskObj[index1], taskObj[index1]=taskObj[index2]);}
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    showval();
}