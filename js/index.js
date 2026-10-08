function togglePassword(inputId, eyeId) {
    let input = document.getElementById(inputId);
    let eye = document.getElementById(eyeId);
    if (input.type === "password") {
        input.type = "text";
        eye.classList.remove("bi-eye"); eye.classList.add("bi-eye-slash");
    } else {
        input.type = "password";
        eye.classList.remove("bi-eye-slash"); eye.classList.add("bi-eye");
    }
}

let signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let isValid = true;
        let fullname = document.getElementById("fullname").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let city = document.getElementById("city").value.trim();
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        document.querySelectorAll("small.text-danger").forEach(el => el.textContent = "");

        if (fullname === "") { document.getElementById("nameError").textContent = "Full Name required"; isValid = false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById("emailError").textContent = "Valid email required"; isValid = false; }
        if (!/^[0-9]{10}$/.test(phone)) { document.getElementById("phoneError").textContent = "Phone must be 10 digits"; isValid = false; }
        if (!/^[A-Za-z\s]+$/.test(city) || city === "") { document.getElementById("cityError").textContent = "City must contain only alphabets"; isValid = false; }
        
        // FIXED LINE MA - @ allow pannuthu ma
        if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) { document.getElementById("passError").textContent = "Min 8 chars with letters & numbers"; isValid = false; }
        if (password !== confirmPassword) { document.getElementById("confirmError").textContent = "Passwords do not match"; isValid = false; }

        console.log("Validation:", isValid, password, confirmPassword);
        if (isValid) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
            alert("Signup Successful! Please Sign In ma");
            window.location.href = "SignIn.html";
        }
    });
}

let signinForm = document.getElementById("signinForm");
if (signinForm) {
    signinForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let email = document.getElementById("signinEmail").value.trim();
        let password = document.getElementById("signinPassword").value;
        let storedEmail = localStorage.getItem("userEmail");
        let storedPass = localStorage.getItem("userPassword");
        document.getElementById("signinEmailError").textContent = "";
        document.getElementById("signinPassError").textContent = "";
        document.getElementById("loginError").textContent = "";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById("signinEmailError").textContent = "Valid email required"; return; }
        if (password === "") { document.getElementById("signinPassError").textContent = "Password required"; return; }
        if (email === storedEmail && password === storedPass) {
            alert("Login Successful ma!");
            window.location.href = "travelapp.html";
        } else {
            document.getElementById("loginError").textContent = "Only registered email can login. Please SignUp first ma!";
        }
    });
}