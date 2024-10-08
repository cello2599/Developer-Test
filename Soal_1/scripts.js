document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById('email');
    const emailHelp = document.getElementById('emailHelp');
    const loadingSpinner = document.getElementsByClassName('loading');
    const passwordInput = document.getElementById('password');
    const passHelp = document.getElementById('passHelp');
    const confirmPassword = document.getElementById('confirmPassword');
    const confirmPasswordHelp = document.getElementById('confirmPassHelp');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const registrationForm = document.getElementById('registrationForm');

    // Fungsi untuk memeriksa apakah email valid menggunakan regex
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Fungsi untuk menunjukkan animasi loading email
    function showLoadingEmail(show) {
        if (show) {
            loadingSpinner[0].style.display = 'block';
            emailHelp.textContent = '';
        } else {
            loadingSpinner[0].style.display = 'none';
        }
    }

    //fungsi untuk mengecek password
    function validatePassword(password) {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordPattern.test(password);
    }

    //fungsi untuk menunjukkan animasi loading password
    function showLoadingPassword(show){
        if (show) {
            loadingSpinner[1].style.display = 'block';
            passHelp.textContent = '';
        } else {
            loadingSpinner[1].style.display = 'none';
        }
    }

    //fungsi untuk mengaktifkan input password
    function enablePassword() {
        passwordInput.disabled = false;
        passwordInput.required = true;
        confirmPassword.disabled = false;
        confirmPassword.required = true;
    }

    //fungsi untuk menonaktifkan input password
    function disablePassword() {
        passwordInput.disabled = true;
        passwordInput.required = false;
        confirmPassword.disabled = true;
        confirmPassword.required = false;
    }

    //fungsi untuk animasi loading confirm password
    function showLoadingConfirmPassword(show) {
        if (show) {
            loadingSpinner[2].style.display = 'block';
            confirmPasswordHelp.textContent = '';
        } else {
            loadingSpinner[2].style.display = 'none';
        }
    }

     // Fungsi untuk memeriksa apakah konfirmasi password sama dengan password
     function validateConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Fungsi untuk men-enable tombol submit
    function checkFormValidation() {
        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;
        const confirmPasswordValue = confirmPassword.value;

        if (validateEmail(emailValue) && validatePassword(passwordValue) && validateConfirmPassword(passwordValue, confirmPasswordValue)) {
            submitButton.disabled = false; // Enable tombol submit
        } else {
            submitButton.disabled = true; // Disable tombol submit jika ada yang tidak valid
        }
    }

    // Event listener saat input email berubah
    emailInput.addEventListener('input', function() {
        passwordInput.value = ''; // Reset value input password
        showLoadingEmail(true); // Tampilkan loading saat mengetik

        // Simulasi delay untuk menunggu pengecekan email (1 detik)
        setTimeout(function() {
            const emailValue = emailInput.value;

            if (validateEmail(emailValue)) {
                emailHelp.textContent = 'Email valid';
                emailHelp.classList.add('valid');
                emailHelp.classList.remove('invalid');
                enablePassword();
            } else {
                emailHelp.textContent = 'Email tidak valid';
                emailHelp.classList.add('invalid');
                emailHelp.classList.remove('valid');
                disablePassword();
            }

            showLoadingEmail(false); // Sembunyikan loading setelah pengecekan selesai
        }, 1000); // 1 detik delay untuk animasi loading
    });

    // Event listener saat input password berubah
    passwordInput.addEventListener('input', function() {
        showLoadingPassword(true);

        setTimeout(function() {
            const passwordValue = passwordInput.value;

            if (validatePassword(passwordValue)) {
                passHelp.textContent = 'Password valid';
                passHelp.classList.add('valid');
                passHelp.classList.remove('invalid');
            } else {
                passHelp.textContent = 'Password tidak valid';
                passHelp.classList.add('invalid');
                passHelp.classList.remove('valid');
            }

            showLoadingPassword(false);
        }, 1000);
    });

    // Event listener saat input confirm password berubah
    confirmPassword.addEventListener('input', function() {

        showLoadingConfirmPassword(true);
        setTimeout(function() {
            const passwordValue = passwordInput.value;
            const confirmPasswordValue = confirmPassword.value;

            if (validateConfirmPassword(passwordValue, confirmPasswordValue)) {
                confirmPasswordHelp.textContent = 'Password cocok';
                confirmPasswordHelp.classList.add('valid');
                confirmPasswordHelp.classList.remove('invalid');
            } else {
                confirmPasswordHelp.textContent = 'Password tidak cocok';
                confirmPasswordHelp.classList.add('invalid');
                confirmPasswordHelp.classList.remove('valid');
            }
            showLoadingConfirmPassword(false);
            checkFormValidation(); // Cek apakah form sudah valid
        }, 1000);
    });

    // Event listener untuk tombol submit
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah reload halaman saat submit
        successMessage.style.display = 'block'; // Tampilkan pesan sukses
    });
});
