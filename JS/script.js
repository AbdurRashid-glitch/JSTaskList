// define UI elements:

let form = document.querySelector("#task_form");

let taskList = document.querySelector('ul');

let clearBtn = document.querySelector('#clear_task_btn');
let  filter = document.querySelector('#task_filter');

let taskInput = document.querySelector('#new_task');

// Define Event Listener:

form.addEventListener('submit', addTask);
taskList.addEventListener('click' , removeTask);
clearBtn.addEventListener('click' , clearTask);
filter.addEventListener('keyup' , filterTask);
document.addEventListener('DOMContentLoaded', getTasks());


// Define Functions:
// Add task:
function addTask(e){   // e -> event
    if(taskInput.value === ''){
        alert('Add a Task!');
    } else{
        // create li elements:
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " ")); // append-> add (something) to the end of a written document.
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML='x';
        li.appendChild(link);
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';




    }
    e.preventDefault();

}
// Remove Task:
function removeTask(e){
    if(e.target.hasAttribute("href"))
    {
        if(confirm("Are You Sure?")){
            let elemt = e.target.parentElement;
            elemt.remove();

        }
        removeFromLS(ele);
        //console.log(e.target);
    }
    

}
// Clear Tasks:

function clearTask(e) {
   // taskList.innerHTML = '';

   // Faster way:

   while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
   }
   localStorage.clear();
}

// Filter task:

function filterTask(e) {
    let text = e.target.value.toLowerCase(); // we are bringing user input into text variable
    document.querySelectorAll('li').forEach(task =>{
        let item = task.firstChild.textContent; // 
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'blocked';
        }else{
            task.style.display = 'none';
        }
    });
}

//store in Local Storage:

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){ // lcalStorage->built in object;getItem()->method
        tasks =[]; 
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

function getTasks(){
    // checks if empty, it will return empty array and if not then it will return 
    let tasks;
    if(localStorage.getItem('tasks')===null){ // lcalStorage->built in object;getItem()->method
        tasks =[]; 
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.foreach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " ")); // append-> add (something) to the end of a written document.
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML='x';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}
// local storage clear :
function removeFromLS(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks')===null){ // lcalStorage->built in object;getItem()->method
        tasks =[]; 
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    let str = taskItem.textContent.trim;

    let li = taskItem;
    li.removeChild(li.lastChild); // <a>x</a>

    tasks.forEach((task, index) =>{

        if(li.textContent.trim() === task){
            tasks.slice(index ,1);
        }

    });

    localStorage.setItem('tasks', JSON.stringify());
}