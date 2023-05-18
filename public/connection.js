const socket = io()
console.log('js de index')

function emit_data() {
    socket.emit(
        'primer_conexion',
        {
            name: 'leo',
            age: 24
        }
    )
}

let selectors = document.querySelectorAll('.emit_data')
console.log(selectors)
selectors.forEach(each=> each.addEventListener('click',emit_data))

socket.on(
    'contador',
    data=> console.log(data)
)