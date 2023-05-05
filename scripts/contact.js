//Hamburger Menu 
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.menu');
    const navLinks = document.querySelectorAll('.menu li');
    //toggle Nav
    burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    //Animate links
    navLinks.forEach((link, index) => {
    if (link.style.animation) {
        link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
    });

    //Burger Animation
    burger.classList.toggle('toggle');
});
}
navSlide();

////Building some error handling to be run on form submission
  // const formElement = document.querySelector('form');
            // const nameInput = document.querySelector('input[name="name"]');
            
            // let isFormValid = false;
              
            // const validateInputs = function(){
            //      nameInput.classList.remove('invalid');
                 

            //     if(!nameInput.value){
            //         nameInput.nextElementSibling.classList.remove('hidden');
            //     isFormValid = false;
            //     }
            // };
            // formElement.addEventListener('submit', function(e){
            //     e.preventDefault();
            //     if (validateInputs){
            //         form.remove();
            //     };
            // });    

            // nameInput.addEventListener('input',function(){
            //     validateInputs();
            // });
            
            const formName = document.getElementById('fname');
            const formEmail = document.getElementById('email');
            const formMessage = document.getElementById('subject');
            const errorElement = document.getElementById('error');
            const formElement = document.querySelector('form');

            formElement.addEventListener('submit', function(e){
                //    e.preventDefault();
                    let messages = [];
                    if(fname.value === '' || fname.value == null){
                        messages.push('Name is required');
                    }
                    if(email.value.length <= 6){
                        messages.push('email must be longer than 6 characters');
                    }
                    // if(subject.value.length >=30 );
                    // messages.push('Your message must be less than 30 characters');
         
                    if(messages.length > 0){
                        e.preventDefault();
                        errorElement.innerText = messages.join(',');
                    }  
                });

