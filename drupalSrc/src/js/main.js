openMenu.addEventListener('click',()=>{
    nav.classList.toggle('nav_adaptive')
})
closeMenu.addEventListener('click', ()=>{
    nav.classList.toggle('nav_adaptive')
})

closeModal.addEventListener('click', ()=>{
    modal.classList.toggle('active')
})
closeSend.addEventListener('click', ()=>{
    modal.classList.toggle('active')
})

sendMessage.addEventListener('click', e=>{
    e.preventDefault()
    let regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if(name.value == ''){
      alert('Вы не ввели имя')
    }
    else if(regEmail.test(email.value)  == false){
      alert('Введите корректный e-mail')
      
    }
    else if(textMessage.value == ''){
      alert('Вы не текст сообщения')
    }
    else{
        loader.style="display:inline-block"
        localStorage.setItem('name', name.value)
        let localName = localStorage.getItem('name')
        nameOut.textContent += localName
        setTimeout(() => {
            modal.classList.toggle('active')
            loader.style="display:none"
            name.value = ''
            email.value = ''
            textMessage.value = ''
        }, 2000);
        
    }
})

$(document).ready(function(){
	$("#menu").on("click","a", function (event) {
		event.preventDefault();
		let id  = $(this).attr('href'),
		top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
        nav.classList.remove('nav_adaptive')
    });
});

