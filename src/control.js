$(document).ready(function() {
    setInterval(refresh, 1000)
    $('#addTodo').on('click', ()=>{
        "use strict";
        $('#addTodo').attr('display','none')
        $('#newTodoBlock').attr('display','block')
    })
})

function refresh() {
}

