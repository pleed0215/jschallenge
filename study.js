const my_title = document.querySelector ('#my-title');

function handleResize (event) {
    my_title.style.color = 'blue';
}

my_title.addEventListener ("click", handleResize)