let task_list = JSON.parse(localStorage.getItem('task')) ? JSON.parse(localStorage.getItem('task')) : [];
let title = document.querySelector('.title');
let description = document.querySelector('.description');
let completedTask = 0
let date = new Date()

const render = () =>{

    task_list.forEach((element,index) => {
        document.querySelector('.container').innerHTML+=
        `
<div class="card">       
        <div class='card-header'><h2><span class="number">${parseInt(task_list.findIndex(obj => obj.id === element.id)) +1}. ${element.title}</span></h2> <span class="status">${element.complete}</span> </div>
       <center>   
           <p>${element.description}</p>
           <div class="btn-holder">
              <button onclick="complete(${index})">✅</button>
               <button onclick="remove(${index})">❌</button>
           </div>
       </center>
      </div>
        `
    });

    document.querySelector('.score').innerHTML=`${completedTask}✅ /${task_list.length} 📃`
}
render()

const complete = (index) =>{
    let position = task_list[index].id
    let target = task_list.findIndex(obj => obj.id === position)
    task_list[target].complete = `✅ ${date.getHours()}:${date.getMinutes()}`
   
    document.querySelector('.score').innerHTML=`${completedTask}✅ /${task_list.length} 📃`


    localStorage.setItem("task",JSON.stringify(task_list))
    location.reload();
}


const ShowForm = () => {
    document.querySelector('.form').style.display ="block"
    document.querySelector('.instruction-holder').style.display="none"
}
 
const createTask = () =>{
 
    // must turn this into a ternary operator
    if( task_list.length == 0){
        id =1
      
    }else{
           id = task_list[task_list.length - 1].id + 1
    }

 if (title.value ==="") {
    alert('Please add a title ⚠️')
 }else{
    task_list.push(
        {
            "id":id,
            "title":title.value,
            "description":description.value,
            "complete":"⏳",
            "time": `${date.getHours()}:${date.getMinutes()}`
        });
 
  
    localStorage.setItem("task",JSON.stringify(task_list)) //sending data to storage
    
    document.querySelector('.form').style.display ="none"  //hiding the form
    
location.reload()
 }
    
}

const remove = (index) =>{
    let position = task_list[index].id
    let target = task_list.findIndex(obj => obj.id === position)
    task_list.splice(target,1)
    localStorage.setItem("task",JSON.stringify(task_list))
     location.reload();
}

const close = () =>{
    document.querySelector('.form').style.display ="none"
}

const clearStorage = () =>{
    localStorage.removeItem("task")
    location.reload()
}

 
// DOM EVENTLISTENER
document.querySelector('.Create').addEventListener("click",ShowForm)
document.querySelector('.submit').addEventListener("click",createTask)
document.querySelector('.close').addEventListener("click",close)
document.querySelector('.clear').addEventListener("click",clearStorage)