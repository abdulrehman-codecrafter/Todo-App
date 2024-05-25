let input=document.querySelector("#input")
let todoContainer=document.querySelector(".todo-list-container")
let todoList=JSON.parse(localStorage.getItem("allTodoTasks")) || []

function showToast(message,bgColor) {
    Toastify({
        text: message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,

        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bgColor,
            borderRadius: "17px"
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

const displayTodo=(todo)=>{

    let todoItem=document.createElement("div")
    todoItem.innerHTML=`<li>${todo}</li><i class="delete-btn fa fa-close" style="font-size:27px; color:red"></i>`
    todoItem.className="todo-task"

    document.querySelector(".todo-list-container").appendChild(todoItem)

    // console.log(todoList)
}

const handleAddTodo=()=>{
    event.preventDefault();

    let todo=input.value 
    if(todo===""){
        showToast("Please Enter Some Task","red")
        return
    }
    let todoIsAlreadyPresent=todoList.includes(todo)

    if(todoIsAlreadyPresent ){
        showToast("Task Already Present","red")
        return
    }

    todoList.push(todo)
    localStorage.setItem("allTodoTasks",JSON.stringify(todoList))
    displayTodo(todo)

    input.value=""
    showToast("Task Added Successfully","#03C03C")
}

const handleDeleteTodo=(e)=>{
    let todoToRemove=e.target

    let todoListContent=todoToRemove.previousElementSibling.innerHTML
    todoList=todoList.filter((e)=>{
        return e!==todoListContent
    })


    localStorage.setItem("allTodoTasks",JSON.stringify(todoList))
    todoToRemove.parentElement.remove();

    showToast("Task Deleted","red")
    
    console.log(todoList)
}
todoList.forEach(element => {
    displayTodo(element)
    
});

todoContainer.addEventListener("click",(e)=>{
    
    if(e.target.classList.contains("delete-btn")){

        handleDeleteTodo(e)
    }
    console.log("dlt clicked")
})
