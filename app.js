document.getElementById('formtask').addEventListener('submit', saveTask);

function saveTask(e){
    
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let d = new Date();
    let date = d.toLocaleDateString() + " "+ d.toLocaleTimeString();
    

    const Task = {
        title,
        description,
        date
    };

    //localStorage.setItem('tasks', JSON.stringify(Task));
    //console.log(JSON.parse(localStorage.getItem('tasks')))

    if(localStorage.getItem('tasks') === null){

        let tasks = [];
        tasks.push(Task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

    } else {


        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(Task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
    }

    showTasks();

    document.getElementById('formtask').reset();


    e.preventDefault();  //Evitar que se recarge la página
}

function showTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');
    tasksView.innerHTML='';

    for(let i= 0; i< tasks.length; i++){

        let title = tasks[i].title;
        let description = tasks[i].description;
        let date = tasks[i].date

        tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
        <p><strong>${title.toUpperCase()}</strong> <strong class="float-right"> ${date} </strong> </br> ${description}</p>
        <a class="btn btn-danger" onClick="removeTasks('${title}')" >Delete</a>
        </div>
    </div>`
    }
}

function removeTasks(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title === title) {
            tasks.splice(i,1);
            
        } 
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));

    showTasks();
}

showTasks();

